import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import '../assets/css/Login.css';

function Login() {
  return (
    <>
      <main>
        <div className='canvas'>
          <div className='content-first'>
            <section className='left'>
              <div className='wrapper'>
                <div className='title'>
                  <div className='title'>Let's Explore The World</div>
                </div>
                <p className='account'>Don't have account?</p>
                <br />
                <Link
                  to='/signup'
                  className='btn btn-black'
                  style={{maxWidth: '60vw', margin: 'auto'}}>
                  Sign Up
                </Link>
              </div>
            </section>
            <section className='middle'></section>
            <section className='right' id='login'>
              <div className='wrapper'>
              <input type='email' placeholder='Email' />
                <br />
                <input type='password' placeholder='Password' />
                <br />
                <p>
                </p>
                <Link to='/foget-password' className='forget-password'>Forget Password?</Link>
                <Link to='/home' className='btn btn-gold'>Login</Link>
                <button
                  className='btn btn-white'
                  style={{display: 'inline-block'}}>
                  <span className='btn-google'></span>Login with Google
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Login;
