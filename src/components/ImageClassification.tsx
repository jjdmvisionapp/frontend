import React from "react";
import DragDrop from "./DragDrop";

const ImageClassification: React.FC = () => {
  return (
    <div className="flex flex-row w-full h-full p-4">
      <div className="basis-2/3 p-2 flex flex-col">
        <h3>Upload Image</h3>
        <div className="w-full h-full">
          <DragDrop />
          <div className="caption flex flex-row justify-between mt-2 text-gray-300">
            <div className="left">
              <p>Supported Formats: JPEG, PNG</p>
            </div>
            <div className="right">
              <p>Maximum Size: 25MB</p>
            </div>
          </div>
          {/* ISSUE WITH PAGE LOADING IDK WHAT IT IS 
          <div className="buttons flex flex-row justify-end mt-2 text-gray-300">
            <input type="file" className="w-12 h-8 rounded bg-default-450">
              Browse
            </input>
          </div> */}
        </div>
      </div>
      <div className="basis-1/3 p-2 flex flex-col">
        <div className="item flex flex-row w-full h-[8rem]">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default ImageClassification;
