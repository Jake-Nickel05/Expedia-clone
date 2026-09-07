import { Admin } from "./Admin/AdminFlight";
import { AdminStay } from "./Admin/AdminStay";
import React from 'react'
import { Route, Routes } from "react-router-dom";
// import { HomePage } from "./HomePage";
import { AdminDashboard } from "./Admin/AdminDashboard";
import { AdminProducts } from "./Admin/AdminProducts";
import { AllHotels } from "./Admin/AllHotels";
import { AdminUsers } from "./Admin/AdminUsers";
import { AdminUserDetail } from "./Admin/AdminUserDetail";
import { AdminBookings } from "./Admin/AdminBookings";
import { AdminBookingDetail } from "./Admin/AdminBookingDetail";
import { Destination } from "./ThingsTodo/Destination";
import HomePage from "./HomePage";
import { Login } from "./Login";
import { Register } from "./Register";
import StayData from "./Stay/StayData";
import HotelDetails from "./Stay/HotelDetails";
import CheckoutPage from "./CheckoutPage";
import FlightData from "./Flights/FlightData";
import FlightDetails from "./Flights/FlightDetails";
import Cart from "./Cart";

export const AllRoutes = () => {
    return (
        <>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/adminflight" element={<Admin />} />
            <Route path="/admin/adminflight/:id" element={<Admin />} />
            <Route path="/admin/adminstay" element={<AdminStay />} />
            <Route path="/admin/adminstay/:id" element={<AdminStay />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/admin/hotels" element={<AllHotels />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/users/:id" element={<AdminUserDetail />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/bookings/:id" element={<AdminBookingDetail />} />
            <Route path="/ThingsToDo" element={<Destination/>}/>
            <Route path="/stay" element={<StayData />} />
            <Route path="/stay/:id" element={<HotelDetails />} />
            <Route path="/flight" element={<FlightData />} />
            <Route path="/flight/:id" element={<FlightDetails />} />
            <Route path="/cart" element={<Cart />} />
            
            <Route path="/checkout" element={<CheckoutPage/>} ></Route>
          </Routes>
        </>
      );
}

// add