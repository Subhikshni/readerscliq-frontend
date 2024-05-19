import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Profile.css";
import NavBar from "./NavBar";

function ProfileLogin({ handleLogin, errorMessage, navigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(username, password);
    window.location.href = `/profile2/${username}`;
  };

  return (
    <div className="container">
      <NavBar />
      <div className="profile-container">
        <h2 className="profile-title">Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="profile-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="profile-button">
            Login
          </button>

          <Link to="/profile/signup" className="signin-link">
            New? SignIn
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ProfileLogin;
