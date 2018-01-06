import decode from 'jwt-decode';

import { SIGNIN, SIGNOUT } from '../actions';

const token = localStorage.getItem('token');

let initialState;

try {
  const { user } = decode(token);
  initialState = user;
} catch (error) {
  initialState = {
    name: '',
    id: ''
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        name: action.me.name,
        id: action.me.id
      };
    case SIGNOUT:
      return {
        name: '',
        id: ''
      };
    default:
      return state;
  }
};
