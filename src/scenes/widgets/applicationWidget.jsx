import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { Typography, useTheme, Button } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { useNavigate } from "react-router-dom";
const ApplicationWidget = ({
  offerId,
  studentId,
  applicationId,
  name,
  userPicturePath,
  title,
  message,
  location,
  startDate,
  endDate,
  picturePath,
  status,
}) => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [loggedUser, setLoggedUser] = useState(null);
  const [offer, setOffer] = useState(null);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const getLoggedUser = async () => {
    const response = await fetch(`http://localhost:3001/users/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(loggedInUserId);
    setLoggedUser(data);
  };
  const fetchOffer = async () => {
    const response = await fetch(`http://localhost:3001/offer/${offerId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setOffer(data);
  };

  const handleAcceptApplication = async () => {
    const response = await fetch(
      `http://localhost:3001/demande/${applicationId}/true`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setRefresh(!refresh);
    navigate(`/receivedApplications/${loggedInUserId}`);
  };
  const handleRejectApplication = async () => {
    const response = await fetch(
      `http://localhost:3001/demande/${applicationId}/false`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setRefresh(!refresh);
    navigate(`/receivedApplications/${loggedInUserId}`);
  };
  const handleDeleteApplication = async () => {
    const response = await fetch(
      `http://localhost:3001/demande/${applicationId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    setRefresh(!refresh);
    navigate(`/receivedApplications/${loggedInUserId}`);
  };

  useEffect(() => {
    getLoggedUser();
    fetchOffer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper padding="2rem 1rem" marginTop="1rem">
      <Friend
        friendId={studentId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography
        color={"grey"}
        sx={{ fontWeight: "300", fontSize: ".8rem", mt: "1rem" }}
      >
        - Internship Application -
      </Typography>
      <Typography color={primary} sx={{ mt: "1rem", fontSize: "1.3rem" }}>
        {title}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {message}
      </Typography>

      <Typography color={main} sx={{ mt: "1rem" }}>
        Status:
      </Typography>
      <Typography color={main} sx={{ mt: "0.3rem" }}>
        {status === "pending" ? (
          <span style={{ color: "lightgreen" }}>Pending ...</span>
        ) : (
          <span style={{ color: status === "accepted" ? "green" : "red" }}>
            {status === "accepted" ? "Accepted" : "Rejected"}
            {loggedUser &&
            loggedUser.role === "student" &&
            status === "accepted"
              ? ". Please Check your email for more contact"
              : ""}
          </span>
        )}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      {loggedUser && loggedUser.role === "company" ? (
        <FlexBetween width="400px">
          <Button
            type="submit"
            onClick={handleAcceptApplication}
            sx={{
              m: "1rem 0",
              p: "1rem",
              backgroundColor: "lightgreen",
              color: "#000",
              "&:hover": { color: palette.primary.main },
            }}
          >
            <BookmarkAddedIcon mr="30px"></BookmarkAddedIcon>
            Accept
          </Button>
          <Button
            type="submit"
            onClick={handleRejectApplication}
            sx={{
              m: "1rem 0",
              p: "1rem",
              backgroundColor: "#bb5a5a",
              color: "#000",
              "&:hover": { color: palette.primary.main },
            }}
          >
            <RemoveCircleOutlineOutlinedIcon></RemoveCircleOutlineOutlinedIcon>
            Reject
          </Button>
          <Button
            type="submit"
            onClick={handleDeleteApplication}
            sx={{
              m: "1rem 0",
              p: "1rem",
              backgroundColor: "red",
              color: "white",
              "&:hover": { color: palette.primary.main },
            }}
          >
            <DeleteForeverOutlinedIcon></DeleteForeverOutlinedIcon>
            Delete
          </Button>
        </FlexBetween>
      ) : null}
    </WidgetWrapper>
  );
};

export default ApplicationWidget;
