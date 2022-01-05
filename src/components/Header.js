import React from 'react';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import logoVehicleRental from '../assets/icons/logo-vehicle-rental.svg';

function Header() {
  const token = localStorage.getItem('vehicle-rental-token');
  const checkTokenUser = () => {
    if (!token) {
      return (
        <>
          <li key='Button Login'>
            <Link
              to='/login'
              className='btn btn-sm btn-login nav-link'
              style={{marginTop: 'inherit', padding: '10px'}}>
              Login
            </Link>
          </li>
          <li key='Button Signup'>
            <Link
              to='/signup'
              className='btn btn-sm btn-signup nav-link'
              style={{marginTop: 'inherit', padding: '10px'}}>
              Sign Up
            </Link>
          </li>
        </>
      );
    } else {
      const data = jwt_decode(token);
      let userImageURL = require('../assets/images/default.jpg');
      const image = JSON.stringify(data.image);
      if (image !== 'null') {
        userImageURL = `http://localhost:8000/user${JSON.parse(image)}`;
      }
      return (
        <>
          <li className='text-center'>
            <div className='col-12 nav-mail'>
              <div
                style={{
                  maxWidth: '40px',
                  maxHeight: '40px',
                  padding: '0',
                  position: 'relative',
                  margin: 'auto !important',
                }}>
                <img
                  src={require('../assets/icons/email.png')}
                  alt='Email'
                  className='nav-item-mail'
                />
                <figcaption>1</figcaption>
              </div>
            </div>
          </li>
          <li key='User Profile'>
            <Link to='/profile'>
              <div className='col-12 text-center ms-auto'>
                <div className='nav-img-user-wrapper'>
                  <img
                    src={userImageURL}
                    alt='user profile'
                    className='nav-user-profile'
                  />
                </div>
              </div>
            </Link>
          </li>
        </>
      );
    }
  };
  return (
    <header className='container-fluid header'>
      <nav className='navbar navbar-expand-md navbar-light'>
        <Link to='/home' className='navbar-brand'>
          <img
            src={logoVehicleRental}
            alt='Bootstrap'
            width='25'
            height='25'
            className='d-inline-block align-top'
          />
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#toggleMobileMenu'
          aria-controls='toggleMobileMenu'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='toggleMobileMenu'>
          <ul className='navbar-nav ms-auto text-center'>
            <li key='Home'>
              <Link to='/home' className='nav-link'>
                Home
              </Link>
            </li>
            <li key='Vehicle'>
              <a className='nav-link' href='home'>
                Vehicle Type
              </a>
            </li>
            <li key='History'>
              <a className='nav-link' href='home'>
                History
              </a>
            </li>
            <li key='About'>
              <a className='nav-link' href='home'>
                About
              </a>
            </li>
            {checkTokenUser()}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
