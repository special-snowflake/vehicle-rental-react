import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import axios from 'axios';
import jwt_decode from 'jwt-decode';

import logoVehicleRental from '../assets/icons/logo-vehicle-rental.svg';

import forwardSvg from '../assets/icons/forward.svg';

class Header extends React.Component {
  state = {
    isSuccess: false,
    userData: null,
    photoProfile: require('../assets/images/default3.jpg'),
  };

  getUserData() {
    const token = localStorage.getItem('vehicle-rental-token');
    console.log('token', token);
    const data = jwt_decode(token);
    const id = data.id;
    const urlData = `http://localhost:8000/user/detail/${id}`;
    console.log('url: ', urlData);
    axios
      .get(urlData)
      .then((response) => {
        console.log(response.data);
        const photo = response.data.data.photo;
        console.log('photo: ', photo);
        if (photo !== null && typeof photo !== 'undefined') {
          this.setState({
            photoProfile: `http://localhost:8000/user${photo}`,
          });
        }
        this.setState({
          isSuccess: true,
          userData: response.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.getUserData();
  }
  render() {
    const {isSuccess} = this.state;
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
            <ul className='navbar-nav ms-auto text-center nav-middle'>
              <li key='Home'>
                <NavLink to='/home' className='nav-link'>
                  Home
                </NavLink>
              </li>
              <li key='Vehicle'>
                <NavLink to='/vehicle-type' className='nav-link'>
                  Vehicle Type
                </NavLink>
              </li>
              <li key='History'>
                <NavLink to='/history' className='nav-link'>
                  History
                </NavLink>
              </li>
              <li key='About'>
                <a className='nav-link' href='home'>
                  About
                </a>
              </li>
              {/* <li key='none'></li> */}
            </ul>
            <ul className='navbar-nav ms-auto text-center'>
              {isSuccess ? (
                <>
                  <li className='text-center nav-item dropdown'>
                    <div
                      className='col-12 nav-mail nav-link dropdown-toggle'
                      id='mailDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
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
                    <ul
                      className='dropdown-menu dropdown-menu-end'
                      aria-labelledby='mailDropdown'>
                      <li>
                        <Link className='dropdown-item drop-msg' to='/chat'>
                          <p className='nav-msg-name'>Johnson</p>
                          <p className='nav-msg-preview'>
                            Okay, thank you for the good service.
                          </p>
                          <p className='nav-msg-time'>Just Now</p>
                          {/* <p className='nav-msg-count'>1</p> */}
                        </Link>
                      </li>
                      <hr className='dropdown-divider' />
                      <li>
                        <Link className='dropdown-item drop-msg' to='/chat'>
                          <p className='nav-msg-name'>Eudora</p>
                          <p className='nav-msg-preview nav-msg-new'>
                            Who has the last laugh?
                          </p>
                          <p className='nav-msg-time'>Yesterday</p>
                          <p className='nav-msg-count'>1</p>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li key='User Profile' className='nav-item dropdown'>
                    <div
                      className='col-12 text-center ms-auto nav-link dropdown-toggle'
                      id='profileDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      <div className='nav-img-user-wrapper'>
                        {console.log('inside photo', this.state.photoProfile)}
                        <img
                          src={this.state.photoProfile}
                          alt='user profile'
                          className='nav-user-profile'
                        />
                      </div>
                    </div>
                    <ul
                      className='dropdown-menu dropdown-menu-end'
                      aria-labelledby='profileDropdown'>
                      <li>
                        <Link className='dropdown-item' to='/profile'>
                          Edit Profile
                          <img src={forwardSvg} width={15} height={15} alt='' />
                        </Link>
                      </li>
                      <hr className='dropdown-divider' />
                      <li>
                        <Link className='dropdown-item' to='/help'>
                          Help
                          <img src={forwardSvg} width={15} height={15} alt='' />
                        </Link>
                      </li>
                      <hr className='dropdown-divider' />
                      <li>
                        <Link className='dropdown-item' to='/logout'>
                          Logout
                          <img src={forwardSvg} width={15} height={15} alt='' />
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
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
              )}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
