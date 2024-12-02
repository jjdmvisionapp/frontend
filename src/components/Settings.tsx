import React from "react";

const Settings = () => {
  return (
    <div className="flex justify-start items-start w-full h-full mr-36 ml-36 mt-2 bg-red-300 p-8">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="photo basis-2/5">
          <img
            src="https://picsum.photos/300"
            alt="photo"
            className="rounded-full"
          />
        </div>
        <div className="info basis-3/5 flex flex-col bg-green-300 p-2">
          <h2>Account Info</h2>
          <h3>Username</h3>
          <h4>Email</h4>
          <p>Password</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
