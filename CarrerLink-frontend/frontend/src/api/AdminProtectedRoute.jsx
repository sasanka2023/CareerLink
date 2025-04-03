import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';


const extractRoleFromToken = (token) => {
    try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.role;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

const AdminProtectedRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    // You might also want to check for an admin role here if you have role info:
    // const { user } = useContext(AuthContext);
    // if (!token || user?.role !== 'admin') { ... }

    if (!token || extractRoleFromToken(token) !== 'ROLE_ADMIN') {
        // If there is no token, redirect to the admin login page
        return <Navigate to="/admin-auth" replace />;
    }
    return children;
};

export default AdminProtectedRoute;
