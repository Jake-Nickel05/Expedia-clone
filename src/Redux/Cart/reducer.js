import {
  CART_REQUEST,
  CART_FAILURE,
  GET_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
} from "./actionType";

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
};

export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_REQUEST:
      return { ...state, isLoading: true };

    case CART_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case GET_CART_SUCCESS:
      return { ...state, isLoading: false, items: payload };

    case ADD_TO_CART_SUCCESS:
      return { ...state, isLoading: false, items: [...state.items, payload] };

    case REMOVE_FROM_CART_SUCCESS:
      return { ...state, items: state.items.filter((i) => i.id !== payload) };

    default:
      return state;
  }
};
