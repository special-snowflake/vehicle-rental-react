import axios from 'axios';
const URL = process.env.REACT_APP_HOST + '/city';

export const getCity = () => {
  return axios.get(URL);
};
