import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import '../assets/css/Login.css';

function SignUp() {
  const navigate = useNavigate();
  const signUpHandler = (e) => {
    e.preventDefault();
    const body = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    const URL = 'http://localhost:8000/auth/register';
    console.log(body, URL);
    axios
      .post(URL, body)
      .then((response) => {
        console.log(response.data);
        return navigate('/login');
      })
      .catch((error) => {
        console.log('Error is: ', error);
        console.log('Error is: ', error.data);
      });
  };
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
              <form onSubmit={signUpHandler}>
                <input
                  type='text'
                  placeholder='Name'
                  id='name'
                  name='name'
                  required
                />
                <br />
                <input
                  type='email'
                  placeholder='Email'
                  id='email'
                  name='email'
                  required
                />
                <br />
                <input
                  type='password'
                  placeholder='Password'
                  id='password'
                  name='password'
                  required
                />
                <button className='btn btn-gold marg-5' type='submit'>
                  Sign Up
                </button>
              </form>
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
