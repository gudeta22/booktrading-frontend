import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar.js";
import backendURL from "../../api/axios.js";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const API_ENDPOINTS = {
  REGISTER: "/api/register", // Update this with your actual endpoint
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

  return (
    <>
      <Navbar />
      <div>
        {registrationSuccess && (
          <div className="relative">
            <div className="bg-green-200 fixed w-[20%] mx-[48rem] text-green-800 p-3 mb-4 rounded-md text-center">
              Registration successful! Please proceed to login.
            </div>
          </div>
        )}
        {errorMessage && (
          <div className="relative">
            <div className="bg-red-200 fixed w-[20%] mx-[48rem] text-red-800 p-3 mb-4 rounded-md text-center">
              {errorMessage}
            </div>
          </div>
        )}
        <div className="font-[sans-serif] text-[#333] relative">
          <div className="h-[240px] font-[sans-serif]"></div>
          <div className="relative -mt-40 p-10 -mx-10">
            <form
              onSubmit={handleSubmit}
              className="bg-white max-w-xl w-[28rem] lg:w-[34rem] mx-auto shadow-2xl p-6 rounded-md"
            >
              <div className="mb-12">
                <h3 className="text-3xl font-extrabold text-center">
                  Create an account
                </h3>
              </div>
              <div>
                <label className="text-xs block mb-2">Full Name</label>
                <div className="relative flex items-center">
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter name"
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>
              <div className="mt-10">
                <label className="text-xs block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-2 top-4 text-xl text-gray-600 hover:text-gray-900"
                  >
                    {showPassword ? <AiFillEye />  :<AiFillEyeInvisible /> }
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-2 text-xs text-gray-600">
                    {passwordStrength}
                  </div>
                )}
              </div>
              <div className="flex items-center mt-8"></div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md text-white bg-black hover:bg-white hover:text-black focus:outline-none transition-all"
                >
                  Register
                </button>
                <Link
                  to="/login"
                  className="text-blue-500 font-semibold hover:underline ml-1"
                >
                  <p className="text-sm mt-8 text-center">
                    Already have an account? Login here
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registration;
