import React, { useEffect, useState } from "react";
import "./adminProduct.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { cancelBooking, fetchBookings } from "../../Redux/AdminBookings/action";

export const AdminBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { isLoading, data } = useSelector((store) => {
    return {
      isLoading: store.BookingsReducer.isLoading,
      data: store.BookingsReducer.data,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetchBookings());
  }, []);

  const handleCancelBooking = (id) => {
    dispatch(cancelBooking(id));
    toast.success("Booking Cancelled", {
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

  const term = search.toLowerCase();
  const filteredBookings = data
    .filter(
      (ele) =>
        (ele.guestFirstName || "").toLowerCase().includes(term) ||
        (ele.guestSurname || "").toLowerCase().includes(term) ||
        (ele.guestMobile || "").includes(search)
    )
    // newest first, so a booking that just came through checkout shows up immediately
    .slice()
    .sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));

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
          <h1><Link to={"/"}>Log out</Link></h1>
        </div>
        <div className="adminProductbox">
          <div className="filterProdcut">
            <input
              placeholder="Search by guest name or mobile"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="head"><h1>All Bookings</h1></div>

          {isLoading ? <h1>Please wait...</h1> : ""}
          {!isLoading && filteredBookings.length === 0 ? (
            <h1>No bookings yet.</h1>
          ) : (
            ""
          )}
          {filteredBookings.map((ele) => (
            <div key={ele.id} className="adminProductlist">
              <span>
                {ele.guestFirstName} {ele.guestSurname}
              </span>
              <span>{ele.guestMobile}</span>
              <span>
                {ele.hotels?.length || 0} hotel(s), {ele.flights?.length || 0} flight(s)
              </span>
              <span>Rs.{ele.total}</span>
              <span>{new Date(ele.bookedAt).toLocaleString()}</span>
              <span>
                <button onClick={() => handleCancelBooking(ele.id)}>
                  Cancel <i className="fa fa-trash"></i>
                </button>
                <button onClick={() => navigate(`/admin/bookings/${ele.id}`)}>
                  View <i className="fa fa-eye"></i>
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
