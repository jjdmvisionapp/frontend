import React from "react";

const ChatBot: React.FC = () => {
  return (
    <div className="bottom w-full h-full flex">
      <div className="left w-full bg-supernova-750 flex justify-center items-center">
        <div className="w-full h-full ml-8 mr-8 p-4 flex flex-col items-start justify-between gap-4">
          <div className="chat-log h-full min-h-48 w-full scroll-smooth"></div>
          <input
            type="text"
            placeholder="Type a prompt here"
            className="prompt-input w-full bg-supernova-700 text-gray-400 rounded-md p-3 flex flex-row"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
