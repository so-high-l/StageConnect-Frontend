import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffer } from "../../state";
import OffersWidget from "./OffersWidget";
import Friend from "../../components/Friend";

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
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={offerCompanyId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {title}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
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
    </WidgetWrapper>
  );
};

export default OfferWidget;
