import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

// Connect to the Flask-SocketIO server
const socket = io("http://localhost:5000/chat");

const ChatBot: React.FC = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [messages, setMessages] = useState<
    {
      message: string;
      message_type: string;
      sender_id: number;
      receiver_id: number;
      timestamp: string;
    }[]
  >([]); // Store all messages

  const chatLogRef = useRef<HTMLDivElement | null>(null); // Reference to chat log container

  useEffect(() => {
    // Fetch existing chat messages when the component is mounted
    const fetchMessages = async () => {
      try {
        const response = await axios.get("/chat/messages");
        if (response.data.status === "success") {
          setMessages(response.data.messages);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(); // Fetch messages on load

    // Listen for 'response' event from the server
    socket.on("response", (data) => {
      setChatbotResponse(data.message);
    });

    // Listen for 'receive_message' event from the server
    socket.on("receive_message", (message) => {
      // Handle received message (display in chat log)
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: message.message,
          message_type: message.message_type,
          sender_id: message.sender_id,
          receiver_id: message.receiver_id,
          timestamp: message.timestamp,
        },
      ]);
    });

    return () => {
      socket.off("response");
      socket.off("receive_message"); // Clean up listeners
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat log whenever new messages are added
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]); // Scroll to the bottom when the messages state changes

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      // Add user message to the chat log immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: userMessage,
          message_type: "user",
          sender_id: 1,
          receiver_id: -1,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Emit the 'send_message' event to the server
      socket.emit("send_message", {
        message: userMessage,
        from_user_id: 1,
        to_user_id: -1,
      }); // Replace with actual user IDs

      // Clear input field after sending
      setUserMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Check if Enter (key code 13) is pressed
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter behavior (like submitting a form)
      handleSendMessage(); // Call the send message function
    }
  };

  // Helper function to determine margin based on message type and previous message
  const getMessageMargin = (currentIndex: number) => {
    if (currentIndex === 0) return "mt-4"; // First message has normal margin
    const prevMessage = messages[currentIndex - 1];
    const currentMessage = messages[currentIndex];
    // If the current message is from the same type as the previous one, reduce the margin
    return prevMessage.message_type === currentMessage.message_type
      ? "mt-2" // Smaller margin for consecutive messages of same type
      : "mt-4"; // Larger margin for alternating user/chatbot messages
  };

  return (
    <div className="bottom w-full h-full flex">
      <div className="w-full bg-supernova-750 flex justify-center items-center">
        <div className="chat-container w-full h-full flex-grow ml-8 mr-8 p-4 flex flex-col items-start justify-between gap-4">
          <div
            ref={chatLogRef} // Reference to the chat log container
            className="chat-log w-full max-h-[32rem] overflow-y-auto flex flex-col mt-6 p-4"
          >
            {/* Display all chat messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.message_type === "user"
                    ? "user bg-default-450 self-end"
                    : "chatbot bg-supernova-600 self-start"
                } rounded-lg h-auto p-2 max-w-fit ${getMessageMargin(index)}`}
              >
                {msg.message}
              </div>
            ))}
          </div>
          <div className="flex flex-row w-full gap-2">
            <input
              type="text"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={handleKeyDown} // Listen for key press event
              placeholder="Type a prompt here.."
              className="prompt-input w-full bg-supernova-700 text-gray-400 rounded-md p-3 flex flex-row"
            />
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
