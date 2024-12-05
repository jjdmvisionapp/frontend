import Login from "./components/Login";
import Signup from "./components/Signup";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <>
      {/* App Structure using routes to designate paths for different pages */}
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
