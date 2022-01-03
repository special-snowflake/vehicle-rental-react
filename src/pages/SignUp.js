import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import '../assets/css/Login.css';

function SignUp() {
  return (
    <>
      <main className='canvas'>
        <div className='content-first'>
          <div className='left'>
            <div className='wrapper'>
              <div className='title'>
                <div className='title'>Let's Explore The World</div>
              </div>
              <p className='account'>Already have account?</p>
              <Link
                to='/login'
                className='btn btn-black'
                style={{maxWidth: '60vw', margin: 'auto'}}>
                    Login
              </Link>
            </div>
          </div>
          <div className='middle'></div>
          <div className='right'>
            <div className='wrapper'>
              <input type='text' placeholder='Name' />
              <br />
              <input type='email' placeholder='Email' />
              <br />
              <input type='password' placeholder='Password' />
              <button className='btn btn-gold marg-5'>Sign Up</button>
              <button
                className='btn btn-white marg-5'
                style={{display: 'inline-block'}}>
                <span className='btn-google'></span>Sign Up with Google
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default SignUp;
