import axios from 'axios';

const URL = process.env.REACT_APP_HOST + '/auth';

export const login = (body) => {
  return axios.post(URL, body);
};

export const register = (body) => {
  const urlRegister = URL + '/register';
  return axios.post(urlRegister, body);
};

export const getOTP = (body) => {
  const urlOTP = URL + '/get-otp';
  return axios.post(urlOTP, body);
};

export const checkOTP = (body) => {
  const urlCheckOTP = URL + '/check-otp';
  return axios.post(urlCheckOTP, body);
};

export const resetPassword = (body) => {
  const urlResetPassword = URL + '/reset-password';
  return axios.post(urlResetPassword, body);
};
