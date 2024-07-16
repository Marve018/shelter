import React from "react";
import "./RegisterForm.css";

export default function Register() {
  const [registerForm, setRegisterForm] = React.useState({
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showRegisterForm, setShowRegisterForm] = React.useState(true);

  function handleShowRegisterForm() {
    setShowRegisterForm(!showRegisterForm);
    console.log("button closed");
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setRegisterForm((prevRegisterForm) => ({
      ...prevRegisterForm,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (registerForm.password === registerForm.passwordConfirm) {
      console.log("Successfully signed up");
    } else {
      console.log("Passwords do not match");
    }
  }

  return (
    <>
      {showRegisterForm && (
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
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
              type="password"
              placeholder="Confirm password"
              className="form--input"
              name="passwordConfirm"
              onChange={handleChange}
              value={registerForm.passwordConfirm}
            />
            <button className="form--submit">Sign up</button>
          </form>
        </div>
      )}
    </>
  );
}
