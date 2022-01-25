import axios from 'axios';
const url = process.env.REACT_APP_HOST + '/testimony';

export const getTestimony = (filter) => {
  const urlGetTesti = url + filter;
  return axios.get(urlGetTesti);
};
