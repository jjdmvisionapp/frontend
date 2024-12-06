import React from "react";
import { User } from "../types";
import { useJJDMState } from "../state/JJDMState";

const Settings = () => {
  const { state } = useJJDMState();

  return (
    <div className="container mt-2 p-8 w-full h-full">
      {" "}
      <h3 className="font-semibold font-subtitle text-xl">Account Settings</h3>
      <div className="flex flex-row justify-center w-full h-[12rem]">
        <div className="account w-full h-full flex flex-row  items-center justify-center">
          <div className="photo basis-1/3 flex justify-center items-center ">
            <div className="flex justify-center items-center w-32 h-32 rounded-full text-2xl font-subtitle bg-supernova-450">
              <p>{state.username[0].toUpperCase()}</p>
            </div>
          </div>
          <div className="container">
            {" "}
            <div className="info basis-2/3 flex flex-col p-4 gap-x-12">
              <div className="left flex gap-2 flex-row">
                <p className=" border-b-2 border-supernova-400 p-2 flex-1">
                  {state.username}
                </p>
                <p className="border-b-2 border-supernova-400 p-2 flex-1">
                  {state.email}
                </p>
              </div>
              <div className="right flex gap-2 flex-col">
                {/* <p className="border-b-2 border-supernova-400 p-2">
                  {}
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
