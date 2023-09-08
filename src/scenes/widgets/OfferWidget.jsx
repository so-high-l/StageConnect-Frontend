import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffer } from "../../state";
import OffersWidget from "./OffersWidget";
import Friend from "../../components/Friend";
import { DateSchema } from "yup";
import { useNavigate } from "react-router-dom";
const OfferWidget = ({
  offerId,
  offerCompanyId,
  name,
  userPicturePath,
  title,
  description,
  category,
  location,
  startDate,
  endDate,
  picturePath,
}) => {
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();

  const loggedInUserId = useSelector((state) => state.user._id);
  const [loggedUser, setLoggedUser] = useState(null);
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  startDate = new Date(startDate);
  endDate = new Date(endDate);
  const formattedStartDate = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedEndDate = endDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const getLoggedUser = async () => {
    const response = await fetch(`http://localhost:3001/users/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setLoggedUser(data);
  };
  useEffect(() => {
    getLoggedUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper padding="2rem 1rem" marginTop="1rem">
      <Friend
        friendId={offerCompanyId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography
        color={"grey"}
        sx={{ fontWeight: "300", fontSize: ".8rem", mt: "1rem" }}
      >
        - Internship offer -
      </Typography>
      <Typography color={primary} sx={{ mt: "1rem", fontSize: "1.3rem" }}>
        {title}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Typography color="#44bcff" sx={{ mt: "1rem" }}>
        From {formattedStartDate} to {formattedEndDate}
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
      {loggedUser && loggedUser.role === "student" ? (
        <Button
          type="submit"
          onClick={() => navigate(`/apply/${offerId}`)}
          sx={{
            m: "1rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
          Apply Now !
        </Button>
      ) : null}
    </WidgetWrapper>
  );
};

export default OfferWidget;
