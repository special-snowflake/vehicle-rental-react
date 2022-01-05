import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import '../assets/css/Login.css';

function Login() {
  const navigate = useNavigate();
  const loginHandler = (e) => {
    const URL = 'http://localhost:8000/auth/';
    e.preventDefault();
    const body = {
      user: e.target.user.value,
      password: e.target.password.value,
    };
    console.log(URL, body);
    axios
      .post(URL, body)
      .then((response) => {
        console.log(response);
        const token = response.data.data.token;
        console.log(token);
        localStorage.setItem('vehicle-rental-token', JSON.stringify(token));
        return navigate('/home', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                <form className='login-form' onSubmit={loginHandler}>
                  <input
                    type='text'
                    placeholder='Username or Email'
                    name='user'
                    id='user'
                    required
                  />
                  <br />
                  <input
                    type='password'
                    placeholder='Password'
                    name='password'
                    required
                  />
                  <br />
                  <p></p>
                  <Link to='/foget-password' className='forget-password'>
                    Forget Password?
                  </Link>
                  {/* <Link to='/home' className='btn btn-gold'>Login</Link> */}
                  <button className='btn btn-gold' type='submit'>
                    Login
                  </button>
                </form>
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
