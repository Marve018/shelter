import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../components/authcontext";
import LandingPage from "../pages/landingpage";
import Register from "./RegisterForm";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false); // Add state for showing register form
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleShowLoginForm = () => {
    setShowLoginForm(!showLoginForm);
    console.log("Show login form");
  };

  const handleShowRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Login Data:', formData);
      const response = await loginUser(formData);
      console.log("Login response:", response);
      login(response.token); // Pass only the token string
      console.log("Navigating to /dashboard");
      navigate("/properties");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to login");
    }
  };

  return (
    <>
      {showLoginForm ? (
        <div className="form-container">
          <img src={`${process.env.PUBLIC_URL}/Images/waving-hand.gif`} alt="Shelter Logo" className="header-img" />

          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit} className="form">
            <img
              src={`${process.env.PUBLIC_URL}/Images/logo-img.jpeg`}
              alt="logo"
              className="shelter-logo"
            />
            <label className="form--label">Login</label>
            <div>
              <div onClick={handleShowLoginForm} className="close-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="form--input"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="form--input"
              />
            </div>
            <button type="submit" className="form--submit">
              Login
            </button>
            <p className="form--toggle" onClick={handleShowRegisterForm}>
              Don't have an account? Sign up
            </p>
          </form>
        </div>
      ) : showRegisterForm ? (
        <Register />
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default LoginForm;
