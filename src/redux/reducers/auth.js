import {ActionType} from 'redux-promise-middleware';
import {ACTION_STRING} from '../actions/actionString';

const initialState = {
  userData: {
    token: JSON.parse(localStorage['vehicle-rental-token'] || null),
    photo: JSON.parse(localStorage['vehicle-rental-photo'] || null),
    roles: JSON.parse(localStorage['vehicle-rental-roles'] || null),
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {},
};

const authReducer = (prevState = initialState, action) => {
  const {authLogin, authUserPhoto} = ACTION_STRING;
  const {Pending, Fulfilled, Rejected} = ActionType;
  console.log(action.type);

  switch (action.type) {
    case authLogin.concat('_', Pending):
      console.log('is isPeding redux middleware: ');
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    case authLogin.concat('_', Fulfilled):
      console.log('is fullfiled redux middleware: ');
      const data = action.payload.data;
      console.log(action.payload);
      const userData = {
        ...prevState.userData,
        token: data.data.token,
        photo: data.data.photo,
        id: data.data.id,
        roles: data.data.roles,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    case authLogin.concat('_', Rejected):
      console.log('is rejected redux middleware:', action.type);
      const err = action.payload.response.data;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err,
      };

    case authUserPhoto:
      const newImage = action.payload.image;
      return {
        ...prevState,
        userData: {
          ...prevState.userData,
          photo: newImage,
        },
      };
    default:
      return prevState;
  }
};

// const authUserPhoto = (prevState = initialState, action) => {};

export default authReducer;
