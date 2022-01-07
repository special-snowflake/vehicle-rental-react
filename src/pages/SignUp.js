import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Footer from '../components/Footer';
import axios from 'axios';
import '../assets/css/Login.css';
import ErrorMsg from '../components/ErrorMsg';

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
      const URL = 'http://localhost:8000/auth/register';
      console.log(body, URL);
      axios
        .post(URL, body)
        .then((response) => {
          console.log(response);
          return navigate('/login', {replace: true});
        })
        .catch((error) => {
          this.setState({
            isError: true,
            showError: true,
            errMsg: error.response.data.errMsg,
          });
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
