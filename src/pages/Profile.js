// import jwtDecode from 'jwt-decode';
import React from 'react';
import {useNavigate} from 'react-router-dom';
// import {useNavigate} from 'react-router-dom';
import WrapperProfile from '../components/WrapperProfile';

function Profile() {
  // const navigate = useNavigate();
  let id = localStorage.getItem('vehicle-user-id');
  const navigate = useNavigate();
  // const token = localStorage.getItem('vehicle-rental-token');
  // console.log(token);

  // if (!token) {
  //   return navigate('/login', {replace: true});
  // } else {
  //   const data = jwtDecode(token);
  //   id = data.id;
  //   console.log(id);
  // }

  return <WrapperProfile id={id} navigate={navigate} />;
}

export default Profile;
