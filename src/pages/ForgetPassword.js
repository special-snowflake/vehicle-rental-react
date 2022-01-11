import React from 'react';
import Footer from '../components/Footer';
// import {Link} from 'react-router-dom';
function ForgetPassword() {
  return (
    <>
      <>
        <main>
          <div className='canvas-forget-password'>
            <div className='content-first'>
              <section className='single-content'>
                <h1>Don't worry, we got your back.</h1>
                <div className='wrapper-forget'>
                  <input type='text' placeholder='Email' name='' id='' />
                  <button className='btn btn-yellow'>Send Link</button>
                <p className='notice'>
                  You will receive a link to reset your password. If you haven’t
                  received any link, click Resend Link
                </p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </>
    </>
  );
}

export default ForgetPassword;
