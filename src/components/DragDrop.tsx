import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUpload } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

function DragDrop() {
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className="upload-wrapper text-center h-2/3 w-full mt-2 bg-default-200 hover:bg-default-250 cursor-pointer border-default-400 border-4 border-dashed flex justify-center items-center p-4"
      {...getRootProps()}
    >
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
  );
}
export default DragDrop;
