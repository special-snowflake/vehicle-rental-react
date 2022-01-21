import axios from 'axios';
import React from 'react';
import {Navigate} from 'react-router-dom';

export default function Logout() {
  const host = process.env.REACT_APP_HOST;
  const token = JSON.parse(localStorage.getItem('vehicle-rental-token'));
  const urlLogout = `${host}/auth`;
  const config = {
    headers: {
      'x-authorized-token': token,
    },
  };
  axios
    .delete(urlLogout, config)
    .then((response) => {
      return console.log(response.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
  localStorage.removeItem('vehicle-rental-token');
  localStorage.removeItem('vehicle-rental-userId');
  localStorage.removeItem('vehicle-rental-roles');
  localStorage.removeItem('vehicle-rental-photo');
  return <Navigate to='/login' />;
}
