import React from "react";
import ContentDisplay from "./ContentDisplay";

type MainProps = {
  selectedOption: string; // current selected option
};

const Main: React.FC<MainProps> = ({ selectedOption }) => {
  return (
    <div className="w-full h-full">
      <div className="rounded-3xl w-full h-full bg-supernova-700 flex flex-col">
        {/* Top header */}
        <div className="top w-full h-16 flex flex-row p-4 border-b-2 border-b-default-500">
          <div className="title font-semibold font-subtitle text-xl">
            {selectedOption}
          </div>
        </div>

        {/* Content section */}
        <div className="wrapper w-full flex-grow flex overflow-hidden">
          <ContentDisplay selectedOption={selectedOption} />
        </div>
      </div>
    </div>
  );
};

export default Main;
