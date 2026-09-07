import {
  CART_REQUEST,
  CART_FAILURE,
  GET_CART_SUCCESS,
  REMOVE_HOTEL_CART_ITEM,
  REMOVE_FLIGHT_CART_ITEM,
  CLEAR_CART,
} from "./actionType";

const initialState = {
  hotelItems: [],
  flightItems: [],
  isLoading: false,
  isError: false,
};

export const CartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CART_REQUEST:
      return { ...state, isLoading: true, isError: false };

    case CART_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        hotelItems: payload.hotelItems,
        flightItems: payload.flightItems,
      };

    case REMOVE_HOTEL_CART_ITEM:
      return {
        ...state,
        hotelItems: state.hotelItems.filter((item) => item.id !== payload),
      };

    case REMOVE_FLIGHT_CART_ITEM:
      return {
        ...state,
        flightItems: state.flightItems.filter((item) => item.id !== payload),
      };

    case CLEAR_CART:
      return {
        ...state,
        hotelItems: state.hotelItems.filter(
          (item) => !payload.hotelCartIds.includes(item.id)
        ),
        flightItems: state.flightItems.filter(
          (item) => !payload.flightCartIds.includes(item.id)
        ),
      };

    default:
      return state;
  }
};
