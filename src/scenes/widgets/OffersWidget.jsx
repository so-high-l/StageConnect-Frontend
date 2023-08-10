import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOffers } from "../../state";
import OfferWidget from "./OfferWidget";

const OffersWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const offers = useSelector((state) => state.offers);
  const token = useSelector((state) => state.token);

  const getOffers = async () => {
    const respone = await fetch(`http://localhost:3001/offer/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = respone.json();
    dispatch(setOffers({ offers: data }));
  };

  const getCompanyOffers = async () => {
    const respone = await fetch(
      `http://localhost:3001/users/${userId}/offers`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await respone.json();
    dispatch(setOffers({ offers: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getCompanyOffers();
    } else {
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
