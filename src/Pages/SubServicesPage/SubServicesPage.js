//libs
import React, { useEffect } from "react";
import { FAESubServices, FAETitle } from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";

//src
import {
  addSpaces,
  getCookies,
  getFileSrcFromPublicFolder,
  replaceSpaces,
  replaceSymbolToSpace,
} from "../../utils";
import { getSubServices } from "../../redux/actions/subServicesPageActions";
import { faeSubServicesParser } from "../../parsers";
import history from "../../history";

//scss
import "./SubServicesPage.scss";
import { FAEText } from "@findanexpert-fae/components/dist/stories/FAEText/FAEText";
import { FAELoading } from "@findanexpert-fae/components/dist/stories/FAELoading/FAELoading";
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const SubServicesPage = ({
  error,
  loading,
  getSubServices,
  subServices,
  userCountryId,
  userId
}) => {
  // const { service, mainService, voucherId }
   const searchData = useParams();
  const serviceName = addSpaces(searchData?.service, "-");
  const location = useLocation();
  console.log(searchData,location, 'searchData')

  const { mainService, voucherId, selected_country_id }  = location?.state == undefined ? {mainService:JSON.parse(searchData?.mainService), voucherId:JSON.parse(searchData?.voucherId), selected_country_id:JSON.parse(searchData?.selected_country_id)}: location?.state;

  document.title = `Chelsford | ${serviceName} Service`;
  userCountryId = (selected_country_id == undefined || selected_country_id ==null) ? userCountryId : JSON.parse(selected_country_id)
  console.log(searchData,selected_country_id, userCountryId, "userCountryId")
  useEffect(() => {
       getSubServices({
        serviceName,
        userCountryId:1,
        isMainService: mainService ?? true,
      });
  }, [getSubServices, mainService, serviceName, userCountryId]);
  const isProfileCompleted =  getCookies("customer_details") !== undefined && getCookies("customer_details").isProfileCompleted;
  const userSignedInStatus = (userId !== "" && userId !== undefined) || getCookies("userId") !== undefined ? true : false;
 
  function sendwithStates( pathname,   ismainService, getRedirectCredential){
 
  const  {  id,  isInHouse, isInClinic,  hasAttributes,  hasSubservice, name,
    discountedPrice,  duration,  currencySymbol,  hasSession, price, isTraining,
    isOnline, hasProducts  }= getRedirectCredential;

    !userSignedInStatus && localStorage.setItem("redirectUrl", pathname)
    !userSignedInStatus && ismainService ?  localStorage.setItem('stateObject', JSON.stringify({serviceId: id, mainService: false, voucherId })) :
    localStorage.setItem('stateObject', JSON.stringify({...getRedirectCredential, serviceId: id}))
    ismainService ? history.push({
      pathname: pathname,
      state: { mainService: false, voucherId }, }):
        history.push({
          pathname: pathname,
          state: {
            serviceId: id,
            isInClinic,
            isInHouse,
            isOnline,
            hasAttributes,
            price: discountedPrice === 0 ? price : discountedPrice,
            duration,
            hasProducts,
            currencySymbol,
            voucherId,
          },
      }) 
  }


  const redirectUrl = async ({ id, isInHouse, isInClinic, hasAttributes, hasSubservice, name, discountedPrice, duration, currencySymbol, hasSession, price, isTraining, isOnline, hasProducts  }) => {
    const getRedirectCredential= {  id,isInHouse,isInClinic,hasAttributes,hasSubservice,name,discountedPrice,duration,currencySymbol,hasSession,price,isTraining,isOnline,hasProducts } 
    const filteredName =replaceSymbolToSpace(name, " ")
    return await hasSubservice === true  ? sendwithStates( `/booking/${replaceSpaces(filteredName, "-")}/sub-services/false/${voucherId ? voucherId: 0}/${userCountryId}`,true, getRedirectCredential)  
      : isTraining ? sendwithStates(`/booking/${replaceSpaces(filteredName, "-")}/training-selection`,false, getRedirectCredential)
      : hasSession  ? sendwithStates(`/booking/${replaceSpaces(filteredName, "-")}/sessions`,false, getRedirectCredential)
      : (isInClinic && isInHouse) ||
        (isInHouse && isOnline) ||
        (isInClinic && isOnline) ? sendwithStates(`/booking/${replaceSpaces(filteredName, "-")}/location-selection`, false, getRedirectCredential)
      : isOnline ? sendwithStates(`/booking/${searchData?.service}/attributes`,false, getRedirectCredential)
      : isInClinic ?  sendwithStates( `/booking/${replaceSpaces(filteredName, "-")}/address-selection`,false, getRedirectCredential)
      : sendwithStates(`/booking/${replaceSpaces(filteredName, "-")}/address-selection`, false, getRedirectCredential)
  };
  const handleSubServiceClicked = async (selectedSubService) => {
     const filteredName =replaceSymbolToSpace(serviceName, " ")
     await !isProfileCompleted && userSignedInStatus  ? history.push({
          pathname: "/profile/edit",
            state: { next: history.location.pathname },
          })
    : history.push({
      pathname: `/booking/${replaceSpaces(filteredName, "-")}/training-selection`,
      state: {
        serviceId: selectedSubService?.id,
        ...selectedSubService
      },
    })  
  };
  if (loading) {
    return <FAELoading type="svg" loaderImage={loaderImage} height="630px" />;
  } 
  const doPadding= subServices?.length<4 ?(subServices.length==1 ?{paddingBottom: 353}:{paddingBottom: 220}): {paddingBottom: 294}

  return (
    <>
      <div className="fae--sub-services-page-container dpt dpb">
        <div className="fae--sub-services-page-wrapper" style={doPadding}>
          <FAETitle
            label={serviceName}
            logo={getFileSrcFromPublicFolder("title_logo.svg")}
          /> 
            <FAESubServices
                loading={loading}
                border="semiCircle"
                loaderProps={{
                  loaderImage,
                  height: "150px",
                  type: "video",
                }}
                subServices={faeSubServicesParser(subServices)}
                shadowBoxProps={{
                  primary: true,
                }}
                onClick={handleSubServiceClicked}
              /> 
          {!loading &&  Array.isArray(subServices)? (subServices.length ==0? <FAEText className="ResultEmpty" subHeading style={{textAlign: "center"}}> <img src={getFileSrcFromPublicFolder("result not found-img.png")} /></FAEText>:""):""}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({
  subServicesPageReducer: { error, loading, subServices },
  defaultReducer: { userCountryId, userId },
}) => ({
  error,
  loading,
  subServices,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getSubServices,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SubServicesPage);
