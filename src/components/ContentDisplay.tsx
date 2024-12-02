import React from "react";
import Dashboard from "./Dashboard";
import ImageClassification from "./ImageClassification";
import ChatBot from "./ChatBot";
import Settings from "./Settings";

type MainProps = {
  selectedOption: string;
};

const ContentDisplay: React.FC<MainProps> = ({ selectedOption }) => {
  const renderContent = () => {
    switch (selectedOption) {
      case "Dashboard":
        return <Dashboard />;
      case "Image Classification":
        return <ImageClassification />;
      case "ChatBot":
        return <ChatBot />;
      case "Settings":
        return <Settings />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return <div className="w-full h-full flex">{renderContent()}</div>;
};

export default ContentDisplay;
