import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Mainpage from "./pages/Mainpage"
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Login/>} />
        <Route path = "/main" element = {<Mainpage/>} />
      </Routes>
    </Router>
  );
}

export default App;