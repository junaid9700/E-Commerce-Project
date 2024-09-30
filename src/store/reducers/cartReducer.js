// reducers/cartReducer.js

import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART } from '../actions/cartActions';

const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case UPDATE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
