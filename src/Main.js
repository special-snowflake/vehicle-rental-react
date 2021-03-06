import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// import './assets/css/App.css';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

import PrivateRoutes from './components/PrivateRoutes';
import PublicRoutes from './components/PublicRoutes';
import OwnerOnly from './components/OwnerOnly';
import CustomerOnly from './components/CustomerOnly';
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
          <ToastContainer
            limit={1}
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path='/' element={<Navigate to='home' />} />
            <Route path='home' element={<Home />} />
            <Route path='vehicles/type' element={<VehicleType />} />

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
              <Route element={<OwnerOnly />}>
                <Route path='vehicles/new' element={<AddItem />} />
                <Route path='vehicles/edit/:id' exact element={<EditItem />} />
                {/* <Route path='history' element={<History />} /> */}
              </Route>

              <Route element={<CustomerOnly />}>
                <Route path='reservation' element={<Reservation />} />
                <Route path='payment' element={<Payment />} />
              </Route>

              <Route path='history' element={<History />} />
              <Route path='profile' element={<Profile />}>
                <Route path='password' element={<ChangePassword />} />
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
