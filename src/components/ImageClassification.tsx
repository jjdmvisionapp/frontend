import React from "react";
import DragDrop from "./DragDrop";
import { FaImage } from "react-icons/fa";

const ImageClassification: React.FC = () => {
  return (
    <div className="flex flex-row w-full h-full p-4">
      <div className="basis-2/3 p-2 flex flex-col">
        <h3>Upload Image</h3>
        <div className="w-full h-full">
          <DragDrop />
          <div className="caption flex flex-row flex-wrap justify-between mt-2 text-gray-300">
            <div className="left">
              <p>Supported Formats: JPEG, PNG</p>
            </div>
            <div className="right">
              <p>Maximum Size: 25MB</p>
            </div>
          </div>

          <div className="buttons flex flex-row justify-start mt-2 text-gray-300">
            <input
              type="file"
              className="w-auto h-auto p-2 rounded bg-default-500"
            />
          </div>
        </div>
      </div>
      <div className="basis-1/3 p-2 flex flex-col mt-8">
        <div className="item  flex flex-row w-full h-[6rem]">
          <div className="flex flex-col basis-[80%] ">
            <div className="flex flex-row items-center gap-2 border-b-[1px] border-b-white p-2">
              <FaImage />
              <div className="flex flex-col">
                <h3>Image</h3>
                <p>3MB</p>
              </div>
            </div>
            <div className="flex justify-start items-center p-2 mt-1">
              <progress
                id="imageProgress"
                value="32"
                max="100"
                className="rounded"
              >
                {" "}
                32%{" "}
              </progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageClassification;
