import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, element }) => {
  // Replace this with your authentication logic
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (isAuthenticated) {
    return <Route path={path} element={element} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
