//libs
import React, { useEffect } from "react";
import { FAESubServices, FAETitle } from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//src
import {
  addSpaces,
  getFileSrcFromPublicFolder,
  replaceSpaces,
} from "../../utils";
import { getSubServices } from "../../redux/actions/subServicesPageActions";
import { faeSubServicesParser } from "../../parsers";
import history from "../../history";

//scss
import "./SubServicesPage.scss";
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const SubServicesPage = ({
  error,
  loading,
  getSubServices,
  subServices,
  userCountryId,
}) => {
  const { service } = useParams();

  const serviceName = addSpaces(service, "-");
  const location = useLocation();
  const {
    state: { mainService, voucherId, availableFlag },
  } = location;
  document.title = `Chelsford | ${serviceName} Service`;

  useEffect(() => {
    if (userCountryId !== "") {
      getSubServices({
        serviceName,
        userCountryId,
        isMainService: mainService ?? false,
      });
    }
  }, [getSubServices, mainService, serviceName, userCountryId]);

  const redirectUrl = ({
    id,
    isInHouse,
    isInClinic,
    hasAttributes,
    hasSubservice,
    name,
    discountedPrice,
    duration,
    currencySymbol,
    hasSession,
    price,
    isTraining,
    isOnline,
    hasProducts

  }) => {
    return hasSubservice === true
      ? history.push({
          pathname: `/booking/${replaceSpaces(name, "-")}/sub-services`,
          state: { mainService: false, voucherId },
        })
      : isTraining
      ? history.push({
          pathname: `/booking/${replaceSpaces(name, "-")}/training-selection`,
          state: {
            serviceId: id,
            isInClinic,
            isInHouse,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            hasProducts,
            currencySymbol,
            voucherId,
          },
        })
      : hasSession
      ? history.push({
          pathname: `/booking/${replaceSpaces(name, "-")}/sessions`,
          state: {
            serviceId: id,
            isInClinic,
            isInHouse,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            hasProducts,
            currencySymbol,
            isOnline,
            voucherId,
          },
        })
      : (isInClinic && isInHouse) ||
        (isInHouse && isOnline) ||
        (isInClinic && isOnline)
      ? history.push({
          pathname: `/booking/${replaceSpaces(name, "-")}/location-selection`,
          state: {
            serviceId: id,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            currencySymbol,
            isOnline, 
            hasProducts,
            isInClinic,
            isInHouse,
            voucherId,
          },
        })
      : isOnline
      ? history.push({
          pathname: `/booking/${service}/attributes`,
          state: {
            serviceId: id,
            isInClinic,
            isInHouse,
            isOnline,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            hasProducts,
            currencySymbol,
            voucherId,
          },
        })
       : isInClinic
      ? 
      history.push({
          pathname: `/booking/${replaceSpaces(name, "-")}/address-selection`,
          state: {
            serviceId: id,
            isInClinic,
            isInHouse,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            hasProducts,
            currencySymbol,
            voucherId,
          },
        })
        // history.push({
        //   pathname: `/booking/${replaceSpaces(
        //     name,
        //     "-"
        //   )}/date-time-selection-for-clinics`,
        //   state: {
        //     serviceId: id,
        //     isInClinic,
        //     isInHouse,
        //     hasAttributes,
        //     price: discountedPrice === 0 ? price : discountedPrice,
        //     duration,
        //     currencySymbol,
        //     voucherId,
        //   },
        // })
      : history.push({
          pathname: `/booking/${replaceSpaces(name, "-")}/address-selection`,
          state: {
            serviceId: id,
            isInClinic,
            isInHouse,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            hasProducts,
            currencySymbol,
            voucherId,
          },
     });
  };
  
  const handleSubServiceClicked = (selectedSubService) => {
    redirectUrl(selectedSubService);
   
   
  };
 
  return (
    <>
      <div className="fae--sub-services-page-container dpt dpb">
        <div className="fae--sub-services-page-wrapper">
          <FAETitle
            label={serviceName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          <FAESubServices
            loading={loading}
            border="semiCircle"
            loaderProps={{
              loaderImage,
              height: "150px",
              type: "video",
            }}
            subServices={faeSubServicesParser(subServices)}
            shadowBoxProps={{
              primary: true,
            }}
            onClick={handleSubServiceClicked}
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  subServicesPageReducer: { error, loading, subServices },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  subServices,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSubServices,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SubServicesPage);
