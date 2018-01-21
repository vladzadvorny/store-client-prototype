import { NEW_CATEGORY } from '../actions';

export default (state = { id: '', name: '' }, action) => {
  switch (action.type) {
    case NEW_CATEGORY:
      return {
        name: action.category.name,
        id: action.category.id
      };

    default:
      return state;
  }
};
