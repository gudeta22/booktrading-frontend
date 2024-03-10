// import { BrowserRouter as Routes, Route } from 'react-router-dom'
import { Route , Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";
import Login from "./Components/login/Login.js";
import Mainpage from './Components/mainpage/Mainpage.js'




function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />}/>
        <Route path="/login" element={<Login />} />

      </Routes>
     
       
    </div>
  );
}

export default App;
