import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avater2.jpg";
import { FiBell } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";

function Nav() {
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

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <div className="flex items-center justify-between px-6 py-3 lg:py-4 container mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="w-32 h-auto" />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex flex-1 mx-6">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search..."
          />
        </div>

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

      {/* Mobile Search Bar */}
      <div className="lg:hidden px-6 py-2">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Search..."
        />
      </div>
    </header>
  );
}

export default Nav;
