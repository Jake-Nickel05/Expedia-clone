import axios from "axios";
import {
  BOOKINGS_REQUEST,
  BOOKINGS_FAILURE,
  FETCH_BOOKINGS_SUCCESS,
  DELETE_BOOKING,
} from "./actionType";

export const bookingsRequest = () => {
  return { type: BOOKINGS_REQUEST };
};

export const bookingsFailure = () => {
  return { type: BOOKINGS_FAILURE };
};

export const fetchBookingsSuccess = (payload) => {
  return { type: FETCH_BOOKINGS_SUCCESS, payload };
};

export const handleDeleteBooking = (payload) => {
  return { type: DELETE_BOOKING, payload };
};

export const fetchBookings = () => (dispatch) => {
  dispatch(bookingsRequest());

  axios
    .get("http://localhost:8080/bookings")
    .then((res) => {
      dispatch(fetchBookingsSuccess(res.data));
    })
    .catch((err) => {
      dispatch(bookingsFailure());
    });
};

export const cancelBooking = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/bookings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(handleDeleteBooking(id));
  } catch (e) {
    dispatch(bookingsFailure());
  }
};
