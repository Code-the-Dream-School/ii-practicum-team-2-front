import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken } from '../util/auth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = getAccessToken();
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;