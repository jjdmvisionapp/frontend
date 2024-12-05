import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Main from "./Main";
import httpClient from "../httpClient.ts";
import { User } from "../types";

const Home = () => {
  // state for choosing option from side navigation component
  const [selectedOption, setSelectedOption] = useState<string>("Dashboard");
  // user auth
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    await httpClient.post("http:\\localhost:8080/api/v1/user/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get(
          "http:\\localhost:8080/api/v1/user/@me"
        );
        setUser(resp.data); // Set the user data from the API
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  return (
    <div>
      <div className="home-page-wrapper w-screen h-auto sm:h-auto md:h-auto lg:h-screen xl:h-screen font-supernova-800 bg-supernova-750 p-4 gap-4 text-gray-200 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col">
        <SideNav onSelectOption={setSelectedOption} logoutUser={logoutUser} />{" "}
        {/* passes props to component to set selected option and logout user function */}
        <Main selectedOption={selectedOption} user={user} />
        {/* passes props to component for selected option display and confirm user auth*/}
        {/* Pass the user here */}
      </div>
    </div>
  );
};

export default Home;
