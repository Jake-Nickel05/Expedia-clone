import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Spinner,
  Divider,
  Image,
  useToast,
} from "@chakra-ui/react";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [car, setCar] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/car/${id}`)
      .then((res) => setCar(res.data))
      .catch((err) => {
        console.error("Failed to load car:", err);
        setNotFound(true);
      });
  }, [id]);

  const handleAddToCart = () => {
    axios
      .post("http://localhost:8080/carcart", car)
      .then(() => {
        toast({
          title: "Added to Cart",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to add car to cart:", err);
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
    navigate("/checkout", { state: { type: "car", items: [car] } });
  };

  if (notFound) {
    return (
      <Box textAlign="center" p={10}>
        <Heading size="md">Car not found</Heading>
        <Text mt={2}>
          Make sure your json-server (npm run server) is running on port 8080.
        </Text>
      </Box>
    );
  }

  if (!car) {
    return (
      <Box textAlign="center" p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box width="70%" margin="auto" py={8}>
      <Heading size="lg">
        {car.brand} {car.model}
      </Heading>
      <Text color="gray.500">
        {car.type} · {car.transmission}
      </Text>

      <Image
        src={car.image}
        width="100%"
        maxHeight="350px"
        objectFit="cover"
        borderRadius="10px"
        mt={4}
      />

      <HStack mt={6} justify="space-between" bg="gray.50" p={6} borderRadius="10px">
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Pick-up Location
          </Text>
          <Heading size="md">{car.location}</Heading>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Seats
          </Text>
          <Text fontWeight="bold">{car.seats}</Text>
          <Divider borderColor="gray.400" width="80px" mt={1} />
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Transmission
          </Text>
          <Heading size="md">{car.transmission}</Heading>
        </Box>
      </HStack>

      <Box mt={6} p={4} bg="gray.50" borderRadius="10px">
        <Text fontSize="sm" color="gray.500">
          Price per day
        </Text>
        <Heading size="md">₹{Number(car.pricePerDay).toLocaleString()}</Heading>
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

export default CarDetails;
