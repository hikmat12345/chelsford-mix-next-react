//libs
import React, { useEffect } from "react";
import { FAETitle, FAEText, FAEButton } from "@findanexpert-fae/components";
import { useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import { getFileSrcFromPublicFolder, replaceSpaces } from "../../utils";
import {
  acceptConsent,
  makeConsentAcceptedFalse,
} from "../../redux/actions/consentPageActions";
import history from "../../history";
import UserInfoPageLayout from "../UserInfoPageLayout";

//scss
import "./ConsentPage.scss";

const ConsentPage = ({
  error,
  loading,
  consentAccepted,
  acceptConsent,
  makeConsentAcceptedFalse,
}) => {
  const { state } = useLocation();
  const { consentForm, serviceTypeName, bookingId, jobtype } = state;
  useEffect(() => {
    if (consentAccepted) {
      makeConsentAcceptedFalse();
      history.push({
        pathname: `/your-bookings/${replaceSpaces(
          serviceTypeName,
          "-"
        )}/details`,
        state: { ...state },
      });
    }
  }, [
    bookingId,
    consentAccepted,
    jobtype,
    makeConsentAcceptedFalse,
    serviceTypeName,
    state,
  ]);

  return (
    <>
      <UserInfoPageLayout>
        <div className="fae--consent-page-container dpt dpb">
          <div className="fae--consent-page-wrapper">
            <FAETitle
              label={serviceTypeName}
              logo={getFileSrcFromPublicFolder("title_logo.svg")}
            />
            <FAEText>
              <div dangerouslySetInnerHTML={{ __html: consentForm }} />
            </FAEText>
            <FAEButton onClick={() => acceptConsent(bookingId)}>
              Accept Consent
            </FAEButton>
          </div>
        </div>
      </UserInfoPageLayout>
    </>
  );
};

const mapStateToProps = ({
  consentPageReducer: { error, loading, consentAccepted },
}) => ({
  error,
  loading,
  consentAccepted,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      acceptConsent,
      makeConsentAcceptedFalse,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ConsentPage);
