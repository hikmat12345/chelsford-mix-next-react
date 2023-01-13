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
import {
  getCookies,
  getFileSrcFromPublicFolder,
  replaceSpaces,
  NoResult
} from "../../utils";
import history from "../../history";
import { getUpcomingBookings } from "../../redux/actions/upcomingBookingsPageActions";

//scss
import "./UpcomingBookingsPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");

const UpcomingBookingsPage = ({
  getUpcomingBookings,
  error,
  loading,
  upcomingBookings,
}) => {
  document.title = `Chelsford | Upcoming Bookings`;
  const userId = getCookies("userId");
  useEffect(() => {
    getUpcomingBookings(userId);
  }, [getUpcomingBookings, userId]);
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
                upcomingBookings.map((booking) => {
                  const {
                    displayedBookingDate = "",
                    bookingTime = "",
                    serviceTypeName = "",
                    providerName = "",
                    providerId,
                    isTraining,
                    trainingStartTime=""
                  } = booking; 
                  return (
                    isTraining &&
                    <FAEBookingCard
                      src={placeholderImage}
                      serviceName={serviceTypeName}
                      time={trainingStartTime}
                      date={displayedBookingDate}
                      expertName={
                        providerName.trim() !== "" || providerId !== 0
                          ? providerName
                          : "Looking for suitable provider..."
                      }
                      renderButton="Details"
                      buttonProps={{
                        primary: true,
                        onClick: () =>
                          history.push({
                            pathname: `/your-bookings/${replaceSpaces(
                              serviceTypeName.replaceAll("/","-"),
                              "-"
                            )}/details`,
                            state: { ...booking },
                          }),
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
       { NoResult(loading, upcomingBookings, "You have no upcoming bookings." )}
      </div>
    </>
  );
};

const mapStateToProps = ({
  upcomingBookingsPageReducer: { error, loading, upcomingBookings },
}) => ({
  error,
  loading,
  upcomingBookings,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUpcomingBookings }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpcomingBookingsPage);
