//libs
import {
  // FAEVoucherCard,
  FAEText,
  FAELoading,
} from "@findanexpert-fae/components";
import React, { Children, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//src
import { getPointsVouchers } from "../../redux/actions/pointsVouchersPageActions";
import { getCookies, getFileSrcFromPublicFolder, NoResult } from "../../utils";

//scss
import "./PointsVouchersPage.scss";

const PointsVouchersPage = ({
  getPointsVouchers,
  loading,
  error,
  pointsVouchers,
}) => {
  useEffect(() => {
    getPointsVouchers(getCookies("userId"));
  }, [getPointsVouchers]);
  return (
    <>
      <div className="fae--points-vouchers-page-main-container">
        {loading && (
          <FAELoading
            loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
            type="svg"
            height="200px"
          />
        )}
        {!loading && (
          <>
            {Children.toArray(
              pointsVouchers.map((voucher) => {
                const { amount, currencySymbol, expiryDate, serviceName } =
                  voucher;
                return (
                  <div
                    style={{
                      backgroundImage: `url('${getFileSrcFromPublicFolder(
                        "points_voucher_background.png"
                      )}`,
                    }}
                    className="fae--voucher-card-page-unit-container"
                  >
                    <div style={{ textAlign: "center" }}>
                      <FAEText primary subHeading>
                        {serviceName}
                      </FAEText>
                      <FAEText subHeading primary>
                        E Voucher
                      </FAEText>
                    </div>
                    <FAEText style={{ textAlign: "center" }}>
                      {expiryDate}
                    </FAEText>
                    <FAEText
                      heading
                      primary
                      className="points-voucher-page-price-tag"
                    >
                      {currencySymbol}
                      {amount}
                    </FAEText>
                  </div>
                );
              })
            )}
          </>
        )}
        <div className="fae-noresult-container">{NoResult(loading, pointsVouchers)}</div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  pointsVouchersPageReducer: { error, loading, pointsVouchers },
}) => ({
  error,
  loading,
  pointsVouchers,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPointsVouchers }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PointsVouchersPage);
