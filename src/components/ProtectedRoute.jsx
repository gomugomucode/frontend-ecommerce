import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Use the new AuthContext

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // If the user is not logged in, redirect them to the login page
    // We also pass the page they were trying to access in the state
    // so we can redirect them back after a successful login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the user is logged in, show the component they are trying to access
  return children;
};

export default ProtectedRoute;