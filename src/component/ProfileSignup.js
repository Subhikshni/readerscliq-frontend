import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
import "../css/Profile.css";
import NavBar from "./NavBar";

function ProfileSignup({ handleSignup, errorMessage }) {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call handleSignup function passed as a prop
    await handleSignup(fullname, email, username, password, confirmPassword);
    window.location.href = `/profile2/${username}`;
  };

  return (
    <div className="container">
      <NavBar />
      <div className="profile-container">
        <h2 className="profile-title">Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form
          onSubmit={handleSubmit}
          className="profile-form"
          action="/profile/signup"
          method="POST"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
          />
          <button type="submit" className="profile-button">
            Sign Up
          </button>

          <Link to="/profile" className="signin-link">
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ProfileSignup;
