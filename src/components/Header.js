import React from 'react';
import {Link} from 'react-router-dom';
import logoVehicleRental from '../assets/icons/logo-vehicle-rental.svg';

function Header() {
  return (
    <header className='container-fluid header'>
      <nav className='navbar navbar-expand-md navbar-light'>
        <Link to='/' className='navbar-brand'>
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
            <li>
              <Link to='/' className='nav-link'>
                Home
              </Link>
            </li>
            <li>
              <a className='nav-link' href='home'>
                Vehicle Type
              </a>
            </li>
            <li>
              <a className='nav-link' href='home'>
                History
              </a>
            </li>
            <li>
              <a className='nav-link' href='home'>
                About
              </a>
            </li>
            <li>
              <a
                href='login.html'
                className='btn btn-sm btn-login nav-link'
                style={{marginTop: 'inherit', padding: '10px'}}>
                Login
              </a>
            </li>
            <li>
              <a
                href='signup.html'
                className='btn btn-sm btn-signup nav-link'
                style={{marginTop: 'inherit', padding: '10px'}}>
                Sign Up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
