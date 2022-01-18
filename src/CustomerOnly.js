import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const useAuthRoles = () => {

  const roles = localStorage['vehicle-rental-roles'];
  let isCustomer = true;
  if (roles !== 'customer') isCustomer = false;
  return isCustomer;
};

function CustomerOnly() {
  const isAuthorized = useAuthRoles();
  return isAuthorized ? <Outlet /> : <Navigate to='/403' replace={true} />;
}

export default CustomerOnly;
