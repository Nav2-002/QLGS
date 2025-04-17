import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem('adminToken');
  const location = useLocation();

  if (!isAdminLoggedIn) {
    return <Navigate to="/admins/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;