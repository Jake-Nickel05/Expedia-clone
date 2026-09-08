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
import PackageList from "./PackageList";
import { useState } from "react";

// Bucket upper bounds in rupees (whole-trip price). Keep these aligned with
// the actual price range used in db.json's package collection.
const PRICE_BUCKETS = {
  "15000": { gte: 5000, lte: 15000 },
  "25000": { gte: 15000, lte: 25000 },
  "35000": { gte: 25000, lte: 35000 },
  "50000": { gte: 35000, lte: 50000 },
};

const SideBar = () => {
  const [priceValue, setPriceValue] = useState("");
  const [duration, setDuration] = useState("");
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
            Price Per Trip
          </Heading>
          <RadioGroup onChange={setPriceValue} value={priceValue}>
            <Stack direction="column">
              <Radio value="15000">₹ 5,000 - ₹ 15,000</Radio>
              <Radio value="25000">₹ 15,000 - ₹ 25,000</Radio>
              <Radio value="35000">₹ 25,000 - ₹ 35,000</Radio>
              <Radio value="50000">₹ 35,000 - ₹ 50,000</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Box>
          <Heading as="h5" size="sm" m="3">
            Duration
          </Heading>
          <RadioGroup onChange={setDuration} value={duration}>
            <Stack direction="column">
              <Radio value="short">3 - 4 Nights</Radio>
              <Radio value="medium">5 - 6 Nights</Radio>
              <Radio value="long">7+ Nights</Radio>
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

        <PackageList page={page} priceRange={PRICE_BUCKETS[priceValue]} duration={duration} />
      </Box>
    </Box>
  );
};

export default SideBar;
