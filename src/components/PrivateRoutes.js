import React, {useEffect} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {toast} from 'react-toastify';
const useAuth = () => {
  const token = localStorage.getItem('vehicle-rental-token');
  let loggedIn = true;
  if (!token || token === '') loggedIn = false;
  return loggedIn;
};

function PrivateRoutes() {
  const isAuth = useAuth();
  useEffect(() => {
    if (!isAuth) {
      toast.warning(`You don't have access to this page`);
    }
  }, [isAuth]);
  return isAuth ? <Outlet /> : <Navigate to='/home' replace={true} />;
}

export default PrivateRoutes;
