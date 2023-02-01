//libs
import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  FAEContainer,
  FAETitle,
  FAELoading,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";

//src
import { getFileSrcFromPublicFolder } from "../../utils";
import { getLegalInformation } from "../../redux/actions/defaultActions";

//scss
import "./TermsAndConditionsPage.scss";

const TermsAndConstionsPage = ({
  legalInfo,
  getLegalInformation,
  userCountryId,
  loading,
}) => {
  document.title = "Expert | Terms & Conditions";
  useEffect(() => {
    if (userCountryId !== "") {
      getLegalInformation({ userCountryId, type: "t" });
    }
  }, [getLegalInformation, userCountryId]);
  return (
    <>
      <FAEContainer>
        <div className="fae--terms-and-conditions-page-container dpt dpb">
          <FAETitle
            label="Terms and Conditions"
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          {loading ? (
            <FAELoading
              loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
              type="svg"
              height="630px"
            />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: legalInfo }} />
          )}
        </div>
      </FAEContainer>
    </>
  );
};

const mapStateToProps = ({
  defaultReducer: { legalInfo, userCountryId, loading },
}) => ({
  legalInfo,
  userCountryId,
  loading,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getLegalInformation,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsAndConstionsPage);
