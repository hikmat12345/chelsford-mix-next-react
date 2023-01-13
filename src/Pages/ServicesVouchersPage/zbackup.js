//libs
import {
    // FAEVoucherCard,
    FAELoading,
    FAEText,
    FAEButton,
  } from "@findanexpert-fae/components";
  import React, { Children, useEffect } from "react";
  import { connect } from "react-redux";
  import { bindActionCreators } from "redux";
  import history from "../../history";
  
  //src
  import { getServicesVouchers } from "../../redux/actions/servicesVocuhersPageActions";
  import {
    getCookies,
    getFileSrcFromPublicFolder,
    NoResult,
    replaceSpaces,
  } from "../../utils";
  
  //scss
  import "./ServicesVouchersPage.scss"; 
  const ServicesVouchersPage = ({
    getServicesVouchers,
    loading,
    error,
    servicesVouchers,
  }) => {
    useEffect(() => {
      getServicesVouchers(getCookies("userId"));
    }, [getServicesVouchers]);
  
    return (
      <>
        <div className="fae--services-vouchers-page-main-container">
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
                servicesVouchers.map((voucher) => {
                  const {
                    amount,
                    currencySymbol,
                    expiryDate,
                    serviceName,
                    id,
                    parentServiceName,
                  } = voucher;
                  return (
                    <div
                      style={{
                        backgroundImage: `url('${getFileSrcFromPublicFolder(
                          "services_voucher_background.png"
                        )}`,
                      }}
                      className="fae--voucher-card-page-unit-container"
                    >
                      <div style={{ textAlign: "center" }}>
                        <FAEText secondary subHeading>
                          {serviceName}
                        </FAEText>
                        <FAEText subHeading>Voucher</FAEText>
                      </div>
                      <FAEText subHeading secondary>
                        {currencySymbol}
                        {amount}
                      </FAEText>
                      <div>
                        <FAEButton
                          onClick={() =>
                            history.push({
                              pathname: `/services/${replaceSpaces(
                                parentServiceName !== ""
                                  ? parentServiceName
                                  : serviceName,
                                "-"
                              )}`,
                              state: { voucherId: id },
                            })
                          }
                          className="services-voucher-page-buttton"
                        >
                          Move Forward
                        </FAEButton>
                        <FAEText style={{ textAlign: "center" }}>
                          {expiryDate}
                        </FAEText>
                      </div> 
                    </div>
                  );
                })
              )}
            </>
          )}
           <div className="fae-noresult-container">{NoResult(loading, servicesVouchers)}</div>
        </div>
      </>
    );
  };
  
  const mapStateToProps = ({
    servicesVouchersPageReducer: { error, loading, servicesVouchers },
  }) => ({
    error,
    loading,
    servicesVouchers,
  });
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getServicesVouchers }, dispatch);
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ServicesVouchersPage);
  