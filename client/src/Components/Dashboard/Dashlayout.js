import React from 'react'
import Sidebar from './Sidebar'
import Createposts from '../login/Createposts'
import Nav from './Nav'
import { Route, Routes } from 'react-router-dom'

import Posts from '../mainpage/Posts'
// import { Route  , Routes} from 'react-router-dom'


function Dashlayout() {
  return (
    <>
     <Nav />
        <div className='lg:grid-cols-2'>
         <Sidebar />
          <Routes>
                <Route path='/' element={<Createposts />} />
                <Route path='/posts' element={<Posts />} />
          </Routes>
            
       
        {/* <Createposts /> */}
       
    
       
    </div>
    </>
  )
}

export default Dashlayout