import { SIGNIN, SIGNOUT } from '../actions';

const initialState = {
  name: '',
  id: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        name: action.name,
        id: action.id
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
