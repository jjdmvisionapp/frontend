import React, { useState } from "react";
import DragDrop from "./DragDrop";
import { FaImage } from "react-icons/fa";
import httpClient from "../httpClient";

const ImageClassification: React.FC = () => {
  const [imgFile, setImgFile] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const MAX_FILE_SIZE_MB = 5; // Maximum file size in MB
  const SUPPORTED_FORMATS = ["image/jpeg", "image/png"];

  const handleFileUpload = async (file: File) => {
    if (!SUPPORTED_FORMATS.includes(file.type)) {
      setError("Unsupported file format. Please upload JPEG or PNG.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      // Convert MB to bytes
      setError(
        `File is too large. Maximum allowed size is ${MAX_FILE_SIZE_MB}MB.`
      );
      return;
    }

    setError(null); // Clear any previous errors
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await httpClient.post("images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
          if (event.total) {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percentCompleted);
          } else {
            setProgress((prev) => (prev < 100 ? prev + 10 : 100));
          }
        },
      });
      const uploadedUrl = `images/get`; // Assuming a path to get the uploaded image
      setImgFile(uploadedUrl);
      setProgress(100);
    } catch (error) {
      setError("Error uploading file. Please try again.");
      console.error("Error uploading file:", error);
    }
  };

  const handleFileSelect = (file: File) => {
    setProgress(0);
    handleFileUpload(file);
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
          <DragDrop imagePreview={imgFile} onFileSelect={handleFileSelect} />
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
      {/* Conditionally render progress and output */}
      {imgFile && (
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
          <div className="result-item w-full h-auto border-b-[1px] border-gray-400 p-2 mt-4">
            <p>{progress === 100 ? "The image is of a ..." : "Uploading..."}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageClassification;
