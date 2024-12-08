import React, { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import ImageClassification from "./ImageClassification";
import ChatBot from "./ChatBot";
import Settings from "./Settings";
import { User } from "../types";

// passes selected option to content display to display the chosen component
type ContentDisplayProps = {
  selectedOption: string;
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ selectedOption }) => {
  const [classificationResult, setClassificationResult] = useState<
    string | null
  >(null);

  // transition state handler for changing components
  const [activeContent, setActiveContent] = useState<string>(selectedOption);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // useEffect hook to handle transition timing and delay
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

  // rendering content using switch statement
  const renderContent = () => {
    switch (activeContent) {
      case "Dashboard":
        return <Dashboard />;
      case "Image Classification":
        return (
          <ImageClassification
            setClassificationResult={setClassificationResult}
          />
        );
      case "ChatBot":
        return <ChatBot classificationResult={classificationResult} />;
      case "Settings":
        return <Settings />; // Pass user to Settings
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Select an option from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div
      className="w-full h-full"
      style={{
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out", // CSS styles for transition
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(20px)" : "translateY(0)",
      }}
    >
      {renderContent()}
    </div>
  );
};

export default ContentDisplay;
