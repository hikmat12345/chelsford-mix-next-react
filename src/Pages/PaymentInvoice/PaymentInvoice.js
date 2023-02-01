import React from 'react';
import {  FAEButton, FAEText, FAEImage, FAEContainer, FAELoading } from "@findanexpert-fae/components";
  import "react-toastify/dist/ReactToastify.css";
  //src 
import './PaymentInvoice.scss'; 
import history from '../../history'
import { capitialize, getFileSrcFromPublicFolder, objectIsEmpty,  } from "../../utils"; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SalesOrderInvoiceAction} from "../../redux/actions/paymentInvoicePageAction"
import { useEffect } from 'react';

function PaymentInvoice({
    loading,
    SalesOrderInvoiceAction,
    salesOrderinvoice={} ,
}) {
    const BookingId = new URLSearchParams(window.location.search).get("BookingId") 
    const CustomerId = new URLSearchParams(window.location.search).get("CustomerId")  

    useEffect(()=>{ 

      var body = document.getElementsByTagName("body")[0];
      var classValue ='payment-method'
      body.className = body.className + ' '+ classValue;  
        SalesOrderInvoiceAction({BookingId:encodeURIComponent(BookingId.replaceAll(" ","+"))  , CustomerId:encodeURIComponent(CustomerId.replaceAll(" ","+"))  })
    }, [])
    
 const handlSubmit =()=>{
    history.push(
        {pathname:"/payment-selection",
         state:{...salesOrderinvoice?.response, generalBookingId:salesOrderinvoice?.response?.bookingId}
   })
 }
 const loaderImage = getFileSrcFromPublicFolder("loader.GIF"); 
 const paymentStatusBg= salesOrderinvoice?.response?.paymentStatus=="Unpaid"?"#FBE5E6":"#5fdf5a33"
 const paymentStatusColor= salesOrderinvoice?.response?.paymentStatus=="Unpaid"?"#db0406":"#5FDF5A"
 
  return (
      <>
         <FAEContainer style={{backgroundColor: '#f7f7f7'}}>
            {loading && 
              (<FAELoading className="paymentlink-loader"  type="svg" loaderImage={loaderImage} height="700px"  />)
            }
            {!loading &&  (
             <div className='fae-paynow-container'>
                <div className='fae-paynow-logo'>
                    <FAEImage src={getFileSrcFromPublicFolder("expert_logo.PNG")}/>
                    <h1>Expert</h1>
                </div>
                {salesOrderinvoice.code !==2  && salesOrderinvoice?.error == false  ?
                <>
                <div className='fae-paynow-card-above'>
                    <div className='fae-paynow-invoice'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice ID.</FAEText>
                        <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.invoiceNumber}</FAEText>
                    </div>
                    <div className='fae-paynow-created-on'>
                        <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Created on</FAEText>
                        <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.createdDate}</FAEText>
                    </div>
                </div> 
                <div className="fae-paynow-card">
                    <div className='fae-paynow-card-top' style={{backgroundColor:paymentStatusBg}}>
                        <div className='fae-paynow-invoice' >
                            <FAEText style={{color:paymentStatusColor, paddingTop: '5px', paddingBottom: '5px'}}>{salesOrderinvoice?.response?.paymentStatus}</FAEText>
                            <FAEText style={{fontSize: '20px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.currencySymbol}{salesOrderinvoice?.response?.subTotal}</FAEText>
                        </div>
                        <div className='fae-paynow-created-on'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Payable By</FAEText>
                            <FAEText style={{fontSize: '14px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.payableBy}</FAEText>
                        </div>
                    </div>
                    <div className='fae-paynow-invoice-form' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice Form</FAEText>
                            <FAEText style={{fontSize: '16px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.businessName}</FAEText>
                            <div className='fae-invoice-icons'><FAEImage className="fae-addPhoneIcon-img" src={getFileSrcFromPublicFolder("icons/phone.PNG")}/> <FAEText style={{fontSize: '16px', paddingTop: '5px',color:'#6c6c6c'}}>{salesOrderinvoice?.response?.businessAddress}</FAEText></div>
                            <div className='fae-invoice-icons'><FAEImage className="fae-addPhoneIcon-img" src={getFileSrcFromPublicFolder("icons/location.PNG")}/> <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>{salesOrderinvoice?.response?.businessPhone}</FAEText></div>
                    </div>
                    <div className='fae-paynow-invoice-form' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>invoice To</FAEText>
                            <FAEText style={{fontSize: '16px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.userName}</FAEText>
                            <div className='fae-invoice-icons'><FAEImage className="fae-addPhoneIcon-img" src={getFileSrcFromPublicFolder("icons/location.PNG")}/> <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>{salesOrderinvoice?.response?.customerAddress}</FAEText></div>                    </div>
                    <div className='fae-paynow-invoice-desc' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                        <div className='fae-paynow-description'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Description</FAEText>
                            <FAEText style={{fontSize: '16px', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.serviceName}</FAEText>
                            <FAEText style={{fontSize: '14px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}> Number of Sessions {salesOrderinvoice?.response?.numberOfSessions}</FAEText>
                        </div>
                        <div className='fae-paynow-price'>
                            <FAEText style={{color:'#bcbcbc', paddingTop: '5px', paddingBottom: '5px'}}>Price</FAEText>
                            <FAEText style={{fontSize: '16px'}}>{salesOrderinvoice?.response?.currencySymbol}{salesOrderinvoice?.response?.price}</FAEText>
                        </div>
                    </div>
                    <div className='fae-paynow-invoice-desc' style={{margin: '15px', borderBottom: '2px solid #eeeeee'}}>
                        <div className='fae-paynow-description'>
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c'}}>Sub Total</FAEText>
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c'}}>Discount</FAEText>
                            <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c'}}>Tax</FAEText>
                        </div>
                        <div className='fae-paynow-price'>
                        <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c'}}>{salesOrderinvoice?.response?.currencySymbol}{salesOrderinvoice?.response?.subTotal}</FAEText>
                        <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '15px',color:'#6c6c6c', textAlign: 'end'}}>{salesOrderinvoice?.response?.discount}%</FAEText>
                        <FAEText style={{fontSize: '16px', paddingTop: '5px',paddingBottom: '5px',color:'#6c6c6c', textAlign: 'end' }}>{salesOrderinvoice?.response?.tax}%</FAEText>
                        
                        </div>
                    </div>
                    <div className='fae-paynow-invoice-desc' style={{margin: '15px'}}>
                        <div className='fae-paynow-description'>
                            <FAEText style={{fontSize: '18px', paddingTop: '5px',paddingBottom: '15px',color:'black', fontWeight: 'bold'}}>Total to Pay</FAEText>
                        </div>
                        <div className='fae-paynow-price'>
                        <FAEText style={{fontSize: '18px', paddingTop: '5px',paddingBottom: '15px',color:'black', fontWeight: 'bold'}}>{salesOrderinvoice?.response?.currencySymbol}{salesOrderinvoice?.response?.subTotal}</FAEText>
                        </div>
                    </div>
                  
                </div>
                 {salesOrderinvoice?.response?.paymentStatus=="Unpaid" && <FAEButton onClick={handlSubmit} className="fae-pay-process-btn">Pay Now</FAEButton>}
              </>:  
              <FAEText style={{fontSize: '16px', paddingTop: '10rem',paddingBottom: '11rem',color:'#6c6c6c', textAlign: 'center', fontWeight: 'bold' }}> { capitialize(salesOrderinvoice.message)}</FAEText>}
            </div>)}
         </FAEContainer> 
    
    </>
  )
}

// export default PayNow

const mapStateToProps = ({
    salesOrderinvoiceRedcuer: { error, loading, salesOrderinvoice },
    defaultReducer: { userCountryId, userCountry, userCurrencyCode },
  }) => ({
    error,
    loading,
    salesOrderinvoice 
  });
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
      { SalesOrderInvoiceAction  },
      dispatch
    );
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentInvoice);