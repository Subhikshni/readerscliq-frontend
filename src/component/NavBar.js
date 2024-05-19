import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/profile" className="nav-link">
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
