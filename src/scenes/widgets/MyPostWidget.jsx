import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
  Category,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  TextareaAutosize,
} from "@mui/material";
import Dropzone from "react-dropzone";
import FlexBetween from "../../components/FlexBetween";
import UserImage from "../../components/UserImage";
import WidgetWrapper from "../../components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffers } from "../../state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  // offer states
  const [offerTitle, setOfferTitle] = useState("");
  const [offerDescription, setOfferDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const mediumMain = palette.neutral.medium.main;
  const medium = palette.neutral.medium;

  const resetForm = () => {
    setOfferTitle("");
    setOfferDescription("");
    setSelectedCategory("");
    setStartDate(null);
    setEndDate(null);
  };

  const handleOffer = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: offerTitle,
        description: offerDescription,
        companyId: _id,
        categoryId: selectedCategory,
        startDate: startDate,
        endDate: endDate,
      }),
      credentials: "include",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/offer/",
        requestOptions
      );
      if (response.ok) {
        const updatedOffers = await response.json();
        dispatch(setOffers({ updatedOffers }));
        resetForm();
      } else {
      }
    } catch (error) {
      console.error("Error making offer request:", error);
    }
  };

  return (
    <WidgetWrapper padding="1.2rem">
      <FlexBetween
        gap="0.5rem"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <UserImage image={picturePath} />
        <Box>
          <InputBase
            placeholder="Offer title ..."
            onChange={(e) => setOfferTitle(e.target.value)}
            value={offerTitle}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              mb: "1rem",
            }}
          />
          <TextareaAutosize
            placeholder="Offer description ..."
            onChange={(e) => setOfferDescription(e.target.value)}
            value={offerDescription}
            minRows={6}
            resize="none"
            style={{
              fontFamily: "Rubik",
              fontWeight: "500",
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              mb: "2rem",
              color: "#fff",
            }}
          />
          <InputBase
            placeholder="Start Date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            type="date"
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              mb: "1rem",
            }}
          />
          <InputBase
            placeholder="End Date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              mb: "1rem",
            }}
          />
          <FormControl
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              mb: "1rem",
            }}
          >
            <Typography sx={{ mb: 1 }}>Select a Category</Typography>
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              sx={{ width: "100%" }}
            >
              <MenuItem value={"64cfb68fcb75452b68a843f7"}>Web dev</MenuItem>
              <MenuItem value={"category2"}>Category 2</MenuItem>
              <MenuItem value={"category3"}>Category 3</MenuItem>
              {/* Add more MenuItems for additional categories */}
            </Select>
          </FormControl>
        </Box>
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpeg,.jpg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{
                    "&:hover": { cursor: "pointer" },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem" }} />
      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: { medium } } }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }}></GifBoxOutlined>
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined
                sx={{ color: mediumMain }}
              ></AttachFileOutlined>
              <Typography color={mediumMain}>Attachement</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }}></MicOutlined>
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <>
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }}></MoreHorizOutlined>
            </FlexBetween>
          </>
        )}
        <Button
          disabled={
            !offerTitle ||
            !offerDescription ||
            !selectedCategory ||
            !startDate ||
            !endDate
          }
          onClick={handleOffer}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;
