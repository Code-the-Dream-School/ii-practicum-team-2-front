import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, clearTokens } from '../util/auth';
import { jwtDecode } from 'jwt-decode'; // Use named import

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log('ProtectedRoute: Validating token...');
    const validateToken = () => {
      const token = getAccessToken();
      console.log('ProtectedRoute: access_token=', token);

      if (!token) {
        console.log('ProtectedRoute: No token found, setting isAuthenticated to false');
        setIsAuthenticated(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log('ProtectedRoute: Decoded JWT=', decoded);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          console.log('ProtectedRoute: Token expired, clearing tokens');
          clearTokens();
          setIsAuthenticated(false);
          return;
        }
        console.log('ProtectedRoute: Token valid, setting isAuthenticated to true');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('ProtectedRoute: Token validation error:', error);
        clearTokens();
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  console.log('ProtectedRoute: Current isAuthenticated=', isAuthenticated);

  if (isAuthenticated === null) {
    console.log('ProtectedRoute: Rendering loading state');
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;