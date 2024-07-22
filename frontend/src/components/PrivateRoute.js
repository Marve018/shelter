import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authcontext';

const PrivateRoute = ({ children }) => {
  const { authState } = useAuth();

  if (authState.loading) {
    return <div>Loading...</div>; // Render a loading state while auth is being initialized
  }

  return authState.user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
