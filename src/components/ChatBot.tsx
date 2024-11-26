import React from "react";

const ChatBot: React.FC = () => {
  return (
    <div className="bottom w-full h-full flex flex-wrap md:flex-wrap-reverse">
      <div className="left basis-4/5 bg-supernova-750 flex justify-center items-center">
        <div className="w-full h-full ml-8 mr-8 p-4 flex flex-col items-start justify-between">
          <div className="title text-center">ChatBot</div>
          <input
            type="text"
            placeholder="Type a prompt here"
            className="prompt-input w-full bg-supernova-700 text-gray-400 rounded-md p-3 flex flex-row"
          />
        </div>
      </div>
      <div className="right basis-1/5 p-4">Tutorial</div>
    </div>
  );
};

export default ChatBot;
