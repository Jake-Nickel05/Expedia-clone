import { Box, Image, Flex, Button, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function FlightCard({ data }) {
  const { id, airline, from, to, departure, arrival, price, totalTime } = data;
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    axios
      .post(`http://localhost:8080/flightcart`, data)
      .then(() => {
        toast({
          title: "Flight Added to Cart",
          description: "Please Proceed to Payment",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to add flight to cart:", err);
        toast({
          title: "Couldn't add flight to cart",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  

  const handleBookNow = () => {
    navigate("/checkout", { state: { type: "flight", items: [data] } });
  };

  const Booknow = {
    marginTop: "3%",
    // width:"164px",
    padding: "15px",
    height: "43px",
    background: "teal",
    color: " #FFFFFF",
    bordeRadius: "0.5rem",
    position: "relative",
    marginBottom: "1rem",
  };

  return (
    <Box
      display={"flex"}
      gap="20px"
      key={id}
      height="100px"
      width={"80%"}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      padding="10px"
      margin="auto"
      justifyContent="space-around"
      alignItems={"center"}
      borderRadius="10px"
      marginBottom={"20px"}
      textAlign="center"
    >
      <Box gap={"30px"}>
        <Image
          src="https://play-lh.googleusercontent.com/OhZSLjRDLvFLqtDp9bIgcvAweZIg5V5uIMI_7kOaS-9nPR043DUfoibkn1BgwG7Ai1U=w240-h480-rw"
          width={"35px"}
          height="30px"
        />
        <h1>{airline}</h1>
      </Box>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Departure</h3>
        <h3>{departure}</h3>
        <b>{from} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Arrival</h3>
        <h3>{arrival}</h3>
        <b style={{ fontSize: "14px" }}>{to} </b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Duation</h3>
        <b>{totalTime}</b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Price</h3>
        <b>{price}</b>
      </Flex>
      <VStack spacing={2}>
        <Link to={`/flight/${id}`}>
          <Button size="sm" variant="outline">
            View Details
          </Button>
        </Link>
        <Button size="sm" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button style={Booknow} onClick={handleBookNow}>
          Book Now
        </Button>
      </VStack>
    </Box>
  );
}
