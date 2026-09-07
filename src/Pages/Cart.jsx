import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  HStack,
  Image,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import {
  fetchCart,
  removeHotelFromCart,
  removeFlightFromCart,
} from "../Redux/CartReducer/action";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotelItems, flightItems, isLoading } = useSelector(
    (store) => store.CartReducer
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const hotelTotal = hotelItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );
  const flightTotal = flightItems.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );
  const grandTotal = hotelTotal + flightTotal;
  const isEmpty = hotelItems.length === 0 && flightItems.length === 0;

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        type: "cart",
        hotelItems,
        flightItems,
      },
    });
  };

  if (isLoading) {
    return (
      <Box textAlign="center" p={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box width="70%" margin="auto" py={8}>
      <Heading size="lg" mb={6}>
        Your Cart
      </Heading>

      {isEmpty && (
        <Text color="gray.500">
          Your cart is empty. Add a hotel or flight to get started.
        </Text>
      )}

      {hotelItems.length > 0 && (
        <Box mb={6}>
          <Heading size="md" mb={2}>
            Hotels
          </Heading>
          {hotelItems.map((item) => (
            <HStack
              key={item.id}
              justify="space-between"
              p={3}
              mb={2}
              bg="gray.50"
              borderRadius="8px"
            >
              <HStack>
                <Image
                  src={item.image}
                  boxSize="60px"
                  objectFit="cover"
                  borderRadius="6px"
                />
                <Box>
                  <Text fontWeight="bold">{item.name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {item.place}
                  </Text>
                </Box>
              </HStack>
              <HStack>
                <Text fontWeight="semibold">
                  ₹{Number(item.price).toLocaleString()}
                </Text>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => dispatch(removeHotelFromCart(item.id))}
                >
                  Remove
                </Button>
              </HStack>
            </HStack>
          ))}
        </Box>
      )}

      {flightItems.length > 0 && (
        <Box mb={6}>
          <Heading size="md" mb={2}>
            Flights
          </Heading>
          {flightItems.map((item) => (
            <HStack
              key={item.id}
              justify="space-between"
              p={3}
              mb={2}
              bg="gray.50"
              borderRadius="8px"
            >
              <Box>
                <Text fontWeight="bold">{item.airline}</Text>
                <Text fontSize="sm" color="gray.500">
                  {item.from} → {item.to} · {item.departure}
                </Text>
              </Box>
              <HStack>
                <Text fontWeight="semibold">
                  ₹{Number(item.price).toLocaleString()}
                </Text>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="ghost"
                  onClick={() => dispatch(removeFlightFromCart(item.id))}
                >
                  Remove
                </Button>
              </HStack>
            </HStack>
          ))}
        </Box>
      )}

      {!isEmpty && (
        <>
          <Divider my={4} />
          <HStack justify="space-between" fontWeight="bold" fontSize="lg">
            <Text>Total</Text>
            <Text>₹{grandTotal.toLocaleString()}</Text>
          </HStack>
          <Button
            mt={6}
            width="100%"
            colorScheme="orange"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;
