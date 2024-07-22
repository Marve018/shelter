import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
      token: null,
      user: null,
      loading: true, // Add loading state
    });
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token);
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token on initial load:", decodedToken);
          setAuthState({ token, user: decodedToken.user, loading: false });
        } catch (err) {
          console.error("Invalid token:", err);
          setAuthState({ token: null, user: null, loading: false });
        }
      } else {
        setAuthState({ token: null, user: null, loading: false });
      }
    }, []);
  
    const login = (token) => {
      console.log("Login function called with token:", token);
      if (token) {
        localStorage.setItem('token', token);
        try {
          const decodedToken = jwtDecode(token);
          console.log("Decoded token on login:", decodedToken);
          setAuthState({ token, user: decodedToken.user, loading: false });
        } catch (err) {
          console.error("Invalid token:", err);
          setAuthState({ token: null, user: null, loading: false });
        }
      }
    };
  
    const logout = () => {
      localStorage.removeItem('token');
      setAuthState({ token: null, user: null, loading: false });
    };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
