import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const backendURL = 'http://localhost:4000';
const API_ENDPOINTS = {
  REGISTER: '/api/register', // Update this with your actual endpoint
};

function Registration() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(backendURL + API_ENDPOINTS.REGISTER, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      });
      console.log('Registration successful:', response.data);
      setRegistrationSuccess(true); // Set registration success to true

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 3000);

      // Optionally, you can reset the form fields after successful registration
      setFormData({
        fullName: '',
        email: '',
        password: ''
      });
    } catch (error) {
      console.error('Registration error:', error.response.data);
    }
  };

  return (
    <div>
      {registrationSuccess && (
        <div className="bg-green-200 text-green-800 p-3 mb-4 rounded-md text-center">
          Registration successful! Please proceed to login.
        </div>
      )}
      <div className="font-[sans-serif] text-[#333] relative">
        <div className="h-[240px] font-[sans-serif]"></div>
        <div className="relative -mt-40 m-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white max-w-xl w-[34rem] mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-md"
          >
            <div className="mb-12">
              <h3 className="text-3xl font-extrabold text-center">Create an account</h3>
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
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div className="flex items-center mt-8"></div>
            <div className="mt-12">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-8 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-all"
              >
                Register
              </button>
              <Link to="/login" className="text-blue-500 font-semibold hover:underline ml-1">
                <p className="text-sm mt-8 text-center">Already have an account? login here</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
