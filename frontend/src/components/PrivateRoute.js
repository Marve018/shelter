import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();
  console.log("Auth state in PrivateRoute:", authState);

  return authState.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
