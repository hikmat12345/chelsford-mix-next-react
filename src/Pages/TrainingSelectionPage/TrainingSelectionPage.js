//libs
import {
  FAELoading,
  FAETitle,
  FAEText,
  FAEPrice,
  FAEShadowBox,
  FAEDialogueBox,
} from "@findanexpert-fae/components";
import React, { useEffect, Children, useState } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router";
import { bindActionCreators } from "redux";

//src
import {
  makeNextPageFalse,
  saveAddress,
} from "../../redux/actions/addressSelectionPageActions";
import { getTrainingDetails } from "../../redux/actions/trainingSelectionPageActions";
import { addSpaces, getCookies, getFileSrcFromPublicFolder, NoResult } from "../../utils";
import history from "../../history";

//scss
import "./TrainingSelectionPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const TrainingSelectionPage = ({
  error,
  loading,
  getTrainingDetails,
  trainingList,
  userCountryId,
  saveAddress,
  makeNextPageFalse,
  bookingId,
  cartId,
  nextPage,
}) => {
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  const location = useLocation();
  const {
    state: { serviceId, voucherId },
  } = location;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (nextPage) {
      setLoader(false);
      makeNextPageFalse();
      history.push({
        pathname: `/booking/${service}/summary`,
        state: { bookingId: bookingId, cartId: cartId, serviceId },
      });
    }
  }, [bookingId, cartId, makeNextPageFalse, nextPage, service, serviceId]);

  useEffect(() => {
    getTrainingDetails({ serviceId });
  }, [getTrainingDetails, serviceId]);

  const handleChangeTrainingBooking = (trainingId) => {
    setLoader(true);
    saveAddress({
      addressId: 0,
      location: "",
      serviceId,
      userId: getCookies("userId"),
      cartId: "",
      trainingId,
      voucherId,
    });
  };

  return (
    <>
      <div className="fae--training-selection-page-main-container dpt dpb">
        <div className="fae--training-selection-page-wrapper">
          <FAETitle label={serviceName} />
          {loading || loader ? (
            <FAELoading loaderImage={loaderImage} height="200px" type="svg" />
          ) : (
            ""
          )}
          {!loading && !loader
            ? Children.toArray(
                trainingList.map((subService) => {
                  const {
                    trainingEndDate,
                    trainingEndTime,
                    trainingStartDate,
                    trainingStartTime,
                    availableSeats,
                    location,
                    currencySymbol,
                    id,
                    trainingPrice,
                    discountedPrice,
                    trainingDescription,
                    trainingPercentDiscount,
                  } = subService;
                  return (
                    <FAEShadowBox
                      style={{
                        flexDirection: "column",
                        gap: "20px",
                        cursor: "pointer",
                      }}
                      padding
                      primary
                      onClick={() => {
                        if (availableSeats <= 0) {
                          setOpen(true);
                          setContent(
                            "All seats are booked. Please try again later."
                          );
                        } else {
                          handleChangeTrainingBooking(id);
                        }
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "80%",
                        }}
                      >
                        <div>
                          <FAEText tertiary paragraph>
                            From
                          </FAEText>
                          <FAEText>{trainingStartDate}</FAEText>
                        </div>
                        <div style={{ textAlign: "end" }}>
                          <FAEText tertiary paragraph>
                            To
                          </FAEText>
                          <FAEText>{trainingEndDate}</FAEText>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "80%",
                        }}
                      >
                        <div>
                          <FAEText tertiary paragraph>
                            Time
                          </FAEText>
                          <FAEText>
                            {trainingStartTime} - {trainingEndTime}
                          </FAEText>
                        </div>
                        <div style={{ textAlign: "end" }}>
                          <FAEText tertiary paragraph>
                            Price
                          </FAEText>
                          <FAEPrice
                            price={trainingPrice}
                            discountedPrice={
                              trainingPercentDiscount !== 0
                                ? discountedPrice
                                : 0
                            }
                            currencySymbol={currencySymbol}
                          />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "80%",
                        }}
                      >
                        <div>
                          <FAEText tertiary paragraph>
                            Remaining Seats
                          </FAEText>
                          <FAEText>{availableSeats}</FAEText>
                        </div>
                        <div style={{ textAlign: "end" }}>
                          <FAEText tertiary paragraph>
                            Details
                          </FAEText>
                          <FAEText>{trainingDescription}</FAEText>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "80%",
                        }}
                      >
                        <div>
                          <FAEText tertiary paragraph>
                            Location
                          </FAEText>
                          <FAEText>{location}</FAEText>
                        </div>
                      </div>
                    </FAEShadowBox>
                  );
                })
              )
            : ""}
         {(!loading && trainingList.length ==0) && NoResult(loading, trainingList, "Training List Not Found." )}

        </div>
      </div>
      <FAEDialogueBox
        open={open}
        content={content}
        buttons={[
          {
            label: "Ok",
            onClick: () => {
              setOpen(false);
            },
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  trainingSelectionPageReducer: { error, loading, trainingList },
  defaultReducer: { userCountryId },
  addressSelectionPageReducer: { bookingId, cartId, nextPage },
}) => ({
  error,
  loading,
  userCountryId,
  bookingId,
  cartId,
  nextPage,
  trainingList,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getTrainingDetails, makeNextPageFalse, saveAddress },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrainingSelectionPage);
