import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import CarCard from "./CarCard";

const getData = async (page, priceRange, location, carType, transmission) => {
  let url = `http://localhost:8080/car?_page=${page}&_limit=5`;
  if (priceRange) {
    url += `&pricePerDay_gte=${priceRange.gte}&pricePerDay_lte=${priceRange.lte}`;
  }
  if (location) url += `&location=${location}`;
  if (carType) url += `&type=${carType}`;
  if (transmission) url += `&transmission=${transmission}`;
  let res = await axios.get(url);
  return res.data;
};

export default function CarList({ page, priceRange, carType, transmission }) {
  const [data, setData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location");

  useEffect(() => {
    getData(page, priceRange, location, carType, transmission).then((res) => {
      setData(res);
    });
  }, [page, priceRange, location, carType, transmission]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <CarCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
