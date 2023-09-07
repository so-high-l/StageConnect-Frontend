import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../../scenes/navbar";

import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import OfferWidget from "../widgets/OfferWidget";

const schema = yup.object().shape({
  title: yup.string().required("required"),
  message: yup.string().required("required"),
});

const initialValues = {
  title: "",
  message: "",
  offer: "",
};

const ApplicationPage = () => {
  const { offerId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const primary = theme.palette.primary;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { palette } = useTheme();
  const [offer, setOffer] = useState(null);

  const fetchOffer = async () => {
    const response = await fetch(`http://localhost:3001/offer/${offerId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setOffer(data);
  };

  const handleApplication = async (values, onSubmitProps) => {
    values.offer = offerId;
    const response = await fetch("http://localhost:3001/demande", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    onSubmitProps.resetForm();
    navigate("/home");
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    await handleApplication(values, onSubmitProps);
  };
  useEffect(() => {
    fetchOffer();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!offer) return null;

  return (
    <Box>
      <Navbar />
      <Box p={isNonMobileScreens ? "0 220px" : "0"}>
        {offer && (
          <Box m="1rem 0" p="4rem">
            <Typography fontWeight="bold" fontSize={"2rem"}>
              Apply to Offer: {offer.title}
            </Typography>
            <OfferWidget
              offerId={offer._id}
              offerCompanyId={offer._id}
              name={offer.firstName + " " + offer.lastName}
              userPicturePath={offer.userPicturePath}
              title={offer.title}
              description={offer.description}
              startDate={offer.startDate}
              endDate={offer.endDate}
            />
          </Box>
        )}
        <Formik
          p="3rem 0"
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={schema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                m="3rem"
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobile ? undefined : "span 4",
                  },
                }}
              >
                <>
                  <TextField
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={Boolean(touched.title) && Boolean(errors.title)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.message}
                    name="message"
                    error={Boolean(touched.message) && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                    sx={{ gridColumn: "span 4", gridRow: "span 3" }}
                  />
                  <TextField
                    value={values.offer}
                    name="offerId"
                    type="hidden"
                    sx={{
                      "&": { display: "none" },
                    }}
                  />
                </>
              </Box>

              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  Apply
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ApplicationPage;
