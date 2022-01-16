import {ActionType} from 'redux-promise-middleware';
import {ACTION_STRING} from '../actions/actionString';

const initialState = {
  userData: {
    // token: JSON.parse(localStorage['vehicle-rental-token'] || null),
    photo: JSON.parse(localStorage['vehicle-rental-photo'] || null),
  },
};

const userPhoto = (prevState = initialState, action) => {
    switch(action.ActionType){
        case ACTION_STRING.authUserPhoto:
            const newPhoto = {};
    }

};

export default userPhoto;