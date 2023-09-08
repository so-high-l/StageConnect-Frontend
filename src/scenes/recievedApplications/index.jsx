import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import ApplicationWidget from "../widgets/applicationWidget.jsx";
const RecievedApplicationsPage = () => {
  const { companyId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const primary = theme.palette.primary;
  const [results, setResults] = useState([]);
  const user = useSelector((state) => state.user);
  const fetchRecievedApplications = async () => {
    const response = await fetch(
      `http://localhost:3001/demande/company/${companyId}`,
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
    fetchRecievedApplications();
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

          <Typography
            fontWeight="bold"
            fontSize="clamp(1.5rem, 1.7rem, 1.25rem)"
            color="primary"
          >
            Received Applications
          </Typography>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "80%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0">
            {results.length === 0 && (
              <Typography fontSize="1rem" pt="03rem">
                No applications to your offers found{" "}
              </Typography>
            )}
            {results &&
              results.length > 0 &&
              results.map((result) => (
                <ApplicationWidget
                  key={result._id} // Don't forget to add a unique key prop
                  applicationId={result._id}
                  offerId={result.offer}
                  offerCompanyId={result.companyId}
                  name={result.firstName + " " + result.lastName}
                  userPicturePath={result.userPicturePath}
                  title={result.title}
                  message={result.message}
                  status={result.status}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecievedApplicationsPage;
