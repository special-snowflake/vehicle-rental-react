import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const useAuth = () => {
  const token = localStorage.getItem('vehicle-rental-token');
  let loggedIn = true;
  if (!token || token === '') loggedIn = false;
  return loggedIn;
};

function PublicRoutes() {
  const isAuth = useAuth();
  return isAuth ? <Navigate to='/home' replace={true} /> : <Outlet />;
}

export default PublicRoutes;
