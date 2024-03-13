// components/Sidebar.js
import { Link } from 'react-router-dom';


import { Home, BookOpen, Clipboard, LogOut, FilePlus, Eye } from 'react-feather';
// import Createposts from '../login/Createposts';

const Sidebar = () => {
  return (
    <div className="h-screen  bg-gray-100 text-black w-64 flex flex-col  top-0 left-0 overflow-y-auto shadow-xl">
    
      <div className="flex-grow">
        <nav className="mt-4">
          <Link to="/" className="block py-2 px-4 flex items-center border">
            <Home className="mr-2" />
            Home
          </Link>
          <Link to="/create" className="block py-2 px-4 flex items-center border">
            <FilePlus className="mr-2" />
            Creat Post
          </Link>
          <Link to="/posts" className="block py-2 px-4 flex items-center borde">
            <Eye className="mr-2" />
            see posts
          </Link>
          <Link href="/courses" className="block py-2 px-4 flex items-center border">
            <BookOpen className="mr-2" />
            Courses
          </Link>
          <Link href="/classes" className="block py-2 px-4 flex items-center border">
            <Clipboard className="mr-2" />
            Classes
          </Link>
       
          <Link href="/logout" className="block py-2 px-4 flex items-center hover:bg-gray-700">
            <LogOut className="mr-2" />
            Logout
          </Link>
        </nav>
          <div className="flex-grow">
        </div>
      </div>
      
    </div>
  );
};

export default Sidebar;
