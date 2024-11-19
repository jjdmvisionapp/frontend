import React from "react";
import SideNav from "./SideNav";

const Home = () => {
  return (
    <div>
      <div className="home-page-wrapper w-screen h-screen font-supernova-800 bg-supernova-800 p-2 grid grid-rows-1 grid-cols-6 gap-4 text-gray-200">
        <SideNav />
      </div>
    </div>
  );
};

export default Home;
