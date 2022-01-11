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
import Chat from './pages/Chat';
import ChatView from './pages/ChatView';
import Logout from './pages/Logout';
import ChangePassword from './components/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';

class Main extends React.Component {
  state = {
    token: null,
  };
  render() {
    const token = JSON.parse(localStorage.getItem('vehicle-rental-token'));
    console.log('what', token);
    // const roles = JSON.parse(localStorage.getItem('vehicle-user-roles'));
    return (
      <Router>
        <Routes>
          <Route path='/' replace element={<Navigate to='home' />} />
          <Route path='home' element={<Home />} />
          <Route path='vehicle-type' element={<VehicleType />} />
          <Route path='history' element={<History />} />
          {/* {token !== null && (
            <> */}
          <Route path='profile' element={<Profile />}>
            <Route path='change-password' element={<ChangePassword />} />
          </Route>
          <Route path='chat' element={<Chat />} />
          <Route path='chat/:id' element={<ChatView />} />
          {/* </>
          )}
          {token === null && (
            <> */}
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          {/* </>
          )} */}
          <Route path='view-more' element={<ViewMore />} />
          <Route path='vehicle' element={<DetailVehicle />} />
          <Route path='vehicle/:id' element={<DetailVehicle />} />
          <Route path='logout' element={<Logout />} />
          <Route path='404' replace element={<InvalidRoute />} />
          <Route path='*' exact element={<Navigate to='/404' />} />
        </Routes>
      </Router>
    );
  }
}

export default Main;
