import React from "react";
import "../css/Home.css";
import NavBar from "./NavBar";

function Home() {
  return (
    <div>
      <NavBar />
      <div className="home-container">
        <div className="content">
          <h2>READER'S CLIQ</h2>
          <p>Welcome to ReadersCliq!</p>
        </div>
      </div>
      <div className="about-container">
        <div className="about-text">
          <h2>About ReadersCliq</h2>
          <p>
            "Welcome to ReadersCliq, where every page is a new chapter waiting
            to be explored! Dive into a world where literature comes alive,
            connections are made, and imagination knows no bounds. Join our
            vibrant community of bookworms, where every reader has a story to
            share and every book leads to new adventures. Discover, connect, and
            embark on a literary journey like never before with ReadersCliq!"
          </p>
        </div>
        <div className="about-image"></div>
      </div>
      <footer className="footer">
        <div className="social-icons">
          <a
            className="Github_logo"
            href="https://github.com/Subhikshni"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
          <a
            className="Linkedin_logo"
            href="https://www.linkedin.com/in/subhikshni-v-s-33b971227"
            target="_blank"
            rel="noopener noreferrer"
          ></a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
