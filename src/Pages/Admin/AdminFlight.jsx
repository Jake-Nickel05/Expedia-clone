import "./Admin.Module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addFlight, updateFlight } from "../../Redux/AdminFlights/action";
import { Link, useNavigate, useParams } from "react-router-dom";

let initialState = {
  airline: "",
  number: "",
  from: "",
  to: "",
  departure: "",
  arrival: "",
  price: "",
  totalTime: "",
};
export const Admin = () => {
  const [flight, setFlight] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      axios.get(`http://localhost:8080/flight/${id}`).then((res) => {
        const {
          airline,
          number,
          from,
          to,
          departure,
          arrival,
          price,
          totalTime,
        } = res.data;
        setFlight({
          airline,
          number,
          from,
          to,
          departure,
          arrival,
          price,
          totalTime,
        });
      });
    } else {
      setFlight(initialState);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFlight((prev) => {
      return { ...prev, [name]: name === "price" ? +value : value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      dispatch(updateFlight(id, flight));
    } else {
      dispatch(addFlight(flight));
    }
    setFlight(initialState);
    navigate("/admin/products");
  };
  return (
    <>
      <div className="adminFlightMai">
        <div className="adminSideBr">
        <h1><Link to={"/admin"}>Home</Link></h1>
          <h1><Link to={"/admin/adminflight"}>Add Flight</Link></h1>
          <h1><Link to={"/admin/adminstay"}>Add Stays</Link></h1>
          <h1><Link to={"/admin/products"}>All Flights</Link></h1>
          <h1><Link to={"/admin/hotels"}>All Hotels</Link></h1>
          <h1><Link to={"/"}>Log out</Link></h1>

        </div>
        <div className="adminFlightBox">
          <div className="adminHead">
            <h2>{isEditMode ? "Edit Flight" : "Admin Panel for Flights"}</h2>
          </div>

          <div className="adminFlightInputs">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className="adminFlightInputBx">
                <label htmlFor="">Airline</label>
                <input
                  type="text"
                  id="input"
                  name="airline"
                  value={flight.airline}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Flight Number</label>
                <input
                  id="input"
                  type="text"
                  name="number"
                  value={flight.number}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">From</label>
                <input
                  id="input"
                  type="text"
                  name="from"
                  value={flight.from}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">To</label>
                <input
                  id="input"
                  type="text"
                  name="to"
                  value={flight.to}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Departure</label>
                <input
                  id="input"
                  type="text"
                  name="departure"
                  value={flight.departure}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Arrival</label>
                <input
                  id="input"
                  type="text"
                  name="arrival"
                  value={flight.arrival}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">Price</label>
                <input
                  id="input"
                  type="number"
                  name="price"
                  value={flight.price}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <label htmlFor="">TotalTime</label>
                <input
                  id="input"
                  type="text"
                  name="totalTime"
                  value={flight.totalTime}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="adminFlightInputBx">
                <span></span>
                <button>{isEditMode ? "Update Flight Info" : "Add Flight Info"}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>

    // <div className="flightBody">
    //   {/* <div id="link">
    //     <Link to={"/"}>Home</Link>
    //     <Link to={"/adminflight"}>Admin Flight</Link>
    //     <Link to={"/adminhotel"}>Admin Hotel</Link>
    //   </div>
    //   <div>
    //     <Wrapper>
    //       <form
    //         onSubmit={(e) => {
    //           handleSubmit(e);
    //         }}
    //       >
    //         <FormControl>
    //           <Heading id="head">Admin Panel for Flights</Heading>
    //           <Box className="Box">
    //             <FormLabel id="label">Airline</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="airline"
    //               value={flight.airline}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">Flight Number</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="number"
    //               value={flight.number}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">From</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="from"
    //               value={flight.from}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">To</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="to"
    //               value={flight.to}
    //               onChange={(e) => handleChange(e)}
    //             />

    //             <FormLabel id="label">Departure</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="departure"
    //               value={flight.departure}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">Arrival</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="arrival"
    //               value={flight.arrival}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">Price</FormLabel>
    //             <Input
    //               id="input"
    //               type="number"
    //               name="price"
    //               value={flight.price}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <FormLabel id="label">TotalTime</FormLabel>
    //             <Input
    //               id="input"
    //               type="text"
    //               name="totalTime"
    //               value={flight.totalTime}
    //               onChange={(e) => handleChange(e)}
    //             />
    //             <Button id="btn" variant="outline" type="submit">
    //               Add Flight Info
    //             </Button>
    //           </Box>
    //         </FormControl>
    //       </form>
    //     </Wrapper>
    //   </div> */}
    // </div>
  );
};
