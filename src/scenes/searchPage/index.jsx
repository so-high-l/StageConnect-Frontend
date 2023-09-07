import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";
import OfferWidget from "../widgets/OfferWidget";
const SearchPage = () => {
  const { searchQuery } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const primary = theme.palette.primary;
  const [results, setResults] = useState([]);

  const getSearchResults = async () => {
    const response = await fetch(
      `http://localhost:3001/search/${searchQuery}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setResults(data);
  };

  useEffect(() => {
    getSearchResults();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "20%" : undefined}>
          <Box m="2rem 0" />
          <Typography>
            Search results for:
            <Typography
              fontWeight="bold"
              fontSize="clamp(1.5rem, 1.7rem, 1.25rem)"
              color="primary"
            >
              {searchQuery}
            </Typography>
          </Typography>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "80%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0">
            {" "}
            {results.map((result) => (
              <OfferWidget
                key={result._id} // Don't forget to add a unique key prop
                offerId={result._id}
                offerCompanyId={result.user[0]._id}
                name={result.user[0].firstName + " " + result.user[0].lastName}
                userPicturePath={result.user[0].picturePath}
                title={result.title}
                description={result.description}
                location={result.user[0].location}
                startDate={result.startDate}
                endDate={result.endDate}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SearchPage;
