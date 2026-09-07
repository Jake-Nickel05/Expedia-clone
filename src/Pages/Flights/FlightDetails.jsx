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
  useToast,
} from "@chakra-ui/react";

const FlightDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [flight, setFlight] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/flight/${id}`)
      .then((res) => setFlight(res.data))
      .catch((err) => {
        console.error("Failed to load flight:", err);
        setNotFound(true);
      });
  }, [id]);

  const handleAddToCart = () => {
    axios
      .post("http://localhost:8080/flightcart", flight)
      .then(() => {
        toast({
          title: "Added to Cart",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to add flight to cart:", err);
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
    navigate("/checkout", { state: { type: "flight", items: [flight] } });
  };

  if (notFound) {
    return (
      <Box textAlign="center" p={10}>
        <Heading size="md">Flight not found</Heading>
        <Text mt={2}>
          Make sure your json-server (npm run server) is running on port 8080.
        </Text>
      </Box>
    );
  }

  if (!flight) {
    return (
      <Box textAlign="center" p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box width="70%" margin="auto" py={8}>
      <Heading size="lg">{flight.airline}</Heading>
      <Text color="gray.500">Flight {flight.number}</Text>

      <HStack mt={6} justify="space-between" bg="gray.50" p={6} borderRadius="10px">
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Departure
          </Text>
          <Heading size="md">{flight.departure}</Heading>
          <Text fontWeight="bold">{flight.from}</Text>
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Duration
          </Text>
          <Text>{flight.totalTime}</Text>
          <Divider borderColor="gray.400" width="80px" mt={1} />
        </Box>
        <Box textAlign="center">
          <Text fontSize="sm" color="gray.500">
            Arrival
          </Text>
          <Heading size="md">{flight.arrival}</Heading>
          <Text fontWeight="bold">{flight.to}</Text>
        </Box>
      </HStack>

      <Box mt={6} p={4} bg="gray.50" borderRadius="10px">
        <Text fontSize="sm" color="gray.500">
          Price per passenger
        </Text>
        <Heading size="md">₹{Number(flight.price).toLocaleString()}</Heading>
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

export default FlightDetails;
