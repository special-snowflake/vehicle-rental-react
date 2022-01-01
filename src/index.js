import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/App.css';
import App from './pages/App';
import Home from './pages/Home';
import DetailVehicle from './pages/DetailVehicle';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' replace element={<Navigate to='home' />} />
      <Route path='home' element={<Home />} />
      <Route path='detail-vehicle' element={<DetailVehicle />} />
      <Route path='app' element={<App />} />
    </Routes>
  </Router>,
  document.getElementById('main'),
);

reportWebVitals();
