import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./adminProduct.css";

export const AdminUserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/users/${id}`)
      .then((res) => setUser(res.data))
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
        <h1><Link to={"/"}>Log out</Link></h1>
      </div>
      <div className="adminProductbox">
        <div className="head"><h1>User Details</h1></div>

        {notFound ? (
          <h1>User not found.</h1>
        ) : !user ? (
          <h1>Please wait...</h1>
        ) : (
          <div
            style={{
              padding: "10px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              fontSize: "16px",
            }}
          >
            <div><strong>Name:</strong> {user.user_name || "—"}</div>
            <div><strong>Phone Number:</strong> {user.number || "—"}</div>
            <div><strong>Email:</strong> {user.email || "—"}</div>
            <div><strong>Date of Birth:</strong> {user.dob || "—"}</div>
            <div><strong>Gender:</strong> {user.gender || "—"}</div>
            <div><strong>Marital Status:</strong> {user.marital_status || "—"}</div>
            <div><strong>User ID:</strong> {user.id}</div>
          </div>
        )}

        <div style={{ padding: "20px" }}>
          <Link to="/admin/users">Back to All Users</Link>
        </div>
      </div>
    </div>
  );
};
