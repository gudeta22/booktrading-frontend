import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import avater from '../../assets/avater2.jpg';

function Nav() {
  // Initialize state for user's full name
  const [fullName, setFullName] = useState('');

  // Fetch user's full name from backend when component mounts
  useEffect(() => {
    const fetchUserFullname = async () => {
      try {
        // Make API call to fetch user's full name from backend
        const response = await fetch('/api/auth/login', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT token in localStorage
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullname); // Set the full name in the state
        } else {
          console.error('Failed to fetch user fullname');
        }
      } catch (error) {
        console.error('Error fetching user fullname:', error);
      }
    };

    fetchUserFullname();
  }, []); // Empty dependency array to run the effect only once when component mounts

  return (
    <div>
      <header className="shadow-md w-full fixed -py-1 px-4 sm:px-10 bg-gray-100 font-[sans-serif] min-h-[70px] lg:z-50 z-50">
        <div className="flex flex-wrap items-center justify-between gap-5 relative">
          <Link to="/" className="lg:w-24">
            <img src={logo} alt="logo" className="w-24" />
          </Link>

          <div className="flex lg:order-1 max-sm:ml-auto">
            <div className="flex items-center ml-3">
              <img src={avater} alt="User avatar" className="w-14 h-14 rounded-full" />
              <span className="text-sm ml-2">{fullName}</span> {/* Display full name here */}
            </div>
            
            {/* Add user profile link or dropdown here */}
          </div>

          <button id="toggle" className="lg:hidden ml-7">
            <svg
              className="w-7 h-7"
              fill="#000"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Nav;
