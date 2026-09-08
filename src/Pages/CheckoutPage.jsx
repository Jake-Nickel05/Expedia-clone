import React, { useState } from "react";
import { Box, Button, HStack, Heading, Image, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { clearCartItems } from "../Redux/CartReducer/action";

// Cars are priced per day (pricePerDay) instead of a flat price field like
// hotels/flights/packages, so pull whichever field the item actually has.
const priceOf = (item) => Number(item.price ?? item.pricePerDay ?? 0);

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeUser } = useSelector((store) => store.LoginReducer);

  // Coming from a hotel/flight/car/package "Book Now" button:
  //   { type: 'hotel'|'flight'|'car'|'package', items: [one item] }
  // Coming from the Cart's "Proceed to Checkout":
  //   { type: 'cart', hotelItems, flightItems, carItems, packageItems }
  const routeState = location.state;
  const hotelItems =
    routeState?.type === "cart"
      ? routeState.hotelItems
      : routeState?.type === "hotel"
      ? routeState.items
      : [];
  const flightItems =
    routeState?.type === "cart"
      ? routeState.flightItems
      : routeState?.type === "flight"
      ? routeState.items
      : [];
  const carItems =
    routeState?.type === "cart"
      ? routeState.carItems || []
      : routeState?.type === "car"
      ? routeState.items
      : [];
  const packageItems =
    routeState?.type === "cart"
      ? routeState.packageItems || []
      : routeState?.type === "package"
      ? routeState.items
      : [];
  const allItems = [...hotelItems, ...flightItems, ...carItems, ...packageItems];

  const [guest, setGuest] = useState({ firstName: "", surname: "", mobile: "" });
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setGuest({ ...guest, [e.target.name]: e.target.value });
  };

  const subtotal = allItems.reduce((sum, item) => sum + priceOf(item), 0);
  const taxes = Math.round(subtotal * 0.09);
  const total = subtotal + taxes;

  const handleCompleteBooking = () => {
    if (!guest.firstName.trim() || !guest.surname.trim() || !guest.mobile.trim()) {
      setError("Please fill in your name and mobile number before booking.");
      return;
    }
    if (allItems.length === 0) {
      setError("There's nothing to book. Go back and add an item first.");
      return;
    }
    setError("");
    setSubmitting(true);

    const booking = {
      guestFirstName: guest.firstName,
      guestSurname: guest.surname,
      guestMobile: guest.mobile,
      userNumber: activeUser?.number || null,
      hotels: hotelItems,
      flights: flightItems,
      cars: carItems,
      packages: packageItems,
      subtotal,
      taxes,
      total,
      bookedAt: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8080/bookings", booking)
      .then((res) => {
        setBookingId(res.data.id);
        setConfirmed(true);
        // If this booking came from the cart, empty out the items that were
        // just booked so they don't show up in the cart anymore.
        if (routeState?.type === "cart") {
          dispatch(
            clearCartItems(
              hotelItems.map((i) => i.id),
              flightItems.map((i) => i.id),
              carItems.map((i) => i.id),
              packageItems.map((i) => i.id)
            )
          );
        }
      })
      .catch((err) => {
        console.error("Booking failed:", err);
        setError("Something went wrong submitting your booking. Please try again.");
      })
      .finally(() => setSubmitting(false));
  };

  if (confirmed) {
    return (
      <Box width="60%" margin="auto" py={16} textAlign="center">
        <Heading size="lg" color="green.600">
          Booking Confirmed!
        </Heading>
        <Text mt={4}>
          Thanks, {guest.firstName}. Your confirmation number is{" "}
          <b>#{bookingId}</b>.
        </Text>
        <Text mt={2} color="gray.600">
          Total charged: ₹{total.toLocaleString()}
        </Text>
        <Button mt={8} colorScheme="blue" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </Box>
    );
  }

  return (
    <Box bg={'gray.300'} width={'100%'} minHeight={'900px'} py={6} >
      <Box width={'85%'} margin={'auto'} >
        <Heading fontSize={'26px'} fontWeight={'bold'} textAlign={'left'} >Review and Book</Heading>

        {allItems.length === 0 && (
          <Box bg="white" mt={4} p={6} textAlign="center">
            <Text>No items selected. Go back and choose something to book.</Text>
            <Button mt={4} colorScheme="blue" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </Box>
        )}

        {allItems.length > 0 && (
          <>
            <Box bg={'white'} mt={2} p={3} >
              <VStack align="stretch" spacing={3}>
                {hotelItems.map((item) => (
                  <HStack key={`hotel-${item.id}`} justify="space-between">
                    <HStack>
                      <Image src={item.image} boxSize="60px" objectFit="cover" borderRadius="6px" />
                      <Box textAlign="left">
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text fontSize="sm" color="gray.500">{item.place}</Text>
                      </Box>
                    </HStack>
                    <Text fontWeight="semibold">₹{Number(item.price).toLocaleString()}</Text>
                  </HStack>
                ))}
                {flightItems.map((item) => (
                  <HStack key={`flight-${item.id}`} justify="space-between">
                    <Box textAlign="left">
                      <Text fontWeight="bold">{item.airline}</Text>
                      <Text fontSize="sm" color="gray.500">{item.from} → {item.to} · {item.departure}</Text>
                    </Box>
                    <Text fontWeight="semibold">₹{Number(item.price).toLocaleString()}</Text>
                  </HStack>
                ))}
                {carItems.map((item) => (
                  <HStack key={`car-${item.id}`} justify="space-between">
                    <HStack>
                      <Image src={item.image} boxSize="60px" objectFit="cover" borderRadius="6px" />
                      <Box textAlign="left">
                        <Text fontWeight="bold">{item.brand} {item.model}</Text>
                        <Text fontSize="sm" color="gray.500">{item.location} · {item.transmission}</Text>
                      </Box>
                    </HStack>
                    <Text fontWeight="semibold">₹{Number(item.pricePerDay).toLocaleString()}/day</Text>
                  </HStack>
                ))}
                {packageItems.map((item) => (
                  <HStack key={`package-${item.id}`} justify="space-between">
                    <HStack>
                      <Image src={item.image} boxSize="60px" objectFit="cover" borderRadius="6px" />
                      <Box textAlign="left">
                        <Text fontWeight="bold">{item.title}</Text>
                        <Text fontSize="sm" color="gray.500">{item.destination} · {item.nights} Nights</Text>
                      </Box>
                    </HStack>
                    <Text fontWeight="semibold">₹{Number(item.price).toLocaleString()}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <SimpleGrid mt={2} gridTemplateColumns={'63% 35%'} gap={"1%"} >
              <Box bg={'white'} p={3}  >
                <Heading textAlign={'left'} fontSize={'20px'} fontWeight={'bold'}  >Guest Details</Heading>
                <Box  >
                  <Box textAlign={'left'} my={2} >
                    <label  >
                      First Name : <Input name="firstName" value={guest.firstName} onChange={handleChange} type='text' placeholder='First Name' border='1px solid gray' />
                    </label>
                  </Box>
                  <Box textAlign={'left'} my={2} >
                    <label>
                      Surname : <Input name="surname" value={guest.surname} onChange={handleChange} type='text' placeholder='Surname' border='1px solid gray' />
                    </label>
                  </Box>
                  <Box textAlign={'left'} my={2} >
                    <label>
                      Mobile No : <Input name="mobile" value={guest.mobile} onChange={handleChange} type='text' placeholder='Mobile No' border='1px solid gray' />
                    </label>
                  </Box>
                </Box>
              </Box>

              <Box bg={'white'} textAlign={'left'} p={4} >
                <Box justifyContent={'space-between'} display={'flex'} >
                  <Box>Subtotal</Box>
                  <Box>₹{subtotal.toLocaleString()}</Box>
                </Box>

                <Box justifyContent={'space-between'} display={'flex'} >
                  <Box>Taxes</Box>
                  <Box>₹{taxes.toLocaleString()}</Box>
                </Box>

                <Box justifyContent={'space-between'} display={'flex'} fontWeight={'bold'} >
                  <Box>Total</Box>
                  <Box>₹{total.toLocaleString()}</Box>
                </Box>

                {error && (
                  <Text color="red.500" mt={3} fontSize="sm">{error}</Text>
                )}

                <Button
                  mt={4}
                  width={'100%'}
                  height='40px'
                  bg={'#FF9800'}
                  rounded={'7px'}
                  isLoading={submitting}
                  onClick={handleCompleteBooking}
                >
                  Complete Booking
                </Button>
              </Box>
            </SimpleGrid>
          </>
        )}
      </Box>
    </Box>
  )
}

export default CheckoutPage
