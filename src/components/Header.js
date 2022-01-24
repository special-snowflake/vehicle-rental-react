import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import '../assets/css/Modals.css';

import logoVehicleRental from '../assets/icons/logo-vehicle-rental.svg';

import forwardSvg from '../assets/icons/forward.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  state = {
    isSuccess: false,
    // userData: null,
    token: null,
    photoProfile: require('../assets/images/default3.jpg'),
  };

  getUserData() {
    // const id = localStorage['vehicle-rental-userId'];
    const host = process.env.REACT_APP_HOST;
    // const urlData = `${host}/user/detail/${id}`;
    // axios
    //   .get(urlData)
    //   .then((response) => {
    //     const photo = response.data.data.photo;
    //     console.log('photo: ', photo, typeof photo);
    //     if (photo !== null && typeof photo !== 'undefined' && photo !== '') {
    //       this.setState({
    //         photoProfile: `${host}/user${photo}`,
    //       });
    //     }
    //     this.setState({
    //       isSuccess: true,
    //       userData: response.data.data,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const photo = localStorage['vehicle-rental-photo'];
    // console.log('photo', photo, typeof photo);
    // if (photo !== null && typeof photo !== 'undefined' && photo !== '') {
    if (photo !== 'null') {
      // console.log('yes, its not null', photo);
      const parsedPhoto = JSON.parse(photo);
      this.setState({
        photoProfile: `${host}/user${parsedPhoto}`,
        isSuccess: true,
        // userData: response.data.data,
      });
    } else {
      this.setState({
        isSuccess: true,
      });
    }
  }

  handleLogout() {
    const navigate = this.props.navigate;
    console.log('this is logout');
    navigate('/logout');
  }
  componentDidMount() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    const token = localStorage.getItem('vehicle-rental-token');
    if (token !== null) this.getUserData();
  }
  logoutAlert() {
    const navigate = this.props.navigate;
    confirmAlert({
      customUI: ({onClose}) => {
        return (
          <div className='custom-ui'>
            <h1>Are you sure you want to logout?</h1>
            <div className='d-flex justify-content-evenly'>
              <button
                className='btn btn-yes px-2 me-2'
                onClick={() => {
                  onClose();
                  navigate('/logout');
                }}>
                Yes
              </button>
              <button className='btn btn-no px-2 ms-2' onClick={onClose}>
                No
              </button>
            </div>
          </div>
        );
      },
    });
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
            </ul>
            <ul className='navbar-nav text-center'>
              {isSuccess ? (
                <>
                  <li className='text-center nav-item dropdown d-none d-md-block'>
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
                  <li
                    key='User Profile'
                    className='nav-item dropdown d-none d-md-block'>
                    <div
                      className='col-12 text-center ms-auto nav-link dropdown-toggle'
                      id='profileDropdown'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'>
                      <div className='nav-img-user-wrapper'>
                        {/* {console.log('inside photo', this.state.photoProfile)} */}
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
                        <div
                          className='dropdown-item cursor-pointer'
                          onClick={this.logoutAlert.bind(this)}>
                          Logout
                          <img src={forwardSvg} width={15} height={15} alt='' />
                        </div>
                        {/* <Link className='dropdown-item' to='/logout'>
                          Logout
                        </Link> */}
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
        {isSuccess && (
          <div className='menu-sm position-fixed d-block d-md-none'>
            <div className='d-flex justify-content-around mt-2'>
              <button
                className='dropdown-toggle'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <img src={require('../assets/icons/email.png')} alt='msg' />
              </button>
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
              <button
                className='dropdown-toggle'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                <div className='menu-sm-wrapper'>
                  <img
                    src={this.state.photoProfile}
                    className='menu-sm-img-profile'
                    alt='msg'
                  />
                </div>
              </button>
              <ul
                className='dropdown-menu dropdown-menu'
                aria-labelledby='profileDropdown'>
                <li>
                  <Link className='dropdown-item' to='/profile'>
                    Edit Profile
                  </Link>
                </li>
                <hr className='dropdown-divider' />
                <li>
                  <Link className='dropdown-item' to='/help'>
                    Help
                  </Link>
                </li>
                <hr className='dropdown-divider' />
                <li>
                  <button
                    className='dropdown-item cursor-pointer'
                    onClick={this.logoutAlert.bind(this)}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>
    );
  }
}

// export default Header;
export default function HeaderWrapper(props) {
  const navigate = useNavigate();
  return <Header {...props} navigate={navigate} />;
}
