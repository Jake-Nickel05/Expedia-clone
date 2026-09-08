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
  Image,
  List,
  ListItem,
  ListIcon,
  useToast,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [pkg, setPkg] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/package/${id}`)
      .then((res) => setPkg(res.data))
      .catch((err) => {
        console.error("Failed to load package:", err);
        setNotFound(true);
      });
  }, [id]);

  const handleAddToCart = () => {
    axios
      .post("http://localhost:8080/packagecart", pkg)
      .then(() => {
        toast({
          title: "Added to Cart",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error("Failed to add package to cart:", err);
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
    navigate("/checkout", { state: { type: "package", items: [pkg] } });
  };

  if (notFound) {
    return (
      <Box textAlign="center" p={10}>
        <Heading size="md">Package not found</Heading>
        <Text mt={2}>
          Make sure your json-server (npm run server) is running on port 8080.
        </Text>
      </Box>
    );
  }

  if (!pkg) {
    return (
      <Box textAlign="center" p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box width="70%" margin="auto" py={8}>
      <Heading size="lg">{pkg.title}</Heading>
      <Text color="gray.500">
        {pkg.destination} · {pkg.nights} Nights
      </Text>

      <Image
        src={pkg.image}
        width="100%"
        maxHeight="350px"
        objectFit="cover"
        borderRadius="10px"
        mt={4}
      />

      <Text mt={4} color="gray.700">
        {pkg.description}
      </Text>

      {pkg.inclusions && pkg.inclusions.length > 0 && (
        <Box mt={6} p={4} bg="gray.50" borderRadius="10px">
          <Heading size="sm" mb={3}>
            What's Included
          </Heading>
          <List spacing={2}>
            {pkg.inclusions.map((item, idx) => (
              <ListItem key={idx}>
                <ListIcon as={MdCheckCircle} color="green.500" />
                {item}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      <Box mt={6} p={4} bg="gray.50" borderRadius="10px">
        <Text fontSize="sm" color="gray.500">
          Price per person
        </Text>
        <Heading size="md">₹{Number(pkg.price).toLocaleString()}</Heading>
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

export default PackageDetails;
