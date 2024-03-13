import React from 'react'
import Sidebar from './Sidebar'
import Createposts from '../login/Createposts'
import Nav from './Nav'
import { Route, Routes } from 'react-router-dom'
import Mainpage from '../mainpage/Mainpage'
// import { Route  , Routes} from 'react-router-dom'


function Dashlayout() {
  return (
    <>
     <Nav />
        <div className='lg:grid-cols-2'>
         <Sidebar />
          <Routes>
                <Route path='/' element={<Createposts />} />
                <Route path='/posts' element={<Mainpage />} />
          </Routes>
            
       
        {/* <Createposts /> */}
       
    
       
    </div>
    </>
  )
}

export default Dashlayout