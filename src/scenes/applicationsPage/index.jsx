import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../../scenes/navbar";
import ApplicationWidget from "../widgets/applicationWidget.jsx";
import { useNavigate } from "react-router-dom";

const ApplicationsPage = () => {
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const navigate = useNavigate();
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const [results, setResults] = useState([]);
  const user = useSelector((state) => state.user);
  const fetchApplicationsOfUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/demandes`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log("demandes:", data);
    setResults(data);
  };

  useEffect(() => {
    fetchApplicationsOfUser();
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
            My Applications
          </Typography>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "80%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box m="2rem 0">
            {results.length === 0 && (
              <Typography fontSize="1rem" pt="03rem">
                No applications yet ?{" "}
                <Typography
                  color={primary}
                  onClick={() => navigate("/home")}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  Apply now to the offers you desire{" "}
                </Typography>
              </Typography>
            )}
            {results &&
              results.length > 0 &&
              results.map((result) => (
                <ApplicationWidget
                  key={result._id}
                  demandeId={result._id}
                  studentId={result.student}
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

export default ApplicationsPage;
