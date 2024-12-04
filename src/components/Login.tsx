import React, { useState } from "react";
import { FaMicrochip } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { IoIosPlanet } from "react-icons/io";
import httpClient from "../httpClient";

const Login: React.FC = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await httpClient.post("//localhost:8080/login", {
        email,
        password,
      });

      window.location.href = "/home";
    } catch (error: any) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div>
      <div className="login-page-wrapper w-screen h-screen font-supernova flex justify-center sm:justify-center md:justify-end lg:justify-end xl:justify-end  items-center ">
        <div className="container flex flex-col  w-auto sm:mr-12 md:mr-24 lg:mr-36 xl:mr-48">
          <div className="title title--fadeinup font-semibold text-5xl mb-6 text-center">
            <p className="drop-shadow-2xl text-gray-100 font-logo font-thin">
              jjdm vision
            </p>
          </div>
          <div className="form-wrapper login-form-wrapper--fadeinright bg-supernova-800 shadow-xl shadow-black w-[28rem] h-auto rounded-lg p-8">
            <div className="form-title mb-2 text-white flex flex-row items-center">
              <h3 className="text-2xl font-bold">Login</h3>
              <div className="icon">
                <IoIosPlanet className="icon-animation-v2 text-5xl ml-2 absolute top-7 text-default-500" />
              </div>
            </div>
            <form>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isPasswordVisible ? "text" : "password"}
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

              <div className="button-wrap text-center mt-4">
                <Link to={"/home"}>
                  <button
                    onClick={() => logInUser()}
                    type="submit"
                    className="submit  bg-[#FFFDFF] p-4 w-36 rounded-full font-bold mb-4 mt-2 text-supernova-700"
                  >
                    Login
                  </button>
                </Link>
              </div>
            </form>

            {/* <div className="text-slate-300 text-center ">
              <p>
                <Link
                  className="font-semibold hover:underline"
                  to={"/forgotpassword"}
                  reloadDocument
                >
                  Forgot your password?{" "}
                </Link>
              </p>
            </div> */}
            <div className="text-slate-300 text-center mt-1">
              <p>
                Don't have an account?{" "}
                <Link
                  className="font-semibold hover:underline"
                  to={"/signup"}
                  reloadDocument
                >
                  <p className="text-default-400 inline">Signup</p>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
