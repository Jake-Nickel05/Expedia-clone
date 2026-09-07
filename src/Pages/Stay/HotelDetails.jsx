import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Image,
  SimpleGrid,
  Heading,
  Text,
  Button,
  HStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [hotel, setHotel] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/hotel/${id}`)
      .then((res) => setHotel(res.data))
      .catch((err) => {
        console.error("Failed to load hotel:", err);
        setNotFound(true);
      });
  }, [id]);

  const handleAddToCart = () => {
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
          description: "Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleBookNow = () => {
    navigate("/checkout", { state: { type: "hotel", items: [hotel] } });
  };

  if (notFound) {
    return (
      <Box textAlign="center" p={10}>
        <Heading size="md">Hotel not found</Heading>
        <Text mt={2}>
          Make sure your json-server (npm run server) is running on port 8080.
        </Text>
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box textAlign="center" p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box width="80%" margin="auto" py={8}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <Image
          src={hotel.image}
          alt={hotel.name}
          borderRadius="10px"
          objectFit="cover"
          width="100%"
          height="320px"
        />
        <SimpleGrid columns={2} spacing={2}>
          {[hotel.img1, hotel.img2, hotel.img3, hotel.img4]
            .filter(Boolean)
            .map((src, i) => (
              <Image
                key={i}
                src={src}
                borderRadius="8px"
                objectFit="cover"
                height="155px"
                width="100%"
              />
            ))}
        </SimpleGrid>
      </SimpleGrid>

      <Heading size="lg">{hotel.name}</Heading>
      <Text color="gray.600" mt={1}>
        {hotel.place}
      </Text>

      <HStack mt={3} spacing={4}>
        <Box bg="green.600" color="white" px={2} py={1} borderRadius="6px" fontWeight="bold">
          {hotel.rating ?? "N/A"} ★
        </Box>
        <Text fontWeight="semibold">{hotel.ratingtext}</Text>
        <Text color="gray.500" fontSize="sm">
          {hotel.ratingcomment}
        </Text>
      </HStack>

      <Text mt={4}>
        {hotel.description && hotel.description.trim().length > 0
          ? hotel.description
          : "No additional description provided for this property."}
      </Text>

      <Box mt={6} p={4} bg="gray.50" borderRadius="10px">
        <Text fontSize="sm" color="gray.500">
          Price per night
        </Text>
        <Heading size="md">₹{Number(hotel.price).toLocaleString()}</Heading>
        {hotel.taxes ? (
          <Text fontSize="sm" color="gray.500">
            + ₹{Number(hotel.taxes).toLocaleString()} taxes & fees
          </Text>
        ) : null}
      </Box>

      <HStack mt={6} spacing={4}>
        <Button colorScheme="blue" variant="outline" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button colorScheme="orange" onClick={handleBookNow}>
          Book Now
        </Button>
      </HStack>
    </Box>
  );
};

export default HotelDetails;
