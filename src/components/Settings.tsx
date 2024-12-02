import React from "react";

const Settings = () => {
  return (
    <div className="flex flex-row flex-wrap justify-start items-start w-full h-full mr-36 ml-36 mt-2 p-8">
      <div className="w-full h-auto flex flex-row items-center justify-between ">
        <div className="photo basis-1/3">
          <div className="pfp flex justify-center items-center w-32 h-32 rounded-full text-2xl font-subtitle bg-supernova-450">
            <p>JLM</p>
          </div>
        </div>
        <div className="container">
          {" "}
          <h3 className="font-semibold font-subtitle text-xl">
            Account Settings
          </h3>
          <div className="info basis-2/3 flex flex-col p-4 gap-x-12">
            <div className="left flex gap-2 flex-row">
              <p className=" border-b-2 border-supernova-400 p-2 flex-1">
                Username
              </p>
              <p className="border-b-2 border-supernova-400 p-2 flex-1">
                Email Address
              </p>
            </div>
            <div className="right flex gap-2 flex-col">
              <p className="border-b-2 border-supernova-400 p-2">Password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
