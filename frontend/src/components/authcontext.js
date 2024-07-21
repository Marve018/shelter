import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token from localStorage:", token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setAuthState({ token, user: decodedToken.user });
      } catch (err) {
        console.error("Invalid token:", err);
        setAuthState({ token: null, user: null });
      }
    }
  }, []);

  const login = (token) => {
    console.log("Login function called with token:", token);
    if (token) {
      localStorage.setItem('token', token);
      try {
        console.log("Token type:", typeof token); // Debugging log
        console.log("Token value:", token); // Debugging log
        const decodedToken = jwtDecode(token);
        setAuthState({ token, user: decodedToken.user });
      } catch (err) {
        console.error("Invalid token:", err);
        setAuthState({ token: null, user: null });
      }
    }
  };


  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
