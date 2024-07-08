import React from "react";
import logo from "../Images/logo-img.jpeg";
import "./nav.css";

export default function Nav() {
  return (
    <nav>
      <div className="nav-wrapper">
        <a href={logo}>
          <img src={logo} alt="logo" className="shelter-logo" />
        </a>
        <h1>YOUR PLACE OF SHELTER</h1>
        <div className="nav-links">
          <li>
            <a href="/LOGIN">LOGIN</a>
          </li>
          <li>
            <a href="/SIGNUP">SIGN-UP</a>
          </li>
          <li>
            <a href="/VIEW">VIEW PROPERTY</a>
          </li>
        </div>
      </div>
    </nav>
  );
}
