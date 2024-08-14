import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png'
import axios from "axios";
import Navbar from "../Navbar/Navbar.js";
import backendURL from "../../api/axios.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useSpring, animated } from "@react-spring/web";

const API_ENDPOINTS = {
  REGISTER: "/api/register",
};

function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(""); // Clear error message on change
    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const checkPasswordStrength = (password) => {
    let strength = "";
    if (password.length < 6) {
      strength = "Too short 🔴";
    } else if (!/[A-Z]/.test(password)) {
      strength = "Add an uppercase letter 🔵";
    } else if (!/[0-9]/.test(password)) {
      strength = "Add a number 🟡";
    } else if (!/[!@#$%^&*]/.test(password)) {
      strength = "Add a special character 🟠";
    } else {
      strength = "Strong password 🟢";
    }
    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength !== "Strong password 🟢") {
      setErrorMessage("Please create a stronger password.");
      return;
    }

    try {
      const response = await axios.post(backendURL + API_ENDPOINTS.REGISTER, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (response && response.data) {
        console.log("Registration successful:", response.data);
        setRegistrationSuccess(true);

        setTimeout(() => {
          setRegistrationSuccess(false);
          navigate("/login"); // Redirect to login page
        }, 3000);

        setFormData({
          fullName: "",
          email: "",
          password: "",
        });
      } else {
        console.error("Unexpected response:", response);
        setErrorMessage("Email already exists. Please use a different email.");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message === "Email already exists") {
          setErrorMessage(
            "Email already exists. Please use a different email."
          );
        } else {
          console.error("Registration error:", error.response.data);
          setErrorMessage("Used an existing email. Please try again.");
        }
      } else {
        console.error("Unexpected error:", error.message);
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  const successSpring = useSpring({
    opacity: registrationSuccess ? 1 : 0,
    transform: registrationSuccess ? "translateY(0)" : "translateY(-100px)",
    config: { tension: 170, friction: 26 },
  });

  const errorSpring = useSpring({
    opacity: errorMessage ? 1 : 0,
    transform: errorMessage ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 220, friction: 12 },
  });

  return (
    <>
      <Navbar className="fixed" />
      <div className="font-[sans-serif]  text-[#333] -my-14  relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300">
        {registrationSuccess && (
          <animated.div
            style={successSpring}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-400 to-teal-500 text-white text-lg px-6 py-3 rounded-md shadow-2xl z-50 flex items-center justify-center"
          >
            <div className="flex items-center">
              <div className="animate-pulse">
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <span>Registration successful! Please proceed to login.</span>
            </div>
          </animated.div>
        )}
        {errorMessage && (
          <animated.p
            style={errorSpring}
            className="fixed top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded-md shadow-lg"
          >
            {errorMessage}
          </animated.p>
        )}
        <div className="bg-white h-[44rem]  rounded-lg shadow-2xl -my-14 p-8 max-w-lg w-full mx-auto transform transition-transform duration-500">
           <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
            <img src={logo} alt="logo" className="w-24 mx-40" />
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-2 top-2 text-xl text-gray-500 hover:text-gray-700 transition duration-150"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
              {passwordStrength && (
                <div className="mt-2 text-xs text-gray-600">
                  {passwordStrength}
                </div>
              )}
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r  from-indigo-700 to-indigo-900 text-white font-bold rounded-md shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Register
              </button>
              <Link
                to="/login"
                className="block text-center text-blue-600 font-semibold mt-4 hover:underline"
              >
                Already have an account? Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Registration;
