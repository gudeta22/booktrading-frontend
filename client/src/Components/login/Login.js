import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import backendURL from "../../api/axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from './AuthContext'; // Import useAuth

const API_ENDPOINTS = {
  Login: "/api/auth/login",
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendURL + API_ENDPOINTS.Login, {
        email,
        password,
      });
      console.log("Login successful:", response.data);
      
      // Assuming the token is received in response.data.token
      login(response.data.token); // Call login function from AuthContext
      navigate("/dashboard"); // Redirect to dashboard on success
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.status === 401) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Navbar />
      <div className="font-[sans-serif] text-[#333]">
        <div className="lg:my-10 flex flex-col items-center justify-center">
          <div className="grid md:grid-cols-1 items-center gap-4 max-w-3xl w-[27rem] lg:w-[30rem] lg:h-[40rem] lg:mb-24 p-4 m-4 shadow-2xl rounded-md">
            <div className="md:max-w-md w-full sm:px-6 py-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-12">
                  <h3 className="text-3xl font-extrabold">Sign in</h3>
                  <p className="text-sm mt-4">
                    Don't have an account{" "}
                    <a
                      href="/register"
                      className="text-black font-semibold hover:underline ml-1 whitespace-nowrap"
                    >
                      Register here
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-xs block mb-2">Email</label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="text"
                      required
                      value={email}
                      onChange={handleEmailChange}
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <label className="text-xs block mb-2">Password</label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={handlePasswordChange}
                      className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                      placeholder="Enter password"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-2 top-4 text-xl text-gray-600 hover:text-gray-900"
                    >
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2 mt-5">
                  <div>
                    <a
                      href="www.forget.com"
                      className="text-black font-semibold text-sm hover:underline"
                    >
                      Forgot Password?
                    </a>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full border shadow-xl py-2.5 px-4 text-sm font-semibold rounded-sm text-white bg-[#000] hover:bg-white hover:text-black focus:outline-none hover:border-black"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
