//libs
import React, { useEffect, Children } from "react";
import { bindActionCreators } from "redux";
import {
  FAETitle,
  FAELoading,
  FAEOfferServiceCard,
} from "@findanexpert-fae/components";
import { connect } from "react-redux";

//src
import { getOffers } from "../../redux/actions/offersPageActions";
import { getFileSrcFromPublicFolder, objectIsEmpty, replaceSpaces } from "../../utils";
import history from "../../history";

//scss
import "./OffersPage.scss";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const OffersPage = ({ getOffers, error, loading, offers=[], userCountryId }) => {
  document.title = "Expert | Discounts and Offers";
  useEffect(() => {
    if (userCountryId !== "") {
      getOffers(userCountryId);
    }
  }, [getOffers, userCountryId]);

  return (
    <>
      <div className="fae--offers-page-container dpt dpb">
        <div className="fae--offers-page-wrapper">
          <FAETitle
            label="Offers"
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="400px" />
          )}
          {!loading && (
            <div className="fae--offers-page-services-wrapper">
              {Children.toArray(
                offers.map((service) => {
                  const {
                    serviceName,
                    imagePath,
                    maxPrice,
                    percentDiscount,
                    price,
                    serviceShortDescription,
                    currencySymbol,
                  } = service;
                  return (
                    <>
                      <FAEOfferServiceCard
                        src={imagePath}
                        serviceName={serviceName}
                        shortDescription={serviceShortDescription}
                        price={maxPrice}
                        discountedPrice={price}
                        offer={percentDiscount}
                        currencySymbol={currencySymbol}
                        onClick={() =>
                          history.push({
                            pathname: `/services/${replaceSpaces(
                              serviceName,
                              "-"
                            )}`,
                          })
                        }
                        shadowBoxProps={{
                          primary: true,
                        }}
                      /> 
                   </>
                  );
                })
              )}
            { !loading && Array.isArray(offers) ?( offers?.length ==0?<FAEText className="ResultEmpty" subHeading style={{textAlign: "center"}}> <img src={getFileSrcFromPublicFolder("result not found-img.png")} /></FAEText>:""):"" }
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  offersPageReducer: { error, loading, offers },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  offers,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getOffers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);
