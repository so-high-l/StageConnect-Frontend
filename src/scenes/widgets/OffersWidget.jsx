import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { setOffers } from "../../state";
import OfferWidget from "./OfferWidget.jsx";

const OffersWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const token = useSelector((state) => state.token);

  const getOffers = async () => {
    try {
      const response = await fetch("http://localhost:3001/offer/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Type of data:", typeof data); // Log the type of data

        dispatch(setOffers({ offers: data }));
      } else {
        console.error("Error fetching offers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const getCompanyOffers = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/offers`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Type of data:", typeof data); // Log the type of data

        dispatch(setOffers({ offers: data }));
      } else {
        console.error("Error fetching company offers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching company offers:", error);
    }
  };

  useEffect(() => {
    if (isProfile) {
      console.log("executed getCompanyOffers");
      getCompanyOffers();
    } else {
      console.log("executed getOffers");
      getOffers();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {offers.map(
        ({
          _id,
          companyId,
          firstName,
          lastName,
          userPicturePath,
          title,
          description,
          category,
          location,
          startDate,
          endDate,
          picturePath,
        }) => (
          <OfferWidget
            key={_id}
            offerId={_id}
            offerCompanyId={companyId}
            name={`${firstName} ${lastName}`}
            userPicturePath={userPicturePath}
            title={title}
            description={description}
            category={category}
            location={location}
            startDate={startDate}
            endDate={endDate}
            picturePath={picturePath}
          />
        )
      )}
    </>
  );
};

export default OffersWidget;
