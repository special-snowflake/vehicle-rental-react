import {ACTION_STRING} from './actionString';
import {login} from '../../utils/https/auth';

export const loginAction = (body) => {
  console.log('body:', body);
  return {
    type: ACTION_STRING.authLogin,
    payload: login(body),
  };
};

export const updateUserPhoto = (image) =>{
  return {
    type:ACTION_STRING.authUserPhoto,
    payload: image,
  }
}