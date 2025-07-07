import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * AuthRedirect component - Redirects authenticated users away from login/register pages
 * This prevents logged-in users from accessing login or register pages
 */
const AuthRedirect = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // If user is authenticated, redirect to home page
  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  // If not authenticated, render the children (login/register page)
  return children;
};

export default AuthRedirect;
