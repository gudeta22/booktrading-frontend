import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const requireAuthentication = (WrappedComponent) => {
  const Component = (props) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      // Check authentication status when the component mounts
      const token = localStorage.getItem('token');
      setAuthenticated(!!token);
    }, []);

    // Render the wrapped component if authenticated, otherwise redirect to login
    return authenticated ? <WrappedComponent {...props} /> : <Navigate to="/login" />;
  };

  return Component;
};

export default requireAuthentication;
