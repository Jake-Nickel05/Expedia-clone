import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useToast, Button as ChakraButton, HStack } from "@chakra-ui/react";
import "./StayData.css";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";

const StayData = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { data } = useSelector((store) => store.StayReducer);
  const checkInDate = useSelector((state) => state.StayReducer.checkInDate);
  const checkOutDate = useSelector((state) => state.StayReducer.checkOutDate);
  const selectedCity = useSelector((state) => state.StayReducer.selectedCity);
  const [searchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 10000]);
  const [filteredHotel, setFilteredHotel] = useState([]);
  const [price, setPrice] = useState(""); // Define price state variable

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalNumOfPages = Math.ceil(244 / 20);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (id) => {
    navigate(`/stay/${id}`);
  };

  const handleAddToCart = (hotel) => {
    axios
      .post("http://localhost:8080/hotelcart", hotel)
      .then(() => {
        toast({
          title: "Added to Cart",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to add hotel to cart:", err);
        toast({
          title: "Couldn't add to cart",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // useEffect(() => {
  //   dispatch(fetchingHotels("","",""));
  // }, [dispatch]);

  useEffect(() => {
    if (data) {
      setFilteredHotel(
        data.filter(
          (hotel) =>
            hotel.price >= selectedPriceRange[0] &&
            hotel.price <= selectedPriceRange[1] &&
            (!query ||
              hotel.name?.toLowerCase().includes(query) ||
              hotel.place?.toLowerCase().includes(query))
        )
      );
    }
  }, [data, selectedPriceRange, query]);
  return (
    <div className="stay-data">

      <div className="sidebar-container">
        <Sidebar/>
      </div>

      {filteredHotel?.map((hotel) => (
        <div className="stay-card" key={hotel.id}>
          <img src={hotel.image} alt="hotel" />

          <div className="stay-info">
            <div className="stay-header">
              <h3 className="stay-name">{hotel.name}</h3>
            </div>
            <p className="stay-location">{hotel.location || hotel.place}</p>
            <p className="stay-description">{hotel.description}</p>
            <div className="stay-details">
              <div className="stay-price">
                <span>Price:</span>
                <p>₹{hotel.price.toLocaleString()}</p>
              </div>
              <div className="stay-rating">
                <span>Rating:</span>
                <p>{hotel.rating ? hotel.rating : 1}</p>
              </div>
            </div>
            <HStack mt={2}>
              <ChakraButton size="sm" onClick={() => handleViewDetails(hotel.id)}>
                View Details
              </ChakraButton>
              <ChakraButton
                size="sm"
                colorScheme="orange"
                onClick={() => handleAddToCart(hotel)}
              >
                Add to Cart
              </ChakraButton>
            </HStack>
          </div>
        </div>
      ))}
      <div>
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={totalNumOfPages}
      />
      </div>
    </div>
  );
};

export default StayData;
