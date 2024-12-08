import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUpload, IoCloudUploadOutline } from "react-icons/io5";

interface DragDropProps {
  onFileSelect: (file: File) => void;
  imagePreview: string | null;
}

const DragDrop: React.FC<DragDropProps> = ({ onFileSelect, imagePreview }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="upload-wrapper text-center min-h-72 h-2/3 w-full mt-2 bg-supernova-600 hover:bg-[#33363A] transition ease-in 0.3s cursor-pointer border-supernova-650 hover:border-supernova-600 border-4 border-dashed flex justify-center items-center p-4 relative"
      {...getRootProps()}
    >
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Uploaded Preview"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      <div className={`z-10 ${imagePreview ? "opacity-50" : "opacity-100"}`}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <div className="flex flex-col justify-center items-center">
            <IoCloudUploadOutline className="text-6xl" />
            <p>Drop the files here...</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <IoCloudUpload className="text-6xl" />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDrop;
