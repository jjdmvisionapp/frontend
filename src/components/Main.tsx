import React from "react";
import ContentDisplay from "./ContentDisplay";
import { useJJDMState } from "../state/JJDMState";

type MainProps = {
  selectedOption: string;
};

const Main: React.FC<MainProps> = ({ selectedOption }) => {
  const { state } = useJJDMState();

  // Ensure that the username is not undefined or empty
  const usernameInitial =
    state.username && state.username.length > 0
      ? state.username[0].toUpperCase()
      : "?"; // Fallback to "?" if username is empty or undefined

  return (
    <div className="w-full h-full">
      <div className="rounded-3xl w-full h-full bg-supernova-700 flex flex-col">
        {/* Top header */}
        <div className="top w-full h-16 flex flex-row justify-between items-center p-4 border-b-4 border-b-default-500 rounded-lg">
          <div className="title font-semibold font-subtitle text-md xl:text-xl lg:text-xl md:text-lg sm:text-md">
            {/* displays selected feature as a title */}
            {selectedOption}
          </div>
          <div className="user flex flex-row justify-center items-center gap-2">
            <div className="profile h-8 w-8 bg-supernova-500 rounded-full flex justify-center items-center text-center">
              {/* Displays username initial or "?" if username is undefined */}
              {usernameInitial}
            </div>
            {state.username || "Guest"}{" "}
            {/* Fallback to 'Guest' if username is undefined */}
          </div>
        </div>

        {/* Content section */}
        <div className="wrapper w-full flex-grow flex">
          <ContentDisplay selectedOption={selectedOption} />
        </div>
      </div>
    </div>
  );
};

export default Main;
