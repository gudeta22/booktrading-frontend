// import { Link } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar.js";
// import Login from "./Components/login/Login.js";
import Mainpage from './Components/mainpage/Mainpage.js'

function App() {
  return (
    <div className="App">
       <Navbar />
       <Mainpage />
       {/* <Link to="/login">
          <Login />
       </Link> */}
       
    </div>
  );
}

export default App;
