import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import httpClient from "../httpClient";
import { useJJDMState } from "../state/JJDMState";

const ChatBot: React.FC = () => {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      message: string;
      message_type: string;
      sender_id: number;
      receiver_id: number;
      timestamp: string;
    }[]
  >([]); // Store all messages
  const [socketConnected, setSocketConnected] = useState(false); // Track WebSocket connection
  const socketRef = useRef<any>(null); // Reference for the WebSocket instance
  const chatLogRef = useRef<HTMLDivElement | null>(null); // Reference to chat log container
  const { state } = useJJDMState();

  // Fetch existing chat messages from the server
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await httpClient.get("/chat/messages");

        if (response.data.status === "success") {
          setMessages(
            response.data.messages.map((msg: any) => ({
              ...msg,
              message_type: msg.type === "user" ? "user" : "chatbot",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Connect to WebSocket after messages are loaded
  useEffect(() => {
    socketRef.current = io("ws://localhost:23432/chat", {
      query: { user_id: parseInt(state.userId) },
    });

    socketRef.current.on("connect", () => {
      console.log("WebSocket connected");
      setSocketConnected(true);
    });

    socketRef.current.on("receive_message", (message: any) => {
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

    socketRef.current.on("disconnect", () => {
      console.log("WebSocket disconnected");
      setSocketConnected(false);
    });

    return () => {
      socketRef.current?.disconnect(); // Clean up WebSocket connection
    };
  }, []);

  // Scroll to the bottom of the chat log when new messages are added
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

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
      socketRef.current?.emit("send_message", {
        message: userMessage,
        from_user_id: parseInt(state.userId),
        to_user_id: -1,
      }); // Replace with actual user IDs

      setUserMessage(""); // Clear input field after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default Enter behavior
      handleSendMessage();
    }
  };

  // Helper function to determine margin based on message type and previous message
  const getMessageMargin = (currentIndex: number) => {
    if (currentIndex === 0) return "mt-4"; // First message has normal margin
    const prevMessage = messages[currentIndex - 1];
    const currentMessage = messages[currentIndex];
    return prevMessage.message_type === currentMessage.message_type
      ? "mt-2" // Smaller margin for consecutive messages of same type
      : "mt-4"; // Larger margin for alternating user/chatbot messages
  };

  return (
    <div className="bottom w-full h-full flex">
      <div className="w-full bg-supernova-750 flex justify-center items-center">
        <div className="chat-container w-full h-full flex-grow ml-8 mr-8 p-4 flex flex-col items-start justify-between gap-4">
          <div
            ref={chatLogRef}
            className="chat-log w-full max-h-[32rem] overflow-y-auto flex flex-col mt-6 p-4"
          >
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
              onKeyDown={handleKeyDown}
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
