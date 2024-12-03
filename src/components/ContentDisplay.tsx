import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ImageClassification from "./ImageClassification";
import ChatBot from "./ChatBot";
import Settings from "./Settings";

type MainProps = {
  selectedOption: string;
};

const ContentDisplay: React.FC<MainProps> = ({ selectedOption }) => {
  const [activeContent, setActiveContent] = useState<string>(selectedOption);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (selectedOption !== activeContent) {
      setIsTransitioning(true);

      const timeout = setTimeout(() => {
        setActiveContent(selectedOption);
        setIsTransitioning(false);
      }, 500); // Matches the CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [selectedOption, activeContent]);

  const renderContent = () => {
    switch (activeContent) {
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

  return (
    <div className="w-full h-full flex overflow-hidden relative">
      <div
        className={`content-container ${
          isTransitioning ? "fade-out" : "fade-in"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentDisplay;
