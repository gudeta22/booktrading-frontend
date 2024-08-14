// App.js
import { Routes, Route } from "react-router-dom"; // Correct imports
import { AuthProvider } from './Components/login/AuthContext.js';
import Login from "./Components/login/Login.js";
import Registration from "./Components/Register/Registration.js";
import Createposts from "./Components/login/Createposts.js";
import Dashlayout from "./Components/Dashboard/Dashlayout.js";
import Home from "./Components/mainpage/Home.js";
import Posts from "./Components/mainpage/Posts.js";
import ProtectedRoute from './Components/login/ProtectRoute.js';
 
function App() {

 
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        
        <Route path="/dashboard" element={<ProtectedRoute> <Dashlayout /> </ProtectedRoute>}>
          <Route path="create" element={<Createposts />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
