import React, { useState } from "react";
import "./RegisterForm.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("login successful");
  };

  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <div>
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
        </form>
      </div>
    </>
  );
};

export default LoginForm;
