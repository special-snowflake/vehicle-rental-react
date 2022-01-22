import axios from 'axios';
const url = process.env.REACT_APP_HOST + '/vehicles';

export const addVehicle = (body, token) => {
  const parsedToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': parsedToken,
    },
  };
  return axios.post(url, body, config);
};

export const getVehicleDetail = (id) => {
  const detailUrl = url + `/detail/${id}`;
  console.log(detailUrl);
  return axios.get(detailUrl);
};

export const updateVehicles = (id, body, token) => {
  const updateUrl = url + `/${id}`;
  const parsedToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': parsedToken,
    },
  };
  return axios.patch(updateUrl, body, config);
};

export const searchVehicle = (filter) => {
  const urlSearch = url + '/search' + filter;
  return axios.get(urlSearch);
};
