import { Box, Image, Flex, Button, VStack } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function PackageCard({ data }) {
  const { id, title, destination, nights, price, image } = data;
  const toast = useToast();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    axios
      .post(`http://localhost:8080/packagecart`, data)
      .then(() => {
        toast({
          title: "Package Added to Cart",
          description: "Please Proceed to Payment",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to add package to cart:", err);
        toast({
          title: "Couldn't add package to cart",
          description: "Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  const handleBookNow = () => {
    navigate("/checkout", { state: { type: "package", items: [data] } });
  };

  const Booknow = {
    marginTop: "3%",
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
        <Image src={image} width={"60px"} height="45px" objectFit="cover" borderRadius="4px" />
        <h1>{title}</h1>
      </Box>
      <Flex display={"flex"} flexDirection="column">
        <h3 style={{ fontSize: "10px", fontWeight: "bold" }}>Destination</h3>
        <b>{destination}</b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Duration</h3>
        <b>{nights} Nights</b>
      </Flex>
      <Flex display={"flex"} flexDirection="column">
        <h3>Price</h3>
        <b>₹{price}</b>
      </Flex>
      <VStack spacing={2}>
        <Link to={`/packages/${id}`}>
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
