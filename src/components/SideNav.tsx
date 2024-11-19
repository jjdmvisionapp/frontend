import React from "react";

import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdOutlineUploadFile } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { IoIosPlanet } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";

const SideNav = () => {
  return (
    <div>
      <div className="nav-left h-full   p-2 rounded-lg col-start-1 col-end-1 flex flex-col">
        <div className="title font-logo flex flex-row gap-2 text-2xl justify-start items-center text-gray-200">
          <IoIosPlanet className="text-5xl text-default-450" />
          jjdm
        </div>
        <div className="features mt-4 flex flex-col gap-4 h-full ">
          <h3 className="text-sm font-logo ">Features</h3>
          <div className="classification flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-700 cursor-pointer hover:text-default-250 hover:font-semibold">
            <FaImage className="text-default-300 text-2xl" />
            Image Classification
          </div>
          <div className="chatbot flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-700 cursor-pointer hover:text-default-250 hover:font-semibold">
            <FaRobot className="text-default-300 text-2xl" />
            Chatbot
          </div>
          <div className="settings flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-700 cursor-pointer hover:text-default-250 hover:font-semibold">
            <FaCog className="text-default-300 text-2xl" />
            Settings
          </div>
        </div>
        <div className="bottom">
          <div className="logout flex flex-row justify-start items-end text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-700 cursor-pointer  hover:font-semibold">
            <TbLogout2 className="text-red-500 text-2xl" />
            <Link to={"/"}>Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
