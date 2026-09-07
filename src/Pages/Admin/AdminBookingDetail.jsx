import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./adminProduct.css";

export const AdminBookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/bookings/${id}`)
      .then((res) => setBooking(res.data))
      .catch(() => setNotFound(true));
  }, [id]);

  return (
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
        <div className="head"><h1>Booking Details</h1></div>

        {notFound ? (
          <h1>Booking not found.</h1>
        ) : !booking ? (
          <h1>Please wait...</h1>
        ) : (
          <div style={{ padding: "10px 20px", display: "flex", flexDirection: "column", gap: "20px", fontSize: "16px" }}>
            <div>
              <strong>Guest:</strong> {booking.guestFirstName} {booking.guestSurname}
            </div>
            <div><strong>Mobile:</strong> {booking.guestMobile}</div>
            <div><strong>Account (userNumber):</strong> {booking.userNumber || "Guest checkout"}</div>
            <div><strong>Booked At:</strong> {new Date(booking.bookedAt).toLocaleString()}</div>

            {booking.hotels?.length > 0 && (
              <div>
                <strong>Hotels</strong>
                {booking.hotels.map((h, i) => (
                  <div key={i} style={{ padding: "8px 0", borderTop: "1px solid #eee" }}>
                    {h.name} — {h.place} — Rs.{h.price}
                  </div>
                ))}
              </div>
            )}

            {booking.flights?.length > 0 && (
              <div>
                <strong>Flights</strong>
                {booking.flights.map((f, i) => (
                  <div key={i} style={{ padding: "8px 0", borderTop: "1px solid #eee" }}>
                    {f.airline} {f.number} — {f.from} to {f.to} — Rs.{f.price}
                  </div>
                ))}
              </div>
            )}

            <div style={{ borderTop: "2px solid #ccc", paddingTop: "10px" }}>
              <div>Subtotal: Rs.{booking.subtotal}</div>
              <div>Taxes: Rs.{booking.taxes}</div>
              <div style={{ fontWeight: "bold" }}>Total: Rs.{booking.total}</div>
            </div>
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <Link to="/admin/bookings">Back to All Bookings</Link>
        </div>
      </div>
    </div>
  );
};
