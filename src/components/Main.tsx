import React from "react";

const Main = () => {
  return (
    <div className="w-full ml-4 mr-4">
      <div className="container rounded-3xl w-full h-full bg-supernova-700 flex flex-col">
        <div className="top w-full h-16 flex flex-row p-4 border-b-2 border-b-default-500">
          <div className="title basis-4/5 font-semibold">CONTENT TITLE</div>
          <div className="icons basis-1/5">
            {/* ADD ICONS HERE - info/export idk */}
          </div>
        </div>
        <div className="bottom w-full h-full flex flex-row">
          <div className="left basis-4/5 bg-supernova-750 flex justify-center items-center">
            <div className="w-full h-full  ml-8 mr-8 p-4 flex flex-col items-start justify-between">
              <div className="title">RELEVANT SECTION CONTENT</div>
              <div className="message-input w-full bg-supernova-700 rounded-md p-3 flex flex-row">
                <div className="input text-gray-400">Type a prompt here...</div>
                <div className="attachment-icons"></div>
              </div>
            </div>
          </div>
          <div className="right basis-1/5 p-4">SIDEBAR TITLE CONTENT</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
