//libs
import React, { useEffect, useState } from "react"; 
import  "../../components/chelsfordCSS.css"
import Header from "../../components/header/Header"
import PicContainer from "../../components/picContainer/PicContainer"
import SubContainer from "../../components/Sub/SubContainer"
import CetagoryContainer from "../../components/cetagoryContainer/CetagoryContainer"
import VideoContainer from "../../components/VideoContainer/VideoContainer"
import About from "../../components/About/About"
import Footer from "../../components/Footer/Footer"

import {getCookies, getFileSrcFromPublicFolder} from "../../utils"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//src  
import "./LandingPage.scss";  
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


 
const LandingPage = ({ 
  getNotificationsList,   
}) => {    
  document.title = "Expert | AnyService, AnyTime, AnyWhere";
 
    useEffect( async() => {
    window.scrollTo(0, 0);
   }, [ 
  ]);
    
 
  return (
    <>  
       <div>
         
          <PicContainer />
          <SubContainer />
          <CetagoryContainer />
          <VideoContainer />
          <About /> 
    </div>
      </>
    );
  };




const mapStateToProps = ({ 
  defaultReducer: { userCountryId, userCountry }, 
}) => { 
        return { 
          userCountryId, 
          userCountry, 
        }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(  {      },   dispatch  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);

 
