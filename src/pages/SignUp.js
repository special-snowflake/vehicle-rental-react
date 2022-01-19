import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
// import axios from 'axios';
import {register} from '../utils/https/auth';

import {toast} from 'react-toastify';

import ErrorMsg from '../components/ErrorMsg';
import Footer from '../components/Footer';

import '../assets/css/Login.css';

class SignUp extends React.Component {
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
    const {navigate} = this.props;
    const signUpHandler = (e) => {
      e.preventDefault();
      const body = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      // const URL = process.env.REACT_APP_HOST + '/auth/register';
      // console.log(body, URL);
      // axios
      //   .post(URL, body)
      register(body)
        .then((response) => {
          console.log(response);
          toast.success(response.data.msg, {
            position: 'bottom-left',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            return navigate('/login', {replace: false});
          }, 2500);
        })
        .catch((error) => {
          toast.error(error.response.data.errMsg, {
            position: 'bottom-left',
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // this.setState({
          //   isError: true,
          //   showError: true,
          //   errMsg: error.response.data.errMsg,
          // });
        });
    };
    const {isError, errMsg, showError} = this.state;
    console.log('Error is: ', isError, errMsg, showError);
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
                {isError && showError && (
                  <ErrorMsg parentCallback={this.handleCallback} msg={errMsg} />
                )}
                <form onSubmit={signUpHandler}>
                  <input
                    type='text'
                    placeholder='Name'
                    id='name'
                    name='name'
                    required
                    autoFocus
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
}

export default function WrapperSignUp(props) {
  const navigate = useNavigate();

  return <SignUp {...props} navigate={navigate} />;
}
