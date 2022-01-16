import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ErrorMsg from './ErrorMsg';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default class ChangePassword extends Component {
  state = {
    isError: false,
    showError: false,
    errMsg: null,
  };
  handleChangePassword(e) {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem('vehicle-rental-token'));
    const config = {
      headers: {
        'x-authorized-token': token,
      },
    };

    const urlChangePass = process.env.REACT_APP_HOST + '/user/change-password';
    const body = {
      newPassword: e.target.newPassword.value,
      oldPassword: e.target.oldPassword.value,
    };
    axios
      .patch(urlChangePass, body, config)
      .then((response) => {
        console.log('response', response.data.data);
        this.getDataUser();
      })
      .catch((error) => {
        console.log('error', error.response);
        const errMsg = error.response.data.errMsg;
        // console.log('err msg', errMsg)
        toast.error(errMsg, {
          position: 'bottom-left',
          autoClose: 3000,
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
  }
  handleCallback = (childData) => {
    this.setState({showError: childData});
  };
  render() {
    const {isError, showError, errMsg} = this.state;
    return (
      <section className='row content'>
        <ToastContainer />
        {isError && showError && (
          <ErrorMsg
            parentCallback={this.handleCallback.bind(this)}
            msg={errMsg}
          />
        )}
        <br />
        <br />
        <div className='col-12 profile-contacts'>
          <form onSubmit={this.handleChangePassword.bind(this)}>
            <div className='contact-header col-12 text-left'>
              Change Password
            </div>
            <div className='row justify-content-between'>
              <div className='col-12 col-sm-6'>
                <label htmlFor='oldPassword'>Old Password:</label>
                <input
                  type='password'
                  className='input-proile'
                  name='oldPassword'
                  id='oldPassword'
                />
              </div>
              <div className='col-12 col-sm-6'>
                <label htmlFor='newPassword'>New Password:</label>
                <input
                  type='password'
                  className='input-proile'
                  name='newPassword'
                  id='newPassword'
                />
              </div>
              <div className='col-12 col-sm-4 justify-content-center'>
                <button className='btn btn-yellow'>Save Password</button>
              </div>
              <div className='col-12 col-sm-4 justify-content-center'>
                <Link to='/profile' className='btn btn-grey'>
                  Close
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
