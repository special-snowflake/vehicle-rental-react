import axios from 'axios';
const url = process.env.REACT_APP_HOST + '/vehicles';

export const addVehicle = (body, token) => {
  const newToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': newToken,
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
  const newToken = JSON.parse(token);
  const config = {
    headers: {
      'x-authorized-token': newToken,
    },
  };
  return axios.patch(updateUrl, body, config);
};

export const searchVehicle = () => {
  
};
