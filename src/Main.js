import React from 'react';
import './assets/css/App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import DetailVehicle from './pages/DetailVehicle';
import InvalidRoute from './pages/InvalidRoute';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from 'react-router-dom';
function Main() {
  return (
      <Router>
        <Routes>
          <Route path='home' element={<Home />} />
          <Route path='profile' element={<Profile />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='detail-vehicle' element={<DetailVehicle />} />
          <Route path='/' replace element={<Navigate to='home' />} />
          <Route path='404' replace element={<InvalidRoute />} />
          <Route path='*' exact element={<Navigate to='/404' />} />
        </Routes>
      </Router>
  );
}

export default Main;
