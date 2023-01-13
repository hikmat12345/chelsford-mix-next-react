//libs
import React, { useState, useEffect } from "react";
import {
  FAECodeInput,
  FAETitle,
  FAELoading,
} from "@findanexpert-fae/components";
import { useLocation } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import {
  setVerifyCodeResponseToEmpty,
  verifyCode,
} from "../../redux/actions/codeVerificationPageActions";
import { getFileSrcFromPublicFolder, objectIsEmpty } from "../../utils";
import history from "../../history";

//scss
import "./CodeVerificationPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const CodeVerificationPage = ({
  setVerifyCodeResponseToEmpty,
  error,
  loading,
  verifyCode,
  verifyCodeResponse,
}) => {
  const [code, setCode] = useState("");

  const location = useLocation();
  const {
    state: { email },
  } = location;

  useEffect(() => {
    if (code.length === 6) {
      verifyCode(code, email);
    }
  }, [code, email, verifyCode]);

  useEffect(() => {
    if (!objectIsEmpty(verifyCodeResponse)) {
      const { statusCode, message } = verifyCodeResponse;
      // signin changes link
      statusCode !== 0 ? alert(message) : history.push("/sign-in");
      setVerifyCodeResponseToEmpty();
    }
  }, [verifyCodeResponse, setVerifyCodeResponseToEmpty]);

  return (
    <>
      <div className="fae--code-verification-page-container dpt dpb">
        <div className="fae--code-verification-page-wrapper">
          <FAETitle
            label="Verify Account"
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          />
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="150px" />
          )}
          {!loading && <FAECodeInput getValue={setCode} />}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({
  codeVerificationPageReducer: { error, loading, verifyCodeResponse },
}) => ({
  error,
  loading,
  verifyCodeResponse,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      verifyCode,
      setVerifyCodeResponseToEmpty,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CodeVerificationPage);
