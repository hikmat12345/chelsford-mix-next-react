//libs 
import { FAEButton } from "@findanexpert-fae/components/dist/stories/FAEButton/FAEButton";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";
import React, {  useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//src
import {
  getGiftVouchers,
  makeGiftVoucherResponseToEmpty,
  sendGiftVoucher,
} from "../../redux/actions/giftVouchersPageActions"; 
import { GetServiceVoucherHistory } from "../../redux/actions/servicesVocuhersPageActions";
import { getCookies, getFileSrcFromPublicFolder } from "../../utils";

//scss
import "./VoucherHistoryPage.scss";

const loaderImage = getFileSrcFromPublicFolder("profileimg.png");
const VoucherHistoryPage = ({
  loading,
  voucherhistory, 
  GetServiceVoucherHistory
}) => { 
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(""); 
  const userId= getCookies("userId")
  useEffect(()=>{
    GetServiceVoucherHistory(userId)
  }, []) 
  return (
    <>
      <div className="fae--gift-vouchers-page-main-container">
       
      <table id="customers">
        <tr>
          <th>Number</th>
          <th>Title</th>
          <th>Amount</th>
          {/* <th>Assign From</th> */}
          <th>Redeem Date</th>
        </tr>
       {voucherhistory?.result?.vouchers?.map((histryList, ind)=>{
        const {amount, createdOn, currencySymbol, invoiceId,  serviceId, serviceName, title,  userId, voucherCode, voucherId} =histryList
       return  ( <tr>  
            <td>{voucherCode}</td>
            <td>{serviceName}</td>
            <td>{currencySymbol}{amount}</td>
            {/* <td><span>Maven Div</span><span><FAEImage src="" /></span></td> */}
            <td>{createdOn?.split("T")[0]} --- {createdOn?.split("T")[1]?.split(":")?.at(0)} : {createdOn?.split("T")[1]?.split(":")?.at(1)} </td>
        </tr>
       )})}
       </table>
        {voucherhistory?.result?.vouchers?.length ==0 && <div style={{fontWeight:"bold", textAlign:"center",    margin: "auto", padding:"3rem" }}> {voucherhistory?.result?.message}</div>} 
     
           
      </div>
    </>
  );
};

const mapStateToProps = ({
  giftVouchersPageReducer: {
    error,
    loading,  
  },
  servicesVouchersPageReducer:{voucherhistory}
}) => ({
  error,
  loading, 
  voucherhistory
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {GetServiceVoucherHistory },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VoucherHistoryPage);
