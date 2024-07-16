import React from "react";
// import logo from "../Images/logo-img.jpeg";
import "./nav.css";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          {/* <a href={logo}>
            <img src={logo} alt="logo" className="shelter-logo" />
            
          </a> */}
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/Images/logo-img.jpeg`}
              alt="logo"
              className="shelter-logo"
            />
          </a>
          <div className="menu-toggle" id="mobile-menu" onClick={toggleMenu}>
            &#9776;
          </div>
          <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/register">REGISTER</Link>
            </li>

            <li>
              <a href="/contact">CONTACT US</a>
            </li>
            <li>
              <Link to="/login">LOGIN</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
