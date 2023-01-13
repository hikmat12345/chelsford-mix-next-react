//libs
import React, { useEffect, Children } from "react";
import {
  FAELoading,
  FAEBookingCard,
  FAEContainer,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import { getCookies, getFileSrcFromPublicFolder, NoResult } from "../../utils";
import { getCompletedBookings } from "../../redux/actions/completedBookingsPageActions";

//scss
import "./CompletedBookinsgPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");

const CompletedBookinsgPage = ({
  getCompletedBookings,
  error,
  loading,
  completedBookings,
}) => {
  document.title = `Chelsford | Completed Bookings`;
  const userId = getCookies("userId");
  useEffect(() => {
    getCompletedBookings(userId);
  }, [getCompletedBookings, userId]);
  return (
    <>
      <div className="fae--upcoming-bookings-page-main-container">
        {loading && (
          <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
        )}
        {!loading && (
          <FAEContainer>
            <div className="fae--upcoming-bookings-page-bookings-wrapper">
              {Children.toArray(
                completedBookings.map((booking) => {
                  const {
                    displayedBookingDate = "",
                    bookingTime = "",
                    serviceTypeName = "",
                    providerName = "",
                  } = booking;
                  return (
                    <FAEBookingCard
                      src={placeholderImage}
                      serviceName={serviceTypeName}
                      time={bookingTime}
                      date={displayedBookingDate}
                      expertName={providerName}
                      // renderButton="Book Now"
                      buttonProps={{
                        primary: true,
                      }}
                      shadowBoxProps={{
                        backgroundColor: "#F9F9F9",
                        padding: window.screen.width < 500 ? true : false,
                      }}
                    />
                  );
                })
              )}
            </div>
          </FAEContainer>
        )}
        { NoResult(loading, completedBookings, "You have no completed bookings." )}
      </div>
    </>
  );
};

const mapStateToProps = ({
  completedBookingsPageReducer: { error, loading, completedBookings },
}) => ({
  error,
  loading,
  completedBookings,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCompletedBookings }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedBookinsgPage);
