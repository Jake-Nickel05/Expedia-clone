import React, { useEffect, useState } from "react";
import "./adminProduct.css";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetch_users } from "../../Redux/Authantication/auth.action";

export const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { isLoading, users } = useSelector((store) => {
    return {
      isLoading: store.LoginReducer.isLoading,
      users: store.LoginReducer.user,
    };
  }, shallowEqual);

  useEffect(() => {
    dispatch(fetch_users);
  }, []);

  const filteredUsers = users.filter((ele) => {
    const term = search.toLowerCase();
    return (
      (ele.user_name || "").toLowerCase().includes(term) ||
      (ele.number || "").includes(search)
    );
  });

  return (
    <>
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
              placeholder="Search by name or number"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="head"><h1>All Users</h1></div>

          {isLoading ? <h1>Please wait...</h1> : ""}
          {filteredUsers.map((ele, i) => (
            <div key={i} className="adminProductlist">
              <span>{ele.user_name || "—"}</span>
              <span>{ele.number}</span>
              <span>{ele.email || "—"}</span>
              <span>{ele.gender || "—"}</span>
              <span>
                <button onClick={() => navigate(`/admin/users/${ele.id}`)}>
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
