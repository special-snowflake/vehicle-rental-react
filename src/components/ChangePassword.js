import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class ChangePassword extends Component {
  render() {
    return (
      <section className='row content'>
        <br />
        <br />
        <div className='col-12 profile-contacts'>
          <form>
              <div className='contact-header col-12 text-left'>Change Password</div>
            <div className='row justify-content-between'>
              <div className='col-12 col-sm-6'>
                <label htmlFor='oldPassword'>Old Password:</label>
                <input
                  type='password'
                  className='input-proile'
                  name='oldPassword'
                />
              </div>
              <div className='col-12 col-sm-6'>
                <label htmlFor='newPassword'>New Password:</label>
                <input
                  type='password'
                  className='input-proile'
                  name='newPassword'
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
