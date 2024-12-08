import React, { useState, useEffect } from "react";
import DragDrop from "./DragDrop";
import { FaImage } from "react-icons/fa";
import httpClient from "../httpClient";

const ImageClassification: React.FC = () => {
  const [imgFile, setImgFile] = useState<string | null>(null);  // Local URL or server URL
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [imageInfo, setImageInfo] = useState<any>(null);  // To store image info including classification

  const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

  // Fetch image info when the component mounts
  useEffect(() => {
    const fetchImageInfo = async () => {
      try {
        // Fetch the most recent image info (GET request)
        const response = await httpClient.get("images/get-info");
        if (response.data.status === "success") {
          const image = response.data.image;
          setImageInfo(image);

          // If the image is unique, fetch the actual image file using POST request
          if (image.unique) {
            const imageFileResponse = await httpClient.post("images/get-file", {
              image_id: image.id,  // Pass the image_id in the POST request body
            }, {
              responseType: "blob",  // Expect the image to be returned as a blob
            });

            const imageUrl = URL.createObjectURL(imageFileResponse.data);
            setImgFile(imageUrl);  // Update preview with the server image if unique
          } else {
            // If the image is not unique, use the relative filepath from the server
            setImgFile(image.relative_filepath);
          }
        } else {
          setError("No image found for the user.");
        }
      } catch (error) {
        setError("Error fetching image information.");
        console.error("Error fetching image info:", error);
      }
    };

    fetchImageInfo();
  }, []);  // Empty dependency array ensures this runs only on mount

  const handleFileUpload = async (file: File) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setError("Unsupported file format. Please upload JPEG or PNG.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setError(null); // Clear any previous errors
    const formData = new FormData();
    formData.append("file", file);

    // Create a local preview URL for the image
    const localImageURL = URL.createObjectURL(file);
    setImgFile(localImageURL);  // Display image locally

    try {
      // Start the upload process
      const uploadResponse = await httpClient.post("images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percentCompleted = Math.round((event.loaded * 100) / event.total);
            setProgress(percentCompleted);
          } else {
            setProgress((prev) => (prev < 100 ? prev + 10 : 100));
          }
        },
      });

      // Handle the response directly after upload
      const uploadedImage = uploadResponse.data.image; // Assuming the upload response includes the image info
      setImageInfo(uploadedImage);

      if (uploadedImage.unique) {
        // If the image is unique, fetch the actual image file from the server using POST request
        const imageFileResponse = await httpClient.post("images/get-file", {
          image_id: uploadedImage.id,  // Panss the image_id in the POST request body
        }, {
          responseType: "blob",  // Expect the image to be returned as a blob
        });

        const imageUrl = URL.createObjectURL(imageFileResponse.data);
        setImgFile(imageUrl);  // Update preview with the server image if unique
      } else {
        // If the image is not unique, keep the local preview and show classification info
        setImgFile(localImageURL);  // Keep the local preview image
      }

      setProgress(100);  // Set progress to 100 once the upload is complete
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const handleFileSelect = (file: File) => {
    setProgress(0);  // Reset progress bar
    handleFileUpload(file);  // Start file upload process
  };

  const handleManualUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="flex flex-row flex-wrap w-full h-full p-4">
      <div className="basis-2/3 flex-grow p-2 flex flex-col">
        <h3>Upload Image</h3>
        <div className="w-full h-full">
          <DragDrop imagePreview={null} onFileSelect={handleFileSelect} />
          <div className="caption flex flex-row flex-wrap justify-between mt-2 text-gray-300">
            <div className="left">
              <p>Supported Formats: JPEG, PNG</p>
            </div>
            <div className="right">
              <p>Maximum Size: 5MB</p>
            </div>
          </div>
          {/* Manual upload button */}
          <div className="buttons flex justify-start mt-4">
            <input
              type="file"
              accept="image/jpeg, image/png"
              className="hidden"
              id="manual-upload"
              onChange={handleManualUpload}
            />
            <label
              htmlFor="manual-upload"
              className="cursor-pointer p-2 bg-default-500 text-white rounded shadow-md hover:bg-default-550 transition ease-in 0.3s"
            >
              Choose File
            </label>
          </div>
        </div>
        {error && (
          <div className="mt-2 text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
      {/* Image preview and progress bar section */}
      <div className="basis-1/3 flex-grow p-2 flex flex-col mt-8">
        <div className="progress-item flex flex-row w-full h-[6rem]">
          <div className="flex flex-col basis-full">
            <div className="flex flex-row items-center gap-x-4 border-b-[1px] border-b-gray-400 p-2">
              <FaImage />
              <div className="flex flex-col">
                <h3>Image</h3>
                <p>{progress === 100 ? "Uploaded" : `${progress}%`}</p>
              </div>
            </div>
            <div className="flex justify-start items-center p-2 mt-1">
              <progress
                id="imageProgress"
                value={progress}
                max="100"
                className="rounded w-full"
              >
                {progress}%
              </progress>
            </div>
          </div>
        </div>
        {/* Display the image after upload */}
        {imgFile && (
          <div className="result-item w-full h-auto border-b-[1px] border-gray-400 p-2 mt-4">
            <p>{imageInfo ? `The image is classified as: ${imageInfo.classified_as}` : "Uploading..."}</p>
            <img src={imgFile} alt="Uploaded preview" className="w-full h-auto mt-2" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageClassification;
