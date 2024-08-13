import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Home, FilePlus, Eye } from "react-feather";
import axios from "axios";
import { FiBell } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import avatar from "../../assets/avater2.jpg";
import backendURL from '../../api/axios';

const API_ENDPOINTS = {
  Logout: '/api/auth/logout',
};

function SidebarNav() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const fetchUserFullname = async () => {
      try {
        const response = await fetch("/api/auth/login", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullname);
        } else {
          console.error("Failed to fetch user fullname");
        }
      } catch (error) {
        console.error("Error fetching user fullname:", error);
      }
    };

    fetchUserFullname();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(backendURL + API_ENDPOINTS.Logout);

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error('Logout failed with status:', response.status);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
      }
    }
  };

  return (
    <div className="flex fixed h-screen">
      {/* Sidebar */}
      <div className="h-full bg-gradient-to-b from-indigo-700 to-indigo-900 text-white w-64 flex flex-col shadow-xl">
        <div className="flex flex-col justify-between flex-grow">
          {/* Sidebar Header */}
          <div className="py-6 px-6">
            <h2 className="text-2xl font-bold tracking-wide">Dashboard</h2>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 space-y-2">
            <Link
              to="/"
              className="flex items-center py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-600"
            >
              <Home className="mr-3 text-lg" />
              <span className="font-medium text-lg">Home</span>
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-600"
            >
              <FilePlus className="mr-3 text-lg" />
              <span className="font-medium text-lg">Create Post</span>
            </Link>
            <Link
              to="/dashboard/posts"
              className="flex items-center py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-600"
            >
              <Eye className="mr-3 text-lg" />
              <span className="font-medium text-lg">See Posts</span>
            </Link>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-auto py-3 px-6 flex items-center justify-center bg-red-600 rounded-lg shadow-md transition duration-300 hover:bg-red-700"
          >
            <LogOut className="mr-3 text-lg" />
            <span className="font-medium text-lg">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Navigation Bar */}
        <header className="fixed w-[105rem] bg-white shadow-md z-50 hidden">
          <div className="flex items-center justify-between px-6 py-3 lg:py-4 container mx-auto">
            {/* Right-side Icons and User Profile */}
            <div className="flex items-center space-x-6">
              {/* Notifications */}
              <div className="relative">
                <FiBell className="text-gray-600 w-6 h-6 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>
              </div>

              {/* User Profile */}
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-10 h-10 rounded-full border-2 border-indigo-600 shadow-md"
                  />
                  <span className="text-gray-700 font-semibold">{fullName}</span>
                  <IoMdArrowDropdown className="text-gray-700 w-5 h-5" />
                </div>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-t-lg"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mt-24 p-6 flex-grow">
          {/* Your content goes here */}
        </main>
      </div>
    </div>
  );
}

export default SidebarNav;
