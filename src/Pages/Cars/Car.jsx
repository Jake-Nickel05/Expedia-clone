import { useState } from "react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../Flights/homePage.css";
import styles from "../Stay/Stay.module.css";

const initialState = {
  location: "",
  pickupDate: "",
  dropDate: "",
};

export default function Car() {
  const [carSearch, setCarSearch] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCarSearch({ ...carSearch, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const params = new URLSearchParams();
    if (carSearch.location && carSearch.location !== "Pick-up location") {
      params.set("location", carSearch.location);
    }
    navigate(`/cars?${params.toString()}`);
  };

  return (
    <div>
      <div className="homeTop" style={{ marginBottom: "100px" }}>
        <div className="homeTopCard">
          <div className="secondHeader"></div>

          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>PICK-UP LOCATION</span>
              <select
                name="location"
                id="carLocation"
                style={{ width: "200px" }}
                value={carSearch.location}
                onChange={handleChange}
              >
                <option value="Pick-up location">Pick-up location</option>
                <option value="DELHI">DELHI</option>
                <option value="MUMBAI">MUMBAI</option>
                <option value="BANGLURU">BANGLURU</option>
                <option value="PUNE">PUNE</option>
              </select>
            </div>
            <div className="MainSearchinputBx">
              <span>PICK-UP DATE</span>
              <input
                type="date"
                name="pickupDate"
                value={carSearch.pickupDate}
                onChange={handleChange}
              />
            </div>
            <div className="MainSearchinputBx">
              <span>DROP-OFF DATE</span>
              <input
                type="date"
                name="dropDate"
                value={carSearch.dropDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="homeSearchButtonBx">
            <Button
              colorScheme="blue"
              size="lg"
              className={styles["SearchBtn1"]}
              style={{ margin: "auto" }}
              onClick={handleClick}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
