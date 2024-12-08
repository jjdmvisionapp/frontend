import React from "react";
import { User } from "../types";
import { useJJDMState } from "../state/JJDMState";

const Settings = () => {
  const { state } = useJJDMState();

  return (
    <div className="container mt-2 p-8 w-full h-full">
      <h3 className="font-semibold font-subtitle text-xl">Account Settings</h3>
      <div className="flex flex-row justify-center w-full h-auto">
        <div className="account w-full h-full flex flex-wrap items-center justify-center gap-4">
          {/* Profile Picture Section */}
          <div className="photo flex justify-center items-center w-32 h-32 rounded-full text-2xl font-subtitle bg-supernova-450">
            <p>{state.username[0].toUpperCase()}</p>
          </div>

          {/* User Info Section */}
          <div className="container flex-1">
            <div className="info flex flex-col p-4 gap-4">
              <div className="left flex flex-wrap gap-2 w-full">
                <p className="border-b-2 border-supernova-400 p-2 flex-grow">
                  {state.username}
                </p>
                <p className="border-b-2 border-supernova-400 p-2 flex-grow">
                  {state.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
