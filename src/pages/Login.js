import React from 'react';

import {Link, useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';

import axios from 'axios';
import ErrorMsg from '../components/ErrorMsg';
import '../assets/css/Login.css';

class Login extends React.Component {
  state = {
    isError: false,
    showError: false,
    isSuccess: false,
    errMsg: '',
  };
  handleCallback = (childData) => {
    this.setState({showError: childData});
  };
  render() {
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
          const {navigate} = this.props;
          console.log(response);
          const token = response.data.data.token;
          console.log(token);
          localStorage.setItem('vehicle-rental-token', JSON.stringify(token));
          return navigate('/home', {replace: true});
        })
        .catch((error) => {
          console.log('error is:', error.response.data);
          this.setState({
            isError: true,
            showError: true,
            errMsg: error.response.data.errMsg,
          });
        });
    };
    const {isError, errMsg, showError} = this.state;
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
                  {isError && showError && (
                    <ErrorMsg
                      parentCallback={this.handleCallback}
                      msg={errMsg}
                    />
                  )}
                  <form className='login-form' onSubmit={loginHandler}>
                    <input
                      type='text'
                      placeholder='Username or Email'
                      name='user'
                      id='user'
                      required
                      autoFocus
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
}
export default function WrapperLogin(props) {
  const navigate = useNavigate();

  return <Login {...props} navigate={navigate} />;
}
