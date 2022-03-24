import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import Footer from '../components/Footer';
import {checkOTP, getOTP, resetPassword} from '../utils/https/auth';
function ForgetPassword() {
  const [otp, setOTP] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  const [conf, setConf] = useState({
    getOTP: true,
    checkOTP: false,
    resetPassword: false,
  });
  const handleEmail = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setOTP(email);
    const body = {email};
    console.log(e, body);
    getOTP(body)
      .then((res) => {
        console.log(res);
        setConf({...conf, getOTP: false, checkOTP: true});
        setEmail(email);
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.errMsg);
      });
  };
  const handleOTP = (e) => {
    e.preventDefault();
    const otp = e.target.otp.value;
    console.log(otp);
    const body = {
      otp,
      email,
    };
    if (otp.length === 6) {
      console.log(body);
      checkOTP(body)
        .then((res) => {
          console.log(res);
          setEmail(email);
          setConf({...conf, checkOTP: false, resetPassword: true});
        })
        .catch((err) => {
          console.log(err.response);
          toast.error(err.response.data.errMsg);
        });
    }
  };
  const handleResetPassword = (e) => {
    e.preventDefault();
    const nPassword = e.target.newPassword.value;
    const rNPassword = e.target.repeatNewPassword.value;
    if (nPassword === rNPassword) {
      const body = {
        otp,
        email,
        password: nPassword,
      };
      console.log(body);
      resetPassword(body)
        .then((res) => {
          console.log(res);
          toast.success('Reset Password Success');
          navigate('/login');
        })
        .catch((err) => {});
    }
  };
  return (
    <>
      <>
        <main>
          <div className='canvas-forget-password'>
            <div className='content-first'>
              <section className='single-content'>
                <h1>Don't worry, we got your back.</h1>
                <div className='wrapper-forget'>
                  {conf.getOTP ? (
                    <>
                      <form
                        onSubmit={(e) => {
                          handleEmail(e);
                        }}>
                        <input
                          type='email'
                          placeholder='Email'
                          name='email'
                          className='email-forget-password'
                        />
                        <button className='btn btn-yellow'>Send Link</button>
                      </form>
                    </>
                  ) : conf.checkOTP ? (
                    <>
                      <form
                        onSubmit={(e) => {
                          handleOTP(e);
                        }}>
                        <input
                          type='number'
                          placeholder='Please enter OTP'
                          name='otp'
                          className='email-forget-password'
                          style={{
                            textAlign: 'center',
                          }}
                        />
                        <p style={{color: 'white', textAlign: 'center'}}>
                          Please check your email to get your one time password.
                        </p>
                        <button className='btn btn-yellow'>Verify OTP</button>
                      </form>
                    </>
                  ) : (
                    <>
                      <form
                        onSubmit={(e) => {
                          handleResetPassword(e);
                        }}>
                        <input
                          type='password'
                          placeholder='New Password'
                          name='newPassword'
                          className='email-forget-password'
                        />
                        <input
                          type='password'
                          placeholder='Repeat New Password'
                          name='repeatNewPassword'
                          className='email-forget-password'
                        />
                        <button className='btn btn-yellow'>
                          Reset Password
                        </button>
                      </form>
                    </>
                  )}
                  <p className='notice'>
                    You will receive a link to reset your password. If you
                    haven’t received any link, click Resend Link
                  </p>
                  <p
                    className='notice'
                    style={{
                      textAlign: 'center',
                    }}>
                    I remember my password, take me to{' '}
                    <Link
                      to='/login'
                      style={{color: 'white', textDecoration: 'underline'}}>
                      Login.
                    </Link>
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
