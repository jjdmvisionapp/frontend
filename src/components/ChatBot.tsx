import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import httpClient from "../httpClient";
import { useJJDMState } from "../state/JJDMState";
import { FaInfoCircle } from "react-icons/fa";

interface ChatBotProps {
  classificationResult: string | null;
}

const ChatBot: React.FC<ChatBotProps> = ({ classificationResult }) => {
  // State to handle the current user message input
  const [userMessage, setUserMessage] = useState("");

  // Holds all chat messages in the conversation
  const [messages, setMessages] = useState<
    {
      message: string;
      message_type: string;
      sender_id: number;
      receiver_id: number;
      timestamp: string;
    }[]
  >([]);

  // Tracks WebSocket connection status
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef<any>(null); // Reference for the WebSocket connection
  const chatLogRef = useRef<HTMLDivElement | null>(null); // Reference for scrolling to the latest message
  const { state } = useJJDMState(); // Custom hook for accessing user-specific state

  // Fetches initial chat messages when the component mounts
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await httpClient.get("/chat/messages");

        if (response.data.status === "success") {
          // Map the fetched messages to match local state structure
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

  // Handles WebSocket setup for real-time messaging
  useEffect(() => {
    socketRef.current = io("ws://localhost:23432/chat", {
      query: { user_id: parseInt(state.userId) },
    });

    socketRef.current.on("connect", () => {
      console.log("WebSocket connected");
      setSocketConnected(true);
    });

    // Listens for incoming messages from the server
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

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Scrolls the chat to the latest message when messages update
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages]);

  // Sends a user's typed message to the chat
  const handleSendMessage = () => {
    if (userMessage.trim()) {
      // Append the user's message to the local state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: userMessage,
          message_type: "user",
          sender_id: parseInt(state.userId),
          receiver_id: -1, // Assuming -1 indicates "send to server"
          timestamp: new Date().toISOString(),
        },
      ]);

      // Emit the message to the WebSocket server
      socketRef.current?.emit("send_message", {
        message: userMessage,
        from_user_id: parseInt(state.userId),
        to_user_id: -1,
      });

      setUserMessage(""); // Clear the input field
    }
  };

  // Sends a pre-generated prompt based on classification results
  const handleSendPrompt = () => {
    if (classificationResult) {
      const prompt = `Tell me more about ${classificationResult}`;

      // Add the prompt to local state
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: prompt,
          message_type: "user",
          sender_id: parseInt(state.userId),
          receiver_id: -1,
          timestamp: new Date().toISOString(),
        },
      ]);

      // Emit the prompt to the WebSocket server
      socketRef.current?.emit("send_message", {
        message: prompt,
        from_user_id: parseInt(state.userId),
        to_user_id: -1,
      });
    }
  };

  // Handles pressing "Enter" in the input field to send a message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default behavior
      handleSendMessage();
    }
  };

  // Adds appropriate spacing between messages based on the sender
  const getMessageMargin = (currentIndex: number) => {
    if (currentIndex === 0) return "mt-4"; // Extra margin for the first message

    const prevMessage = messages[currentIndex - 1];
    const currentMessage = messages[currentIndex];

    // Add less margin if consecutive messages are from the same sender
    return prevMessage.message_type === currentMessage.message_type
      ? "mt-2"
      : "mt-4";
  };

  return (
    <div className="bottom w-full h-full flex">
      <div className="w-full bg-supernova-750 flex justify-center items-center">
        <div className="chat-container w-full h-full flex-grow ml-8 mr-8 p-4 flex flex-col items-start justify-between gap-4">
          {/* Chat message log */}
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

          {/* Input area */}
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
            <button
              onClick={handleSendPrompt}
              className="rounded-full"
              title="Learn more about previous classified image!"
            >
              <FaInfoCircle className=" text-3xl text-gray-300 hover:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
