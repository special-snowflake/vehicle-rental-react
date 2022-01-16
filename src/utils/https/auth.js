import axios from 'axios';
const URL = process.env.REACT_APP_HOST + '/auth';
export const login = (body) => {
  return axios.post(URL, body);
};
