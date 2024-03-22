import React from 'react'
import Navbar from '../Navbar/Navbar'
import Landingpage from '../mainpage/Landingpage'
import About from './About'

function Home() {
  return (
    <div>
        <Navbar />
        <Landingpage />
        <About />
    </div>
  )
}

export default Home