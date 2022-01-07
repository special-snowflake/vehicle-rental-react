import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import './assets/css/App.css';

import Home from './pages/Home';
import VehicleType from './pages/VehicleType';
import History from './pages/History';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import DetailVehicle from './pages/DetailVehicle';
import InvalidRoute from './pages/InvalidRoute';
import ViewMore from './pages/ViewMore';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path='/' replace element={<Navigate to='home' />} />
        <Route path='home' element={<Home />} />
        <Route path='vehicle-type' element={<VehicleType />} />
        <Route path='history' element={<History />} />
        <Route path='profile' element={<Profile />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='view-more' element={<ViewMore />} />
        <Route path='vehicle' exact element={<DetailVehicle />}>
          <Route path=':id' element={<DetailVehicle />} />
        </Route>
        <Route path='404' replace element={<InvalidRoute />} />
        <Route path='*' exact element={<Navigate to='/404' />} />
      </Routes>
    </Router>
  );
}

export default Main;
