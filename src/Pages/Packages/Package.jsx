import { useState } from "react";
import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../Flights/homePage.css";
import styles from "../Stay/Stay.module.css";

const initialState = {
  destination: "",
  travelers: 1,
};

export default function Package() {
  const [packageSearch, setPackageSearch] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPackageSearch({ ...packageSearch, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const params = new URLSearchParams();
    if (packageSearch.destination && packageSearch.destination !== "Destination") {
      params.set("destination", packageSearch.destination);
    }
    navigate(`/packages?${params.toString()}`);
  };

  return (
    <div>
      <div className="homeTop" style={{ marginBottom: "100px" }}>
        <div className="homeTopCard">
          <div className="secondHeader"></div>

          <div className="homeMainSearchInput">
            <div className="MainSearchinputBx">
              <span>DESTINATION</span>
              <select
                name="destination"
                id="packageDestination"
                style={{ width: "200px" }}
                value={packageSearch.destination}
                onChange={handleChange}
              >
                <option value="Destination">Destination</option>
                <option value="Goa">Goa</option>
                <option value="Kerala">Kerala</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Manali">Manali</option>
                <option value="Kashmir">Kashmir</option>
              </select>
            </div>
            <div className="MainSearchinputBx">
              <span>TRAVELLERS</span>
              <input
                type="number"
                min="1"
                name="travelers"
                value={packageSearch.travelers}
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
