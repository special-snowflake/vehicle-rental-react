import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {connect} from 'react-redux';
import {loginAction} from '../redux/actions/auth';

import Footer from '../components/Footer';
import '../assets/css/Login.css';

import {toast} from 'react-toastify';

class Login extends React.Component {
  state = {
    isSuccess: false,
    errMsg: '',
  };
  handleCallback = (childData) => {
    this.setState({showError: childData});
  };
  componentDidUpdate() {
    const {isFulfilled, isRejected, userData} = this.props.auth;
    console.log('isPending? ', this.props.auth.isPending);
    console.log('isFulfilled? ', this.props.auth.isFulfilled);
    console.log('isRejected? ', this.props.auth.isRejected);
    if (isFulfilled === true) {
      const {navigate} = this.props;
      console.log('it is fullfilled');
      localStorage['vehicle-rental-token'] = JSON.stringify(userData.token);
      localStorage['vehicle-rental-userId'] = JSON.stringify(userData.id);
      localStorage['vehicle-rental-roles'] = JSON.stringify(userData.roles);
      localStorage['vehicle-rental-photo'] = JSON.stringify(userData.photo);
      toast.success('Login success', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return navigate('/home', {replace: true});
    }
    if (isRejected === true) {
      toast.error(this.props.auth.err.errMsg, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  render() {
    const loginHandler = (e) => {
      e.preventDefault();
      const body = {
        user: e.target.user.value,
        password: e.target.password.value,
      };
      this.props.loginDispatch(body);
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
                    <Link to='/forget-password' className='forget-password'>
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
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch: (body) => {
      dispatch(loginAction(body));
    },
  };
};
// export default connect(mapStateToProps, mapDispatchToProps)(Login);

function WrapperLogin(props) {
  const navigate = useNavigate();

  return <Login {...props} navigate={navigate} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(WrapperLogin);
