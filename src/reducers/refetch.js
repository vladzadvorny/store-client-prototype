import { REFETCH_INTERFACE, REFETCH_PRODUCTS } from '../actions';

const initialState = {
  interface: Date.now(),
  products: Date.now()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REFETCH_INTERFACE:
      return Object.assign({}, state, {
        interface: Date.now()
      });
    case REFETCH_PRODUCTS:
      return Object.assign({}, state, {
        products: Date.now()
      });
    default:
      return state;
  }
};
