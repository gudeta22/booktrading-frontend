// import { BrowserRouter as Routes, Route } from 'react-router-dom'
import { Route , Routes } from "react-router-dom";
// import Navbar from "./Components/Navbar/Navbar.js";
import Login from "./Components/login/Login.js";
import Registration from "./Components/Register/Registration.js";
import Createposts from "./Components/login/Createposts.js";
import Dashlayout from "./Components/Dashboard/Dashlayout.js";
import Home from "./Components/mainpage/Home.js";
import Posts from "./Components/mainpage/Posts.js";
function App() {
  return (
    <div className="App">
      <Routes>
       
    
         <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
         {/* <Route path="/create" element={<Createposts />} /> */}
        <Route path="/register" element={<Registration />} />
        {/* Dashboard route */}
        <Route>
          <Route path="/dashboard" element={<Dashlayout />}>
          {/* Nested create route */}
          <Route path="/dashboard/create" element={<Createposts />} />
          <Route path="/dashboard/posts" element={<Posts />} />
        </Route>
       
         
        </Route>
      </Routes>
     
       
    </div>
  );
}

export default App;
