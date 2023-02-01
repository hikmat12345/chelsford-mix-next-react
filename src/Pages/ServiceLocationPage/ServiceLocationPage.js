//libs
import React from "react";
import {
  FAELocationSelection,
  FAEFloatingBookingPrice,
  FAETitle,
} from "@findanexpert-fae/components";
import { useLocation, useParams } from "react-router-dom";

//src
import { addSpaces, getFileSrcFromPublicFolder } from "../../utils";
import history from "../../history";

//scss
import "./ServiceLocationPage.scss";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";

const ServiceLocationPage = () => {
  const { service } = useParams();
  const location = useLocation();
  const { state } = location;
  const serviceName = addSpaces(service, "-");
  document.title = `Chelsford | ${serviceName} - Select Location`;
  const {
    price,
    freeConsultation,
    currencySymbol,
    isInHouse,
    isInClinic,
    isOnline,
  } = state;

  return (
    <>
      <div className="fae--service-location-page-container dpt dpb" style={{paddingBottom: 150}}>
        <div className="fae--service-location-page-wrapper">
          <FAETitle
            label={serviceName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          {!freeConsultation && (
            <FAEFloatingBookingPrice
              currencySymbol={currencySymbol}
              justify="flex-end"
              price={price}
              backgroundImage={getFileSrcFromPublicFolder("parchii_icon.svg")}
            />
          )}
          <FAEText className="fae-want-service-text">I want my service at</FAEText>
          <FAELocationSelection
            inHouseDetails={{
              icon: getFileSrcFromPublicFolder("my_place_icon.svg"),
              shortDescription:
                "Choose any home or work location and we'll come to you.",
              onClick: () =>
                history.push({
                  pathname: `/booking/${service}/address-selection`,
                  state: {
                    ...state,
                    isInClinic: false,
                    isInHouse: true,
                    isOnline: false,
                  },
                }),
            }}
            inClinicDetails={{
              icon: getFileSrcFromPublicFolder("expert_centre_icon.svg"),
              shortDescription: "Choose to pop into one of our Expert Center.",
              onClick: () =>
                history.push({
                    pathname: `/booking/${service}/address-selection`, 
                  state: {
                    ...state,
                    isInClinic: true,
                    isInHouse: false,
                    isOnline: false,
                  },
                }),
            }}
            onlineDetails={{
              icon: getFileSrcFromPublicFolder("online_icon.svg"),
              shortDescription:
                "Have your service online on link zoom. You’ll be sort a to your email.",
              onClick: () =>
                history.push({
                  pathname: `/booking/${service}/attributes`,
                  state: {
                    ...state,
                    isInClinic: false,
                    isInHouse: false,
                    isOnline: true,
                  },
                }),
            }}
            online={isOnline}
            inHouse={isInHouse}
            inClinic={isInClinic}
            shadowBoxProps={{ padding: true, primary: true }}
          />
        </div>
      </div>
    </>
  );
};

export default ServiceLocationPage;
