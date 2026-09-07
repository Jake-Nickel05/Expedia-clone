import {
  BOOKINGS_REQUEST,
  BOOKINGS_FAILURE,
  FETCH_BOOKINGS_SUCCESS,
  DELETE_BOOKING,
} from "./actionType";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

export const BookingsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKINGS_REQUEST:
      return { ...state, isLoading: true };

    case BOOKINGS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case FETCH_BOOKINGS_SUCCESS:
      return { ...state, isLoading: false, data: payload };

    case DELETE_BOOKING: {
      const filtered = state.data.filter((ele) => ele.id !== payload);
      return { ...state, data: filtered };
    }

    default:
      return state;
  }
};
