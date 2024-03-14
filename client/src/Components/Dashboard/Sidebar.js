import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Home, BookOpen, Clipboard, FilePlus, Eye } from 'react-feather';

const backendURL = 'http://localhost:4005'; // Replace with your actual backend URL

const Sidebar = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendURL}/logout`, {
        method: 'POST',
        credentials: 'same-origin', // Include cookies in the request
      });
      if (response.ok) {
        // Redirect to login page or do any other action upon successful logout
        window.location.href = '/login'; // Redirect to login page
      } else {
        // Handle error
        console.error('Logout failed:', response.statusText);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred during logout. Please try again.');
    }
  };

  return (
    <div className="h-screen sticky bg-gray-100 text-black w-64 flex flex-col top-0 left-0 overflow-y-auto shadow-xl">
      <div className="flex-grow">
        <nav className="mt-4">
          <Link to="/" className="block py-2 px-4 flex items-center border">
            <Home className="mr-2" />
            Home
          </Link>
          <Link to="/dashboard" className="block py-2 px-4 flex items-center border">
            <FilePlus className="mr-2" />
            Create Post
          </Link>
          <Link to="/dashboard/posts" className="block py-2 px-4 flex items-center border">
            <Eye className="mr-2" />
            See Posts
          </Link>
          <Link to="/courses" className="block py-2 px-4 flex items-center border">
            <BookOpen className="mr-2" />
            Courses
          </Link>
          <Link to="/classes" className="block py-2 px-4 flex items-center border">
            <Clipboard className="mr-2" />
            Classes
          </Link>
          <button onClick={handleLogout} className="block py-2 px-4 flex items-center hover:bg-gray-700">
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
