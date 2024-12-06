import React from "react";
import ContentDisplay from "./ContentDisplay";
import { User } from "../types";
import { Link } from "react-router-dom";
import { useJJDMState } from "../state/JJDMState";

type MainProps = {
  selectedOption: string;
};

const Main: React.FC<MainProps> = ({ selectedOption }) => {
  const { state } = useJJDMState();

  return (
    <div className="w-full h-full">
      <div className="rounded-3xl w-full h-full bg-supernova-700 flex flex-col">
        {/* Top header */}
        <div className="top w-full h-16 flex flex-row justify-between p-4 border-b-4 border-b-default-500 rounded-lg">
          <div className="title font-semibold font-subtitle text-xl">
            {/* displays selected feature as a title */}
            {selectedOption}
          </div>
          <div className="user flex flex-row justify-center items-center gap-2">
            <div className="profile h-8 w-8 bg-supernova-500 rounded-full flex justify-center items-center text-center">
              {/* confirms if user is logged in and displays first character in their name to represent an initial in a profile picture, if no user is found then displays ? */}
              {state.username[0].toUpperCase()}
            </div>
            {state.username}
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
