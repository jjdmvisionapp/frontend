import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000/chat");

const ChatBot: React.FC = () => {
  // Stores state for user message and chatbot response
  const [userMessage, setUserMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");

  useEffect(() => {
    // sets response as the message displayed
    socket.on("response", (data) => {
      setChatbotResponse(data.message);
    });

    return () => {
      socket.off("response"); // Clean up when component unmounts
    };
  }, []);

  const handleSendMessage = () => {
    // Send the message to the server
    socket.emit("message", { message: userMessage });
    setUserMessage("");
  };

  return (
    <div className="bottom w-full h-full flex">
      <div className="left w-full bg-supernova-750 flex justify-center items-center">
        <div className="w-full h-full ml-8 mr-8 p-4 flex flex-col items-start justify-between gap-4">
          <div className="chat-log h-full min-h-48 w-full scroll-smooth flex flex-col gap-8 mt-6">
            {/* Conditionally render user message */}
            {userMessage && (
              <div className="user bg-default-450 rounded-lg h-auto p-2 max-w-fit self-end">
                {userMessage}
              </div>
            )}
            {/* Conditionally render chatbot response */}
            {chatbotResponse && (
              <div className="chatbot bg-supernova-600 rounded-lg h-auto p-2 max-w-fit self-start">
                {chatbotResponse}
              </div>
            )}
          </div>
          <div className="flex flex-row w-full gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Type a prompt here.."
              className="prompt-input w-full bg-supernova-700 text-gray-400 rounded-md p-3 flex flex-row"
            />
            {/* Sends message  */}
            <button
              onClick={handleSendMessage}
              className="p-2 rounded-md bg-default-550 hover:bg-default-500 text-md min-w-20"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
