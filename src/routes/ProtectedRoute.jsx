// Update the ProtectedRoute component
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';

export default function ProtectedRoute(props) {
  const { Component } = props;
  const navigate = useNavigate();

  // Function to check if the token is expired
  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; 
        return decodedToken.exp < currentTime;
      } catch (error) {
        // Handle any error that occurs during token decoding, if necessary
        return true; // Consider token expired if there's an error
      }
    }
    
    return true; // Token not found, consider it expired
  };
  
  useEffect(() => {
    // Redirect to login page if token is expired or not available
    if (isTokenExpired()) {
      navigate('/sessionexpires');
    }
  }, []);

  // Render the protected page content
  return <Component />;
}