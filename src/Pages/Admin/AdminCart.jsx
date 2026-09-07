import React, { useEffect } from "react";
import "./adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  removeHotelFromCart,
  removeFlightFromCart,
} from "../../Redux/CartReducer/action";

export const AdminCart = () => {
  const dispatch = useDispatch();
  const { hotelItems, flightItems, isLoading } = useSelector(
    (store) => store.CartReducer
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const handleRemoveHotel = (id) => {
    dispatch(removeHotelFromCart(id));
    toast.success("Removed from cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleRemoveFlight = (id) => {
    dispatch(removeFlightFromCart(id));
    toast.success("Removed from cart", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const isEmpty = hotelItems.length === 0 && flightItems.length === 0;

  return (
    <>
      <ToastContainer />
      <div className="adminProductMain">
        <div className="adminSideBr">
          <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/admin/users"}>All Users</Link></h1>
          <h1><Link to={"/admin/bookings"}>All Bookings</Link></h1>
          <h1><Link to={"/admin/cart"}>Cart Oversight</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="adminProductbox">
          <div className="head">
            <h1>Cart Oversight</h1>
          </div>

          {isLoading ? <h1>Please wait...</h1> : ""}
          {!isLoading && isEmpty ? <h1>No items currently in any cart.</h1> : ""}

          {hotelItems.length > 0 && (
            <>
              <div className="head" style={{ fontSize: "20px", marginTop: "10px" }}>
                <h2>Hotels in Cart ({hotelItems.length})</h2>
              </div>
              {hotelItems.map((ele) => (
                <div key={`hotel-${ele.id}`} className="adminProductlist">
                  <span>
                    <img src={ele.image} alt="" />
                  </span>
                  <span>{ele.name}</span>
                  <span>{ele.place}</span>
                  <span>Rs.{ele.price}</span>
                  <span>
                    <button onClick={() => handleRemoveHotel(ele.id)}>
                      Remove <i className="fa fa-trash"></i>
                    </button>
                  </span>
                </div>
              ))}
            </>
          )}

          {flightItems.length > 0 && (
            <>
              <div className="head" style={{ fontSize: "20px", marginTop: "10px" }}>
                <h2>Flights in Cart ({flightItems.length})</h2>
              </div>
              {flightItems.map((ele) => (
                <div key={`flight-${ele.id}`} className="adminProductlist">
                  <span>{ele.airline}</span>
                  <span>{ele.from}</span>
                  <span>{ele.to}</span>
                  <span>Rs.{ele.price}</span>
                  <span>
                    <button onClick={() => handleRemoveFlight(ele.id)}>
                      Remove <i className="fa fa-trash"></i>
                    </button>
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};
