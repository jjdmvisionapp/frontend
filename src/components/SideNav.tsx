import React from "react";

import { FaHome, FaImage, FaRobot, FaCog } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import { IoIosPlanet } from "react-icons/io";
import httpClient from "../httpClient";

type SideNavProps = {
  onSelectOption: (option: string) => void; // function to handle option selection
  logoutUser: () => void; // handles user logout
};

const SideNav: React.FC<SideNavProps> = ({ onSelectOption, logoutUser }) => {
  const navItems = ["Dashboard", "Image Classification", "ChatBot", "Settings"]; // array of string values for components
  const navIcons = [FaHome, FaImage, FaRobot, FaCog]; // array of objects representing icons for feature listing

  return (
    <div>
      <div className="nav-left h-full w-full sm:w-full md:w-full lg:w-[16rem] xl:w-[16rem] p-4 rounded-lg flex flex-col bg-supernova-700">
        <div className="title font-logo flex flex-row gap-2 text-2xl justify-start items-center text-gray-200">
          <IoIosPlanet className="icon-animation-v3 text-5xl text-default-500" />
          <h3>jjdm vision</h3>
        </div>

        <div className="features mt-4 flex flex-col gap-4 h-full">
          <h3 className="text-md font-subtitle">Features</h3>

          {navItems.map((item, index) => {
            const Icon = navIcons[index];
            return (
              <div
                key={item}
                onClick={() => onSelectOption(item)}
                className="nav-item flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-650 cursor-pointer hover:text-default-200"
              >
                <Icon className="text-default-400 text-2xl" />
                {item}
              </div>
            );
          })}
        </div>

        <div className="bottom">
          <div
            className="logout flex flex-row justify-start items-end text-supernova-200 hover gap-2 p-2 mt-12 rounded-md hover:bg-supernova-650 cursor-pointer"
            onClick={logoutUser} // Attach the logout function
          >
            <TbLogout2 className="text-red-500 text-2xl" />
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
function useJJDMState(): { actions: any } {
  throw new Error("Function not implemented.");
}
