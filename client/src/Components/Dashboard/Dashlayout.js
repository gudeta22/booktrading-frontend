import React from 'react'
import Sidebar from './SidebarNav'
import Createposts from '../login/Createposts'
// import Nav from './Nav'
import Posts from '../mainpage/Posts'
import { useLocation } from 'react-router-dom'

function Dashlayout() {
  const location = useLocation();
  
  return (
    <>
      {/* <Nav /> */}
      <div className='lg:grid-cols-2'>
        <Sidebar />
        {location.pathname === '/dashboard' && <Createposts />}
        {location.pathname === '/dashboard/posts' && <Posts />}
      </div>
    </>
  )
}

export default Dashlayout
