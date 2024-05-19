import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../css/navbar2.css";
import { AuthContext } from "../helpers/AuthContext";

function Navbar2() {
  const username = localStorage.getItem("username") || "";
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={`/profile2/${username}/home2`} className="nav-link">
          Home
        </Link>
        <Link to={`/profile2/${username}/ebooks`} className="nav-link">
          E-Books
        </Link>

        <Link to={`/profile2/${username}/community`} className="nav-link">
          Community
        </Link>

        <Link to={`/profile2/${username}`} className="nav-link">
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar2;
