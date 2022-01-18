import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// import './assets/css/App.css';

import {Provider} from 'react-redux';
import store from './redux/store';

import Home from './pages/Home';
import VehicleType from './pages/VehicleType';
import History from './pages/History';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import DetailVehicle from './pages/DetailVehicle';
import InvalidRoute from './pages/InvalidRoute';
import Unauthorize from './pages/Unauthorize';
import ViewMore from './pages/ViewMore';
import Chat from './pages/Chat';
import ChatView from './pages/ChatView';
import Logout from './pages/Logout';
import ChangePassword from './components/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import Reservation from './pages/Reservation';
import Payment from './pages/Payment';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';

import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import OwnerOnly from './OwnerOnly';
class Main extends React.Component {
  state = {
    token: null,
  };
  render() {
    const token = JSON.parse(localStorage.getItem('vehicle-rental-token'));
    console.log('what', token);

    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' replace element={<Navigate to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='vehicle-type' element={<VehicleType />} />

            <Route path='view-more' element={<ViewMore />} />
            <Route path='vehicle' element={<DetailVehicle />} />
            <Route path='vehicle/:id' element={<DetailVehicle />} />
            <Route path='404' replace element={<InvalidRoute />} />
            <Route path='*' exact element={<Navigate to='/404' />} />
            <Route path='403' element={<Unauthorize />} />

            <Route element={<PublicRoutes />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='forget-password' element={<ForgetPassword />} />
            </Route>

            <Route element={<PrivateRoutes />}>
              <Route path='history' element={<History />} />
              <Route path='reservation' element={<Reservation />} />
              <Route path='payment' element={<Payment />} />
              <Route element={<OwnerOnly />}>
                <Route path='add-item' element={<AddItem />} />
                <Route path='edit-item/:id' exact element={<EditItem />} />
              </Route>
              <Route path='profile' element={<Profile />}>
                <Route path='change-password' element={<ChangePassword />} />
              </Route>
              <Route path='chat' element={<Chat />} />
              <Route path='chat/:id' element={<ChatView />} />
              <Route path='logout' element={<Logout />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );
  }
}

export default Main;
