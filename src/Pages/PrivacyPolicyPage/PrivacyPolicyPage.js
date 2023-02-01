//libs
import React, { useEffect } from "react";
import {
  FAEContainer,
  FAETitle,
  FAELoading,
} from "@findanexpert-fae/components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//src
import { getFileSrcFromPublicFolder } from "../../utils";
import { getLegalInformation } from "../../redux/actions/defaultActions";

//scss
import "./PrivacyPolicyPage.scss";

const PrivacyPolicyPage = ({
  legalInfo,
  getLegalInformation,
  userCountryId,
  loading,
}) => {
  document.title = "Expert | Privacy Policy";
  useEffect(() => {
    if (userCountryId !== "") {
      getLegalInformation({ userCountryId, type: "p" });
    }
  }, [getLegalInformation, userCountryId]);
  return (
    <>
      <FAEContainer>
        <div className="fae--privacy-policy-page-container dpt dpb">
          {/* <FAETitle
            className="sub-Heading"
            label="Privacy Policy"
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          /> */}
          {loading ? (
            <FAELoading
              loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
              type="svg"
              height="200px"
            />
          ) : (
            <>
            <div dangerouslySetInnerHTML={{ __html: legalInfo }} />
            {(legalInfo?.length ==0 ||legalInfo=="" || legalInfo ==undefined) && <p className="ResultEmpty"  style={{textAlign: "center"}}> <img src={getFileSrcFromPublicFolder("result not found-img.png")} /></p>}
           </>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicyPage);
