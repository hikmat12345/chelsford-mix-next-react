//libs
import {
    // FAEVoucherCard,
    FAETextField,
    FAELoading,
    FAEDialogueBox,
    FAEText,
    FAEButton,
  } from "@findanexpert-fae/components";
  import React, { Children, useEffect, useState } from "react";
  import { connect } from "react-redux";
  import { bindActionCreators } from "redux";
  
  //src
  import {
    getGiftVouchers,
    makeGiftVoucherResponseToEmpty,
    sendGiftVoucher,
  } from "../../redux/actions/giftVouchersPageActions";
  import {
    getCookies,
    getFileSrcFromPublicFolder,
    NoResult,
    objectIsEmpty,
  } from "../../utils";
  
  //scss
  import "./GiftVouchersPage.scss";
  
  const GiftVouchersPage = ({
    error,
    loading,
    getGiftVouchers,
    giftVouchers,
    sendGiftVoucher,
    sendGiftVoucherResponse,
    makeGiftVoucherResponseToEmpty,
  }) => {
    const userId = getCookies("userId");
    const [openTransferBox, setOpenTransferBox] = useState(false);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const [voucherCode, setVoucherCode] = useState("");
    const [amount, setAmount] = useState(0);
    const [transferAmount, setTransferAmount] = useState(0);
  
    useEffect(() => {
      getGiftVouchers(getCookies("userId"));
    }, [getGiftVouchers, sendGiftVoucherResponse]);
  
    useEffect(() => {
      if (!objectIsEmpty(sendGiftVoucherResponse)) {
        const { message, statusCode } = sendGiftVoucherResponse;
        if (statusCode !== 0) {
          alert(message);
        } else {
          setOpen(true);
          setContent(message);
        }
        makeGiftVoucherResponseToEmpty();
      }
    }, [makeGiftVoucherResponseToEmpty, sendGiftVoucherResponse]);
  
    return (
      <>
        <div className="fae--gift-vouchers-page-main-container">
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
                giftVouchers.map((voucher) => {
                  const {
                    amount,
                    voucherCode,
                    currencySymbol,
                    expiryDate,
                    serviceName,
                  } = voucher;
                  return (
                    <div
                      style={{
                        backgroundImage: `url('${getFileSrcFromPublicFolder(
                          "gifts_voucher_background.png"
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
                      <div>
                        <FAEButton
                          onClick={() => {
                            setOpenTransferBox(true);
                            setVoucherCode(voucherCode);
                            setAmount(amount);
                          }}
                          className="services-voucher-page-buttton"
                        >
                          Transfer
                        </FAEButton>
                        <FAEText style={{ textAlign: "center" }}>
                          {expiryDate}
                        </FAEText>
                      </div>
                      <FAEText
                        subHeading
                        primary
                        className="gifts-voucher-page-price-tag"
                      >
                        {currencySymbol}
                        {amount}
                      </FAEText>
                      {/* <FAEVoucherCard
                        price={amount}
                        title={serviceName}
                        currencySymbol={currencySymbol}
                        expiryDate={expiryDate}
                        buttonText="Transfer"
                        buttonProps={{
                          onClick: () => {
                            setOpenTransferBox(true);
                            setVoucherCode(voucherCode);
                            setAmount(amount);
                          },
                        }}
                      /> */}
                    </div>
                  );
                })
              )}
            </>
          )}
           <div className="fae-noresult-container">{NoResult(loading, giftVouchers)}</div>
        </div>
        <FAEDialogueBox
          open={openTransferBox}
          title="Transfer Voucher"
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                transferAmount <= amount &&
                  sendGiftVoucher({
                    userId,
                    email: receiverEmail,
                    voucherCode,
                    amount: transferAmount,
                  });
              }}
              className="fae--gift-voucher-transfer-form"
            >
              <FAETextField
                type="email"
                placeholder="Receiver Email"
                getValue={(value) => {
                  setReceiverEmail(value);
                }}
                value={receiverEmail}
              />
              <FAETextField
                type="number"
                placeholder="Amount"
                getValue={(value) => {
                  setTransferAmount(value);
                }}
                error={(value) => value > amount}
                errorMessage="Transfer amount can not be greater than voucher amount."
                value={transferAmount}
              />
              <FAEButton type="submit">Transfer</FAEButton>
            </form>
          }
          buttons={[
            {
              label: "Cancel",
              onClick: () => {
                setOpen(false);
                setOpenTransferBox(false);
              },
            },
          ]}
        />
        <FAEDialogueBox
          open={open}
          title="Transfer Voucher"
          content={content}
          buttons={[
            {
              label: "Ok",
              onClick: () => {
                setOpen(false);
                setOpenTransferBox(false);
              },
            },
          ]}
        />
      </>
    );
  };
  
  const mapStateToProps = ({
    giftVouchersPageReducer: {
      error,
      loading,
      giftVouchers,
      sendGiftVoucherResponse,
    },
  }) => ({
    error,
    loading,
    giftVouchers,
    sendGiftVoucherResponse,
  });
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      { getGiftVouchers, sendGiftVoucher, makeGiftVoucherResponseToEmpty },
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(GiftVouchersPage);
  