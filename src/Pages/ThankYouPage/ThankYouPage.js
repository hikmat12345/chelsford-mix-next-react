//libs
import { FAEButton, FAEText } from "@findanexpert-fae/components";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { bindActionCreators } from "redux";

//src
import history from "../../history";
 import {  thankYouBookingAction } from '../../redux/actions/threeDSecure';
 import { 
  setCreateBookingResponseToEmpty
} from "../../redux/actions/summaryPageActions";
//scss
import "./ThankYouPage.scss";

const ThankYouPage = ({
  thankYouBookingAction,
  ThankYouBookingResponse,
  userCountryId,
  setCreateBookingResponseToEmpty,
  loading
}) => {
  
  const location = useLocation();
  const { state } = location;
  const { message, bookingId, bookingDate, bookingTime, serviceName,cartid  } = state;
   console.log(state, 'state kkk')
    useEffect(()=>{
    thankYouBookingAction({
      countryId:userCountryId,
      cartid, 
      bookingId
    })
    return ()=> setCreateBookingResponseToEmpty();
  }, []) 
  return (
    <>
      <div className="fae--thank-you-page-container">
        <div className="fae--thank-you-page-wrapper dpt dpb">
          <FAEText className="fae--thank-you-text">Thank You!</FAEText>
          <FAEText className="fae--thank-you-message">{message}</FAEText>
          <div className="fae--thank-you-card">
            <FAEText className="fae--thank-you-service-name">
              {serviceName}
            </FAEText>
            <div className="fae--thank-you-page-booking-detail">
              <div>
                <FAEText paragraph secondary>
                  Booking Confirmation Number
                </FAEText>
                <FAEText>{bookingId}</FAEText>
              </div>
              <div>
                <FAEText paragraph secondary>
                  Booking Date & Time
                </FAEText>
                <div style={{ display: "flex", gap: "50px" }}>
                  <FAEText>{bookingDate}</FAEText>
                  <FAEText>{bookingTime}</FAEText>
                </div>
              </div>
            </div>
          </div>
          <FAEButton onClick={() => history.push("/your-bookings/upcoming")}>
            See your Bookings
          </FAEButton>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ 
  thankyouBookingPageReducter: { ThankYouBookingResponse , error,  loading,  },
  defaultReducer: { userCountryId, userCountry, userCurrencyCode },
}) => ({
  error,
  loading,
  ThankYouBookingResponse,
  userCountryId
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      thankYouBookingAction,
      setCreateBookingResponseToEmpty
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ThankYouPage);
