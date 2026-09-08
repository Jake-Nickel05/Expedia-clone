import React from "react";
import {
  Button,
  Box,
  Image,
  Heading,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import CarList from "./CarList";
import { useState } from "react";

// Bucket upper bounds in rupees (price per day). Keep these aligned with the
// actual price range used in db.json's car collection.
const PRICE_BUCKETS = {
  "2500": { gte: 1000, lte: 2500 },
  "4000": { gte: 2500, lte: 4000 },
  "6000": { gte: 4000, lte: 6000 },
  "10000": { gte: 6000, lte: 10000 },
};

const SideBar = () => {
  const [priceValue, setPriceValue] = useState("");
  const [carType, setCarType] = useState("");
  const [transmission, setTransmission] = useState("");
  const [page, setPage] = useState(1);

  const pageBtn = {
    marginTop: "3%",
    padding: "15px",
    height: "43px",
    background: "#3662D8",
    color: " #FFFFFF",
    bordeRadius: "0.5rem",
    position: "relative",
    marginBottom: "1rem",
  };

  return (
    <Box
      display={"flex"}
      padding="0px 40px"
      gap={"30px"}
      width="100%"
      marginBottom={"100px"}
    >
      <Box
        width={"25%"}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        height={"auto"}
        padding="20px"
        textAlign={"center"}
      >
        <h1 style={{ fontSize: "20px", fontWeight: "bold" }}>
          Sorting & Filtering
        </h1>

        <Box>
          <Heading as="h5" size="sm" m="3">
            Price Per Day
          </Heading>
          <RadioGroup onChange={setPriceValue} value={priceValue}>
            <Stack direction="column">
              <Radio value="2500">₹ 1000 - ₹ 2500</Radio>
              <Radio value="4000">₹ 2500 - ₹ 4000</Radio>
              <Radio value="6000">₹ 4000 - ₹ 6000</Radio>
              <Radio value="10000">₹ 6000 - ₹ 10000</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Heading as="h5" size="sm" m="3">
            Car Type
          </Heading>
          <RadioGroup onChange={setCarType} value={carType}>
            <Stack direction="column">
              <Radio value="Hatchback">Hatchback</Radio>
              <Radio value="Sedan">Sedan</Radio>
              <Radio value="SUV">SUV</Radio>
              <Radio value="MUV">MUV</Radio>
              <Radio value="Luxury">Luxury</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Heading as="h5" size="sm" m="3">
            Transmission
          </Heading>
          <RadioGroup onChange={setTransmission} value={transmission}>
            <Stack direction="column">
              <Radio value="Automatic">Automatic</Radio>
              <Radio value="Manual">Manual</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Box>
      <Box
        width={"80%"}
        boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px;"
        height={"auto"}
        padding="20px"
      >
        <Image
          src="https://mmt.servedbyadbutler.com/getad.img/;libID=3737167"
          width={"90%"}
          margin="auto"
          marginBottom={"20px"}
        />

        <Stack spacing={4} direction="row" align="center">
          <Button
            style={pageBtn}
            onClick={() => setPage(page - 1)}
            isDisabled={page === 1}
          >
            Previous
          </Button>
          <Button style={pageBtn}>{page}</Button>
          <Button
            style={pageBtn}
            isDisabled={page === 4}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </Stack>

        <CarList
          page={page}
          priceRange={PRICE_BUCKETS[priceValue]}
          carType={carType}
          transmission={transmission}
        />
      </Box>
    </Box>
  );
};

export default SideBar;
