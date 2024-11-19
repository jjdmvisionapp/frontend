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
      <div className="nav-left h-full w-full sm:w-full md:w-full lg:w-[16rem] xl:w-[16rem] p-4 rounded-lg flex flex-col bg-supernova-700">
        <div className="title font-logo flex flex-row gap-2 text-2xl justify-start items-center text-gray-200">
          <IoIosPlanet className="text-5xl text-default-500" />
          jjdm
        </div>
        <div className="features mt-4 flex flex-col gap-4 h-full ">
          <h3 className="text-md font-logo ">Features</h3>
          <div className="classification flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-650 cursor-pointer hover:text-default-200 ">
            <FaImage className="text-default-400 text-2xl" />
            Image Classification
          </div>
          <div className="chatbot flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-650 cursor-pointer hover:text-default-200 ">
            <FaRobot className="text-default-400 text-2xl" />
            Chatbot
          </div>
          <div className="settings flex flex-row justify-start items-center text-supernova-200 gap-2 p-2 rounded-md hover:bg-supernova-650 cursor-pointer hover:text-default-200 ">
            <FaCog className="text-default-400 text-2xl" />
            Settings
          </div>
        </div>
        <div className="bottom">
          <div className="logout flex flex-row justify-start items-end text-supernova-200 hover gap-2 p-2 rounded-md hover:bg-supernova-650 cursor-pointer  ">
            <TbLogout2 className="text-red-500 text-2xl" />
            <Link to={"/"}>Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
