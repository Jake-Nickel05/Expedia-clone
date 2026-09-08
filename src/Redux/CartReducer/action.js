import axios from "axios";
import {
  CART_REQUEST,
  CART_FAILURE,
  GET_CART_SUCCESS,
  REMOVE_HOTEL_CART_ITEM,
  REMOVE_FLIGHT_CART_ITEM,
  REMOVE_CAR_CART_ITEM,
  REMOVE_PACKAGE_CART_ITEM,
  CLEAR_CART,
} from "./actionType";

// Loads hotelcart, flightcart, carcart, and packagecart together. None of
// these requests depend on each other, so they run in parallel.
export const fetchCart = () => async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  try {
    const [hotelRes, flightRes, carRes, packageRes] = await Promise.all([
      axios.get("http://localhost:8080/hotelcart"),
      axios.get("http://localhost:8080/flightcart"),
      axios.get("http://localhost:8080/carcart"),
      axios.get("http://localhost:8080/packagecart"),
    ]);
    dispatch({
      type: GET_CART_SUCCESS,
      payload: {
        hotelItems: hotelRes.data,
        flightItems: flightRes.data,
        carItems: carRes.data,
        packageItems: packageRes.data,
      },
    });
  } catch (err) {
    console.error("Failed to load cart:", err);
    dispatch({ type: CART_FAILURE });
  }
};

export const removeHotelFromCart = (cartItemId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/hotelcart/${cartItemId}`);
    dispatch({ type: REMOVE_HOTEL_CART_ITEM, payload: cartItemId });
  } catch (err) {
    console.error("Failed to remove hotel from cart:", err);
    dispatch({ type: CART_FAILURE });
  }
};

export const removeFlightFromCart = (cartItemId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/flightcart/${cartItemId}`);
    dispatch({ type: REMOVE_FLIGHT_CART_ITEM, payload: cartItemId });
  } catch (err) {
    console.error("Failed to remove flight from cart:", err);
    dispatch({ type: CART_FAILURE });
  }
};

export const removeCarFromCart = (cartItemId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/carcart/${cartItemId}`);
    dispatch({ type: REMOVE_CAR_CART_ITEM, payload: cartItemId });
  } catch (err) {
    console.error("Failed to remove car from cart:", err);
    dispatch({ type: CART_FAILURE });
  }
};

export const removePackageFromCart = (cartItemId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/packagecart/${cartItemId}`);
    dispatch({ type: REMOVE_PACKAGE_CART_ITEM, payload: cartItemId });
  } catch (err) {
    console.error("Failed to remove package from cart:", err);
    dispatch({ type: CART_FAILURE });
  }
};

// Called after a successful checkout to empty out whatever was just booked.
export const clearCartItems = (hotelCartIds, flightCartIds, carCartIds = [], packageCartIds = []) => async (dispatch) => {
  try {
    await Promise.all([
      ...hotelCartIds.map((id) => axios.delete(`http://localhost:8080/hotelcart/${id}`)),
      ...flightCartIds.map((id) => axios.delete(`http://localhost:8080/flightcart/${id}`)),
      ...carCartIds.map((id) => axios.delete(`http://localhost:8080/carcart/${id}`)),
      ...packageCartIds.map((id) => axios.delete(`http://localhost:8080/packagecart/${id}`)),
    ]);
    dispatch({ type: CLEAR_CART, payload: { hotelCartIds, flightCartIds, carCartIds, packageCartIds } });
  } catch (err) {
    console.error("Failed to clear cart after checkout:", err);
  }
};
