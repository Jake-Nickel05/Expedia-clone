import React, { useEffect } from "react";
import axios from "axios";
import FlightCard from "./FlightCard";

const getData = async (page, priceRange) => {
  let url = `http://localhost:8080/flight?_page=${page}&_limit=5`;
  if (priceRange) {
    url += `&price_gte=${priceRange.gte}&price_lte=${priceRange.lte}`;
  }
  let res = await axios.get(url);
  return res.data;
};

export default function FlightList({ page, priceRange }) {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    getData(page, priceRange).then((res) => {
      setData(res);
    });
  }, [page, priceRange]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <FlightCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
