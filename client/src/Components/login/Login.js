import React, { useState } from "react";
import axios from "axios";
import logo from '../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import backendURL from "../../api/axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from './AuthContext'; 
import { useSpring, animated } from '@react-spring/web'; 

const API_ENDPOINTS = {
  Login: "/api/auth/login",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendURL + API_ENDPOINTS.Login, {
        email,
        password,
      });
      login(response.data.token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      setError(error.response?.status === 401 ? "Invalid email or password" : "An error occurred. Please try again later.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
    setSuccess("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
    setSuccess("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Animations for success and error messages
  const successSpring = useSpring({
    opacity: success ? 1 : 0,
    transform: success ? 'scale(1) rotate(0deg)' : 'scale(0.5) rotate(-10deg)',
    config: { tension: 170, friction: 26 },
  });

  const errorSpring = useSpring({
    opacity: error ? 1 : 0,
    transform: error ? "translateY(0)" : "translateY(-20px)",
    config: { tension: 220, friction: 12 },
  });

  return (
    <>
      <Navbar />
      <div className="font-[sans-serif] text-[#333] -my-10 relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300">
        {error && (
          <animated.div
            style={errorSpring}
            className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-lg px-6 py-3 rounded-md shadow-2xl z-50 flex items-center justify-center"
          >
            {error}
          </animated.div>
        )}
        {success && (
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
                    d="M9 12l2 2l4 -4"
                  ></path>
                </svg>
              </div>
              <span>{success}</span>
            </div>
          </animated.div>
        )}
        <div className="bg-white h-[44rem]  rounded-lg shadow-2xl p-10 max-w-lg -my-10 w-full mx-auto transform transition-transform duration-500">
          <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">
            <img src={logo} alt="logo" className="w-24 mx-40" />
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="text-sm font-semibold text-gray-700 block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
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
            </div>
            <div className="flex justify-between items-center mb-6">
              <a
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r  from-indigo-700 to-indigo-900 text-white font-bold rounded-md shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
