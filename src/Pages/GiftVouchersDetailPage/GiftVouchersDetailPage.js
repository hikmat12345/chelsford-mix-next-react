//libs 
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";
import React, {  useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//src
import {
  getGiftVouchers,
  makeGiftVoucherResponseToEmpty,
  sendGiftVoucher,
} from "../../redux/actions/giftVouchersPageActions"; 
import { getFileSrcFromPublicFolder } from "../../utils";

//scss
import "./GiftVouchersDetailPage.scss";

const loaderImage = getFileSrcFromPublicFolder("profileimg.png");
const GiftVouchersDetailPage = ({}) => { 
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(""); 
  

  return (
    <>
      <div className="fae--gift-vouchers-page-main-container">
        <div class="fae-recommended-services-container">
            <FAEImage class="fae-recommended-services-image" src={getFileSrcFromPublicFolder("services-v-placeholder.JPG")}/>
             <div className="fae-recommended-services">
                <FAEText className="fae-vouchertitleassign">Assign By</FAEText>
                <div className="fae-voucherNumber">
                  <div className="fae-voucherNumber-imagsec">
                    <FAEImage src={loaderImage} alt="profileimg" className="fae-gifvoucherdetailpage-profileimg"></FAEImage>
                    <div>
                    <FAEText className="fae-voucherNumber-textbold">Junaid Ahmed Khan</FAEText>
                    <FAEText className="fae-voucherNumber-textpara">26 July 2022</FAEText>
                    </div>
                  </div>
                  <div className="fae-voucherNumber-rightsec">
                    <FAEText className="fae-giftvouchersdetailspage-alpnum">NJ84498NON</FAEText>
                    <FAEText className="fae-giftvouchersdetailspage-vouchernum">Voucher Number</FAEText>
                  </div>
                </div>
                <FAEText className="fae-vouchertitleassign-birthday">Birthday Gift</FAEText>
                <div>
                  <FAEText className="fae-vouchertitleassign-birthdaypara">A friend is someone who understands your past, believes in your future, and accepts you just the way you are – even if you are getting older.
                      Thank you for being that friend, and happy birthday.
                  </FAEText>
                </div>
                <div className="fae-voucherbottom-vocherprice">
                  <div className="fae-voucherbottom-price-500">
                    <FAEText className="fae-voucher-price">Voucher Price</FAEText>
                    <FAEText className="fae-voucher-500">$500</FAEText>
                  </div>
                  <div className="fae-voucherbottom-buttonside">
                    <FAEButton className="fae-voucherbottom-voucherbutton">Redeem</FAEButton>
                  </div>
                </div>
             </div>
           </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GiftVouchersDetailPage);
