import React, { useState } from "react";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import { useAuth } from "../components/authcontext";

export default function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });
  const [showRegisterForm, setShowRegisterForm] = useState(true);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleShowRegisterForm() {
    setShowRegisterForm(!showRegisterForm);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterForm((prevRegisterForm) => ({
      ...prevRegisterForm,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await registerUser(registerForm);
      login(response.token); // Assuming response contains a token
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register");
    }
  }

  return (
    <>
      {showRegisterForm && (
        <div className="form-container">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <img
              src={`${process.env.PUBLIC_URL}/Images/logo-img.jpeg`}
              alt="logo"
              className="shelter-logo"
            />
            <label className="form--label">Sign up</label>
            <div onClick={handleShowRegisterForm}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 50 50"
                className="close-icon"
              >
                <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"></path>
              </svg>
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="form--input"
              name="email"
              onChange={handleChange}
              value={registerForm.email}
            />
            <input
              type="password"
              placeholder="Password"
              className="form--input"
              name="password"
              onChange={handleChange}
              value={registerForm.password}
            />
            <input
              type="text"
              placeholder="First Name"
              className="form--input"
              name="firstName"
              onChange={handleChange}
              value={registerForm.firstName}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="form--input"
              name="lastName"
              onChange={handleChange}
              value={registerForm.lastName}
            />
            <input
              type="text"
              placeholder="Role e.g User, Owner"
              className="form--input"
              name="role"
              onChange={handleChange}
              value={registerForm.role}
            />
            <button className="form--submit">Sign up</button>
          </form>
        </div>
      )}
    </>
  );
}
