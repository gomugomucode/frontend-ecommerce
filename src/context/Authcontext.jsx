// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 3. Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // This effect runs only once when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          // If token is valid, set the user state
          setUser({ id: decoded.id, role: decoded.role });
        }
      } catch (error) {
        // If token is invalid or malformed
        localStorage.removeItem('token');
        setUser(null);
      }
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    // Make the API call to your backend
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    const { token } = response.data;

    // Save the token to localStorage
    localStorage.setItem('token', token);
    
    // Decode the token to get user info
    const decoded = jwtDecode(token);
    
    // Set the user state in the app
    setUser({ id: decoded.id, role: decoded.role });

    return response.data; // Return the full response (which includes the role)
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // The value that will be available to all children components
  const value = {
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 2. Create the custom hook that components will use to access the context
export const useAuth = () => {
  return useContext(AuthContext);
};