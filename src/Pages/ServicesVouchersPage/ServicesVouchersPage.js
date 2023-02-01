//libs
import {
  FAELoading,
  FAEText,
  FAEButton,
} from "@findanexpert-fae/components";
import { FAETitle } from "@findanexpert-fae/components/dist/stories/FAETitle/FAETitle";
import React, { Children, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import history from "../../history";
//src
import { getServicesVouchers } from "../../redux/actions/servicesVocuhersPageActions";
import FAEVoucherCard from "../../Temps/FAEVoucherCard/FAEVoucherCard";
import {
  getCookies,
  getFileSrcFromPublicFolder,
  NoResult,
  replaceSpaces,
} from "../../utils";
//scss
import "./ServicesVouchersPage.scss";
//Image 
const VoucherServiceCard1 = getFileSrcFromPublicFolder("service_voucher_backgorund.png");
 
const ServicesVouchersPage = ({
  getServicesVouchers,
  loading,
  error,
  servicesVouchers,
  userCountryId
}) => {
  const userId=getCookies("userId")
  useEffect(() => {
    getServicesVouchers(userId);
  }, [getServicesVouchers]);
  const clickHandle=(services)=>{
    history.push({state:{services} 
      ,pathname :`/your-vouchers/service-voucher-detail`})
  } 
  console.log(servicesVouchers, 'servicesVouchers?.electronicVouchers')

// a.map((item, ind)=>{
//     return {item.channels_name, channel_details:{Poliarisation: item.channel_detail.split(" ")[1], Symbol_Rate: item.channel_detail.split(" ")[0], FEC: item.channel_detail.split(" ")[4], System: item.channel_detail.split(" ")[2].split("/")[0], Modulation: item.channel_detail.split(" ")[2].split("/")[1], status: "SD/clear"}}})
  return (
    <>
      <div className="fae--services-vouchers-page-main-container">
           <div className="fae-serviceVouchersPageTopbtn">
           {/* <FAEButton className="fae-add-voucher" >Add New Voucher</FAEButton>*/}
          </div> 
           <div className="fae-flexcardslist">
             {servicesVouchers?.electronicVouchers?.map((eachService, ind)=>{
               return(  
                  <FAEVoucherCard
                    id={ind}
                    Url={VoucherServiceCard1}
                    Title={eachService?.title}
                    // Button="Redeem" 
                    isService={true}
                    code={eachService?.voucherCode}
                    date={eachService?.expiryDate.split("T")[0]}
                    price={eachService?.amount} 
                    currency={userCountryId ==1 ? "£": eachService?.currencySymbol} 
                    onClick={()=>clickHandle(eachService)}
                  /> )
              })}
          {servicesVouchers?.electronicVouchers?.length ==0 && <div style={{fontWeight:"bold", textAlign:"center", padding:"10rem" }}> Not Found</div>}
            </div>
           {/* <div className="fae-serviceVouchers-ExpireVoucher">
              <FAEText className="fae-expiredvouchertext">Expired Voucher</FAEText>
              <FAEText className="fae-resultvouchertext">2 Results Found</FAEText>
          </div> */}
          {/* <div className="fae-flexcardslist">
               <FAEVoucherCard
                    Url={VoucherServiceCard1}
                    Title="Exp: 24 Oct 2020"
                    Button="Redeem" 
                    isService={true}
                    code="2382382389xs"
                    date="Exp 12th Nov, 2023" 
                    price={25} 
                    currency={"$"} 
                    onClick={clickHandle}
                  />  
          </div>
           <FAETitle>Expired Vouchers</FAETitle>  */}
      </div>
    </>
  );
};

const mapStateToProps = ({
  servicesVouchersPageReducer: { error, loading, servicesVouchers },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  servicesVouchers,
  userCountryId
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getServicesVouchers }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServicesVouchersPage);
