import axios from "axios";
import {
  CART_REQUEST,
  CART_FAILURE,
  GET_CART_SUCCESS,
  ADD_TO_CART_SUCCESS,
  REMOVE_FROM_CART_SUCCESS,
} from "./actionType";

const collectionFor = (type) => (type === "hotel" ? "hotelcart" : "flightcart");

export const addToCart = (item, type, userNumber) => async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  try {
    const res = await axios.post(`http://localhost:8080/${collectionFor(type)}`, {
      ...item,
      itemId: item.id,
      userNumber,
    });
    dispatch({
      type: ADD_TO_CART_SUCCESS,
      payload: { ...res.data, cartType: type },
    });
  } catch (err) {
    dispatch({ type: CART_FAILURE });
  }
};

export const fetchCart = (userNumber) => async (dispatch) => {
  dispatch({ type: CART_REQUEST });
  try {
    const [hotelRes, flightRes] = await Promise.all([
      axios.get(`http://localhost:8080/hotelcart?userNumber=${userNumber}`),
      axios.get(`http://localhost:8080/flightcart?userNumber=${userNumber}`),
    ]);
    const items = [
      ...hotelRes.data.map((i) => ({ ...i, cartType: "hotel" })),
      ...flightRes.data.map((i) => ({ ...i, cartType: "flight" })),
    ];
    dispatch({ type: GET_CART_SUCCESS, payload: items });
  } catch (err) {
    dispatch({ type: CART_FAILURE });
  }
};

export const removeFromCart = (id, type) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:8080/${collectionFor(type)}/${id}`);
    dispatch({ type: REMOVE_FROM_CART_SUCCESS, payload: id });
  } catch (err) {
    dispatch({ type: CART_FAILURE });
  }
};
