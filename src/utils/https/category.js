import axios from 'axios';
const URL = process.env.REACT_APP_HOST + '/category';

export const getCategory = (body) => {
  return axios.get(URL, body);
};
