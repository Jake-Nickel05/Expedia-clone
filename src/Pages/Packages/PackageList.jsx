import React, { useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PackageCard from "./PackageCard";

// Maps the SideBar's duration radio value to an actual nights range,
// since json-server can only filter on real field ranges, not labels.
const DURATION_RANGES = {
  short: { gte: 3, lte: 4 },
  medium: { gte: 5, lte: 6 },
  long: { gte: 7, lte: 30 },
};

const getData = async (page, priceRange, destination, duration) => {
  let url = `http://localhost:8080/package?_page=${page}&_limit=5`;
  if (priceRange) {
    url += `&price_gte=${priceRange.gte}&price_lte=${priceRange.lte}`;
  }
  if (destination) url += `&destination=${destination}`;
  const nightsRange = DURATION_RANGES[duration];
  if (nightsRange) {
    url += `&nights_gte=${nightsRange.gte}&nights_lte=${nightsRange.lte}`;
  }
  let res = await axios.get(url);
  return res.data;
};

export default function PackageList({ page, priceRange, duration }) {
  const [data, setData] = React.useState([]);
  const [searchParams] = useSearchParams();
  const destination = searchParams.get("destination");

  useEffect(() => {
    getData(page, priceRange, destination, duration).then((res) => {
      setData(res);
    });
  }, [page, priceRange, destination, duration]);

  return (
    <div>
      {data.length > 0 &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <PackageCard data={item} />
            </div>
          );
        })}
    </div>
  );
}
