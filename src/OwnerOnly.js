import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
const useAuthRoles = () => {
//   const token = localStorage.getItem('vehicle-rental-token');
  const roles = localStorage['vehicle-rental-roles'];
  let isOwner = true;
  if (roles !== 'owner') isOwner = false;
  return isOwner;
};

function OwnerOnly() {
  const isAuthorized = useAuthRoles();
  return isAuthorized ? <Outlet /> : <Navigate to='/403' replace={true} />;
}

export default OwnerOnly;
