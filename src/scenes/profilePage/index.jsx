import { Box, useMediaQuery, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../scenes/navbar";
import MyPostWidget from "../../scenes/widgets/MyPostWidget";
import OffersWidget from "../../scenes/widgets/OffersWidget";
import UserWidget from "../../scenes/widgets/UserWidget";
import ApplicationWidget from "../../scenes/widgets/applicationWidget";
import { useTheme } from "@emotion/react";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const { userId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const primary = theme.palette.primary.main;

  const getUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/profile/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUser(data);
  };
  const getLoggedUser = async () => {
    const response = await fetch(`http://localhost:3001/users/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setLoggedUser(data);
  };
  const fetchUserApplications = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/demandes`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setUserApplications(data);
  };

  useEffect(() => {
    getUser();
    getLoggedUser();
    fetchUserApplications();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

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
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {loggedUser &&
            loggedUser._id === user._id &&
            loggedUser.role === "company" && (
              <MyPostWidget picturePath={user.picturePath} />
            )}
          <Box m="2rem 0" />
          <OffersWidget userId={userId} isProfile />
          {loggedUser &&
            loggedUser._id === userId &&
            loggedUser.role === "student" &&
            userApplications.length === 0 && (
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
          {loggedUser &&
            loggedUser._id === userId &&
            userApplications &&
            userApplications.length > 0 &&
            userApplications.map((result) => (
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
  );
};

export default ProfilePage;
