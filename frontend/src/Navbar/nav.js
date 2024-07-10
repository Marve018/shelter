import React from "react";
import logo from "../Images/logo-img.jpeg";
import "./nav.css";
import { useState } from "react";
import LoginForm from "../Forms/loginForm";
// import RegisterForm from "../Forms/RegisterForm";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowLoginForm(!showLoginForm);
  };

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <a href={logo}>
            <img src={logo} alt="logo" className="shelter-logo" />
          </a>
          <div className="menu-toggle" id="mobile-menu" onClick={toggleMenu}>
            &#9776;
          </div>
          <ul className={`nav-links ${isMenuOpen ? "show" : ""}`}>
            <li>
              <a href="/HOME">HOME</a>
            </li>
            <li>
              <a href="/BUY">BUY</a>
            </li>
            <li>
              <a href="/SELL">SELL</a>
            </li>
            <li>
              <a href="/ABOUT">ABOUT US</a>
            </li>
            <li>
              <a href="/CONTACT">CONTACT US</a>
            </li>
            <li>
              <a href="/LOGIN" onClick={handleLoginClick}>
                LOGIN
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {showLoginForm && <LoginForm />}
    </div>
  );
}
