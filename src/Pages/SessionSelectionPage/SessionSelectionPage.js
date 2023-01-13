//libs
import React, { Children, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FAETitle, FAEPrice, FAEText } from "@findanexpert-fae/components";
import { useLocation, useParams } from "react-router";

//src
import { addSpaces, getFileSrcFromPublicFolder } from "../../utils";
import history from "../../history";
import { getServiceSessions } from "../../redux/actions/sessionSelectionPageActions";

//scss
import "./SessionSelectionPage.scss";
import { FAELoading } from "@findanexpert-fae/components/dist/stories/FAELoading/FAELoading";

const SessionSelectionPage = ({
  getServiceSessions,
  loading,
  sessions=[],
  userCountryId,
}) => {
 
  const { service } = useParams();
  const location = useLocation();
  const { state } = location;
  const serviceName = addSpaces(service, "-");
  document.title = `Chelsford | ${serviceName} - Select Session(s)`;
  const { currencySymbol, serviceId, isInClinic, isInHouse, isOnline } = state;
  
  useEffect(() => {
    if (userCountryId !== "") {
      getServiceSessions({ serviceId, userCountryId });
    }
  }, [getServiceSessions, serviceId, userCountryId]); 
  const handleClickSession = async (selectedSessions, discountedPrice, price) => {
    return  (isInClinic && isInHouse) ||
      (isOnline && isInClinic) ||
      (isInHouse && isOnline)
      ? history.push({
          pathname: `/booking/${service}/location-selection`,
          state: {
            ...state,
            price: discountedPrice === 0 ? price : discountedPrice,
            selectedSessions,
          },
        })
      : isOnline
      ? history.push({
          pathname: `/booking/${service}/attributes`,
          state: {
            ...state,
            price: discountedPrice === 0 ? price : discountedPrice,
            selectedSessions,
          },
        })
      : isInClinic
      ? history.push({
          pathname: `/booking/${service}/address-selection`,
          state: {
            ...state,
            price: discountedPrice === 0 ? price : discountedPrice,
            selectedSessions,
          },
        })
      : history.push({
          pathname: `/booking/${service}/address-selection`,
          state: {
            ...state,
            price: discountedPrice === 0 ? price : discountedPrice,
            selectedSessions,
          },
        });
  };

  return (
    <> 
      <div className="fae--session-selection-page-container dpt">
        <div className="fae--session-selection-page-wrapper">
          <FAETitle
            label={serviceName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          <FAEText>Please Choose The Session(s)</FAEText>
          {loading ? (
            <FAELoading
              loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
              type="svg"
              height="200px"
            />
          ) : (
            <div className="session-selection-page-table">
              <div className="session-selection-page-wrapper-header">
                <FAEText className="session-selection-page-item">
                  Number Of Session(s)
                </FAEText>
                <FAEText className="session-selection-page-item">
                  Price Per Session
                </FAEText>
                <FAEText className="session-selection-page-item">
                  Total Price
                </FAEText>
              </div>
              {Children.toArray(
                sessions?.map((session) => {
                  const { id, actualPrice, discountedPrice, pricePerSession } =
                    session;
                  return (
                    <div
                      onClick={() =>
                        handleClickSession(id, discountedPrice, actualPrice)
                      }
                      className="session-selection-page-wrapper"
                    >
                      <div className="session-selection-page-item">
                        <FAEText className="session-selection-page-quantity">
                          {id}
                        </FAEText>
                      </div>
                      <FAEText className="session-selection-page-item">
                        {currencySymbol}
                        {pricePerSession}
                      </FAEText>
                      <FAEPrice
                        className="session-selection-page-item"
                        currencySymbol={currencySymbol}
                        price={actualPrice}
                        discountedPrice={discountedPrice}
                      />
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({
  sessionSelectionPageReducer: { error, loading, sessions },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  sessions,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getServiceSessions,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionSelectionPage);
