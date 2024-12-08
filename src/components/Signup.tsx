import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { IoIosPlanet } from "react-icons/io";
import httpClient from "../httpClient";
import { JJDMStateProvider, useJJDMState } from "../state/JJDMState";

const Signup: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // setting state for signup details
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(""); // Added confirmPassword state
  const [errorMessage, setErrorMessage] = useState<string>(""); // For validation feedback

  const { actions } = useJJDMState();
  const navigate = useNavigate();

  // confirms if passwords match
  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission reload
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await httpClient.post("/user/register", {
        username,
        email,
        password,
      });

      const {
        id: userId,
        username: savedUsername,
        email: savedEmail,
      } = response.data.user;

      // Update global state
      actions.setLoggedIn(true);
      actions.setUserId(userId);
      actions.setUsername(savedUsername);
      actions.setEmail(savedEmail);

      // Post action: Navigate to home
      window.location.href = "/home";
    } catch (error: any) {
      console.error("Signup failed:", error);
      if (error.response?.status === 400) {
        setErrorMessage("Invalid data provided. Please check your inputs.");
      } else if (error.response?.status === 409) {
        setErrorMessage("Email already exists. Please log in.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="signup-page-wrapper w-screen h-screen font-supernova flex justify-center sm:justify-center md:justify-start lg:justify-start xl:justify-start items-center">
        <div className="container flex flex-col w-auto sm:ml-12 md:ml-24 lg:ml-36 xl:ml-48">
          <div className="title title--fadeinup font-semibold text-5xl mb-6 text-center">
            <h3 className="drop-shadow-2xl text-gray-100 font-logo font-thin">
              jjdm vision
            </h3>
          </div>
          <div className="form-wrapper signup-form-wrapper--fadeinleft bg-supernova-800 shadow-xl shadow-black w-[28rem] h-auto rounded-lg p-8">
            <div className="form-title mb-2 text-white flex flex-row justify-left items-center">
              <h3 className="text-2xl font-bold">Create an Account</h3>
              <div className="icon">
                <IoIosPlanet className="icon-animation text-5xl ml-2 absolute top-7 text-default-500" />
              </div>
            </div>
            <form>
              <div className="input-wrap">
                <br />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-styling"
                  required
                />
                <span className="floating-placeholder">Username</span>
              </div>

              <div className="input-wrap">
                <br />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-styling"
                  required
                />
                <span className="floating-placeholder">Email</span>
              </div>

              <div className="input-wrap">
                <br />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state
                  className={`input-styling password-input ${
                    isPasswordVisible ? "visible" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                >
                  {isPasswordVisible ? (
                    <FaRegEyeSlash className="icon-styling" />
                  ) : (
                    <FaRegEye className="icon-styling" />
                  )}
                </button>
                <span className="floating-placeholder">Password</span>
              </div>

              <div className="input-wrap">
                <br />
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                  className={`input-styling password-input ${
                    isPasswordVisible ? "visible" : ""
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                >
                  {isPasswordVisible ? (
                    <FaRegEyeSlash className="icon-styling" />
                  ) : (
                    <FaRegEye className="icon-styling" />
                  )}
                </button>
                <span className="floating-placeholder">Confirm Password</span>
              </div>

              {/* Display error message if passwords don't match */}
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">
                  {errorMessage}
                </p>
              )}

              <div className="button-wrap text-center mt-4">
                <Link to={"/home"}>
                  <button
                    type="button"
                    onClick={registerUser}
                    className="submit bg-gray-100 p-4 w-36 rounded-full font-bold mb-4 mt-2 text-supernova-700"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </form>
            <div className="text-slate-300 text-center mt-1">
              <p>
                Already have an account?{" "}
                <Link
                  className="font-semibold hover:underline"
                  to={"/"}
                  reloadDocument
                >
                  <p className="text-default-400 inline">Login</p>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
