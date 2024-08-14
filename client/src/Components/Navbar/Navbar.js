import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className=''>
      <header
        className={`shadow-md -py-1 px-4 sm:px-10 sticky  bg-white font-[sans-serif] min-h-[70px] lg:z-50 ${
          isScrolled ? 'fixed top-0 left-0 right-0 z-50' : ''
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-5 relative">
          <Link to="/" className="lg:w-24">
            <img src={logo} alt="logo" className="w-24" />
          </Link>

          <div className="flex lg:order-1 max-sm:ml-auto">
            <Link to="/login">
              <button className="px-4 py-2 text-sm rounded font-bold text-white border-2 border-[#000] bg-[#000] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#000]">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="px-4 py-2 text-sm rounded font-bold text-white border-2 border-[#000] bg-[#000] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#000] ml-3">
                Sign up
              </button>
            </Link>

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
        </div>
      </header>
    </div>
  );
}

export default Navbar;
