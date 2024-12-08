import React, { useState, useEffect } from "react";
import SideNav from "./SideNav";
import Main from "./Main";
import httpClient from "../httpClient.ts";
import { useJJDMState } from "../state/JJDMState.tsx";

const Home = () => {
  // state for choosing option from side navigation component
  const [selectedOption, setSelectedOption] = useState<string>("Dashboard");

  const { actions } = useJJDMState(); // Access state and actions

  const handleUserCheck = async () => {
    try {
      // Make the login request
      const response = await httpClient.get("user/@me");

      // Extract user data from the response
      const { id: userId, username, email: userEmail } = response.data.user;

      // Update context state
      actions.setLoggedIn(true);
      actions.setUserId(userId);
      actions.setUsername(username);
      actions.setEmail(userEmail); // Use userEmail here
    } catch (err) {
      window.location.href = "/";
      console.error(err);
    }
  };

  const logoutUser = async () => {
    try {
      await httpClient.get("user/logout"); // Call the API to log out the user

      // Clear user data in the state
      actions.setLoggedIn(false);
      actions.setUserId("");
      actions.setUsername("");
      actions.setEmail("");

      // Redirect to the login page
      window.location.href = "/";
    } catch (err) {
      console.error("Failed to log out:", err);
      // Optionally handle errors, e.g., show a message or fallback to redirect
      window.location.href = "/";
    }
  };

  useEffect(() => {
    handleUserCheck();
  }, []);

  return (
    <div>
      <div className="home-page-wrapper w-screen h-auto sm:h-auto md:h-auto lg:h-screen xl:h-screen font-supernova-800 bg-supernova-750 p-4 gap-4 text-gray-200 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col flex-col">
        <SideNav onSelectOption={setSelectedOption} logoutUser={logoutUser} />{" "}
        {/* passes props to component to set selected option and logout user function */}
        <Main selectedOption={selectedOption} />
        {/* passes props to component for selected option display and confirm user auth*/}
        {/* Pass the user here */}
      </div>
    </div>
  );
};

export default Home;
