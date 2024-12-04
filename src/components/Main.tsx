import React from "react";
import ContentDisplay from "./ContentDisplay";
import { User } from "../types";
import { Link } from "react-router-dom";

type MainProps = {
  selectedOption: string;
  user: User | null;
};

const Main: React.FC<MainProps> = ({ selectedOption, user }) => {
  return (
    <div className="w-full h-full">
      <div className="rounded-3xl w-full h-full bg-supernova-700 flex flex-col">
        {/* Top header */}
        <div className="top w-full h-16 flex flex-row justify-between p-4 border-b-2 border-b-default-500">
          <div className="title font-semibold font-subtitle text-xl">
            {selectedOption}
          </div>
          <div className="user flex flex-row justify-center items-center gap-2">
            <div className="profile h-8 w-8 bg-supernova-500 rounded-full flex justify-center items-center text-center">
              {user && user.username ? user.username[0].toUpperCase() : "?"}
            </div>
            {user?.username || (
              <Link
                to="/login"
                className="px-3 py-2 text-sm hover:bg-default-500 bg-default-450 cursor-pointer rounded-full font-semibold"
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Content section */}
        <div className="wrapper w-full flex-grow flex">
          <ContentDisplay selectedOption={selectedOption} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Main;
