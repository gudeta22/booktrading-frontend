import React from 'react';
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Home, FilePlus, Eye } from 'react-feather';
import axios from 'axios';
import backendURL from '../../api/axios'

const API_ENDPOINTS = {
  Logout: '/api/auth/logout',             
}; 
const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(backendURL + API_ENDPOINTS.Logout, null, {
        
      });

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
    <div className="h-screen sticky py-24 bg-gray-100 text-black w-64 flex flex-col top-0 left-0 overflow-y-auto shadow-xl">
      <div className="flex-grow">
        <nav className="mt-4">
          <Link to="/" className=" py-2 px-4 flex items-center border">
            <Home className="mr-2" />
            Home
          </Link>
          <Link to="/dashboard" className=" py-2 px-4 flex items-center border">
            <FilePlus className="mr-2" />
            Create Post
          </Link>
          <Link to="/dashboard/posts" className=" py-2 px-4 flex items-center border">
            <Eye className="mr-2" />
            See Posts
          </Link>
         
          <button onClick={handleLogout} className=" border w-72 py-2 px-4 flex items-center">
            <LogOut className="mr-2" />
            Logout
          </button>
        </nav>
        <div className="flex-grow"></div>
      </div>
    </div>
  );
};

export default Sidebar;
