import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
const useAuth = () => {
  const token = localStorage.getItem('vehicle-rental-token');
  let loggedIn = true;
  if (!token || token === '') loggedIn = false;
  return loggedIn;
};

function PrivateRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to='/home' replace={true} />;
}

export default PrivateRoutes;
