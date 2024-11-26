import React, { useState } from "react";
import SideNav from "./SideNav";
import Main from "./Main";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Dashboard");

  return (
    <div>
      <div className="home-page-wrapper w-screen h-screen font-supernova-800 bg-supernova-750 p-4 gap-4 text-gray-200 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col">
        <SideNav onSelectOption={setSelectedOption} />
        <Main selectedOption={selectedOption} />
      </div>
    </div>
  );
};

export default Home;
