import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import '../assets/css/Profile.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

import pencilSvg from '../assets/icons/pencil.svg';

class Profile extends React.Component {
  navigate = useNavigate();
  checkToken = () => {
    const token = localStorage.getItem('vehicle-rental-token');
    if (!token) {
      console.log('not token', token);
      // return navigate('/home', {replace: true});
    } else {
    }
  };
  componentDidMount() {
    this.checkToken();
  }
  render() {
    return (
      <>
        <Header />
        <main className='row'>
          {/* {this.checkToken()} */}
          <div className='.d-none .d-sm-block col-sm-1'></div>
          <div className='col-12 col-sm-10'>
            <div className='col-12 col-sm-10 col-md-10'></div>
            <div className='row content'>
              <div
                className='col-12 row-header'
                style={{fontFamily: `'Nunito', sans-serif`, fontWeight: '900'}}>
                Profile
              </div>
              <div className='col-12 profile-info'>
                <div className='row'>
                  <div className='.d-none .d-sm-block col-sm-3'></div>
                  <div className='col-12 col-sm-6 text-center'>
                    <div className='profile-image-wrapper'>
                      <img
                        src={require('../assets/images/michael-dam-mEZ3PoFGs_k-unsplash-profile.webp')}
                        alt='User Profile'
                        className='profile-image'
                      />
                      <figcaption>
                        <Link to='/'>
                          <img
                            src={pencilSvg}
                            width='17px'
                            height='17px'
                            alt='Edit'
                          />
                        </Link>
                      </figcaption>
                    </div>
                    <h3>Samantha Doe</h3>
                    <div className='user-info'>
                      <p>
                        samanthadoe@mail.com <br />
                        +62833467823
                        <br />
                        Has been active since 2013
                      </p>
                    </div>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='male'
                        defaultValue='Male'
                      />
                      <label className='form-check-label' htmlFor='male'>
                        Male
                      </label>
                    </div>
                    <div className='form-check form-check-inline'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='inlineRadioOptions'
                        id='female'
                        defaultValue='Female'
                        defaultChecked
                      />
                      <label className='form-check-label' htmlFor='female'>
                        Female
                      </label>
                    </div>
                  </div>
                  <div className='col-12 text-left profile-contacts'>
                    <div className='contact-header col-12 text-left'>
                      Contacts
                    </div>
                    <div className='col-12'>
                      <label htmlFor='email'>Email Address:</label>
                      <input
                        type='text'
                        className='input-proile'
                        name=''
                        id='email'
                        defaultValue='zulaikha17@gmail.com'
                      />
                    </div>
                    <div className='col-12'>
                      <label htmlFor='address'>Address:</label>
                      <input
                        type='text'
                        className='input-proile'
                        name=''
                        id='address'
                        defaultValue='Iskandar Street no. 67 Block A Near Bus Stop'
                      />
                    </div>
                    <div className='col-12'>
                      <label htmlFor='phone'>Mobile Number:</label>
                      <input
                        type='text'
                        className='input-proile'
                        name=''
                        id='phone'
                        defaultValue='(+62)813456782'
                      />
                    </div>
                    <div className='contact-header col-12 text-left'>
                      Identity
                    </div>
                    <div className='col-12'>
                      <div className='row'>
                        <div className='col-12 col-sm-6'>
                          <label htmlFor='display-name'>Display Name:</label>
                          <input
                            type='text'
                            className='input-proile'
                            name=''
                            id='display-name'
                            defaultValue='zulaikha'
                          />
                        </div>
                        <div className='col-12 col-sm-6'>
                          <label htmlFor='dob'>DD/MM/YYYY:</label>
                          <input
                            type='date'
                            className='input-proile'
                            name=''
                            id='dob'
                            defaultValue='2003-09-03'
                          />
                        </div>
                      </div>
                    </div>
                    <div className='col 12'>
                      <div className='row gx-4'>
                        <div className='col-12 col-sm-4'>
                          <Link to='/' className='btn btn-yellow'>
                            Save Change
                          </Link>
                        </div>
                        <div className='col-12 col-sm-4'>
                          <Link to='/' className='btn btn-black'>
                            Edit Password
                          </Link>
                        </div>
                        <div className='col-12 col-sm-4'>
                          <Link to='/' className='btn btn-grey'>
                            Cancel
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='.d-none .d-sm-block col-sm-1'></div>
        </main>
        <Footer />
      </>
    );
  }
}

export default Profile;
