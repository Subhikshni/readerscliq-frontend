import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Profile from "./component/ProfileLogin.js";
import ProfileSignup from "./component/ProfileSignup.js";
import Home from "./component/Home.js";
import Home2 from "./component/Home2.js";
import EBooks from "./component/EBooks.js";
import Community from "./component/community.js";
import Profile2 from "./component/profile2.js";

const handleLogin = async (username, password, navigate) => {
  try {
    const formData = { username, password };
    const response = await axios.post("http://localhost:5000/login", formData);
    console.log(response.data);
    if (response.ok) {
      navigate(`/profile2/${username}`);
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};

const handleSignup = async (
  fullname,
  email,
  username,
  password,
  confirmPassword,
  navigate
) => {
  try {
    const formData = { fullname, email, username, password, confirmPassword };
    const response = await axios.post("http://localhost:5000/signup", formData);
    console.log(response.data);
    navigate(`/profile2/${username}`);
  } catch (error) {
    console.error("Error submitting form data:", error);
  }
};

const App = () => {
  return (
    <Router>
      <div className="App-header">
        <Routes>
          <Route
            path="/profile"
            element={<Profile handleLogin={handleLogin} />}
          />
          <Route
            path="/profile/signup"
            element={<ProfileSignup handleSignup={handleSignup} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/profile2/:username/home2" element={<Home2 />} />
          <Route path="/profile2/:username/EBooks" element={<EBooks />} />
          <Route path="/profile2/:username/community" element={<Community />} />
          <Route path="/profile2/:username" element={<Profile2 />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
