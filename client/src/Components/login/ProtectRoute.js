import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, login } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            const storedToken = sessionStorage.getItem("authToken");
            if (storedToken) {
                sessionStorage.setItem("authToken", storedToken); // Refresh the token in sessionStorage
                login(storedToken); // Ensure the context state is up to date
            }
        }
    }, [isAuthenticated, login]);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
