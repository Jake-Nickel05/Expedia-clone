import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import FlightCard from "./FlightCard";

const getData = async (page, priceRange, from, to) => {
  let url = `http://localhost:8080/flight?_page=${page}&_limit=5`;
  if (priceRange) {
    url += `&price_gte=${priceRange.gte}&price_lte=${priceRange.lte}`;
  }
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  let res = await axios.get(url);
  return res.data;
};

export default function FlightList({ page, priceRange }) {
  const [data, setData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  useEffect(() => {
    getData(page, priceRange, from, to).then((res) => {
      setData(res);
    });
  }, [page, priceRange, from, to]);

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
