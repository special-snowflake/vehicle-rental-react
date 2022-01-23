import axios from 'axios';

const URL = process.env.REACT_APP_HOST + '/history';
// const token = JSON.parse(localStorage['vehicle-rental-token']);

// const config = {
//   headers: {
//     'x-authorized-token': token,
//   },
// };
export const addTransaction = (body, token) => {
  const newToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': newToken,
    },
  };
  return axios.post(URL, body, config);
};

export const searchHistory = (filter, token) => {
  const newToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': newToken,
    },
  };
  const searchUrl = URL + `/search?${filter}`;
  return axios.get(searchUrl, config);
};

export const deleteHistory = (body, token) => {
  const newToken = JSON.parse(token);
  console.log(token, body);
  const config = {
    headers: {
      'x-authorized-token': newToken,
    },
    data: {historyIds: body.historyIds},
  };
  return axios.delete(URL, config);
};
