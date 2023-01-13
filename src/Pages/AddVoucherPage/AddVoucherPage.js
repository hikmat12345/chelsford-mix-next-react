//libs
import {
  FAEButton,
  FAETextField,
  FAELoading,
} from "@findanexpert-fae/components";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import {
  makeVoucherAddedResponseEmpty,
  saveVoucher,
} from "../../redux/actions/addVoucherPageActions";
import {
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
} from "../../utils";
import history from "../../history";

//scss
import "./AddVoucherPage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const AddVoucherPage = ({
  voucherAddedResponse,
  loading,
  error,
  saveVoucher,
  makeVoucherAddedResponseEmpty,
}) => {
  const userId = getCookies("userId");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!objectIsEmpty(voucherAddedResponse)) {
      const { statusCode, message } = voucherAddedResponse;
      statusCode === 0 ? history.push("/your-vouchers") : alert(message);
      makeVoucherAddedResponseEmpty();
    }
  }, [makeVoucherAddedResponseEmpty, voucherAddedResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveVoucher({
      voucherCode: code,
      userId,
    });
  };
  return (
    <>
      <UserInfoPageLayout>
        {loading && (
          <FAELoading loaderImage={loaderImage} height="200px" type="svg" />
        )}
        {!loading && (
          <form onSubmit={handleSubmit} className="add-voucher-main-container">
            <FAETextField
              type="text"
              value={code}
              getValue={setCode}
              label="Enter Voucher Code"
              placeholder="Code"
              required
              isRequired={true}
            />
            <FAEButton>Add Voucher</FAEButton>
          </form>
        )}
      </UserInfoPageLayout>
    </>
  );
};

const mapStateToProps = ({
  addVoucherPageReducer: { error, loading, voucherAddedResponse },
}) => ({
  error,
  loading,
  voucherAddedResponse,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { saveVoucher, makeVoucherAddedResponseEmpty },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AddVoucherPage);
