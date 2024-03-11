import React from 'react'
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <header class='shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px]'>
    <div class='flex flex-wrap items-center justify-between gap-5 relative'>
     <Link to="/">
             <img src="https://readymadeui.com/readymadeui.svg" alt="logo" class='w-36' />
     </Link>
    
      
      <div class='flex lg:order-1 max-sm:ml-auto'>
        <Link to="/login">
          <button
          class='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>Login</button>
        </Link>
        
        <Link to="/register">
             <button
          class='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff] ml-3'>Sign
          up</button>
        </Link>
        
        <button id="toggle" class='lg:hidden ml-7'>
          <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
    </div>
  )
}

export default Navbar;