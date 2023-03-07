//libs
import React, { useEffect, useState } from "react"; 
import  "../../components/chelsfordCSS.css"
import Header from "../../components/header/Header"
import PicContainer from "../../components/picContainer/PicContainer"
import SubContainer from "../../components/Sub/SubContainer"
import CetagoryContainer from "../../components/cetagoryContainer/CetagoryContainer"
 
import Collapse from 'react-bootstrap/Collapse';
 import courseDetailContent from '../../statics/courseDetailContent.json'
import {getCookies, getFileSrcFromPublicFolder, getFileSrcFromPublicFolderSpcialLHR, replaceSpaces} from "../../utils"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
//src  
import "./LandingPage.scss";  
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Testimonial from "../../components/Testimonial/Testimonial";
import "../ServiceContentPage/contentDetail.css"
import WhatNextCard from "../../components/whatnextCard/whatNextCard";
import Vedio from "../../components/video/video/Vedio";
import About from "../../components/About/About";
import OurPartners from "../../components/OurPartners/OurPartners";

 
const LandingPage = ({ 
  getNotificationsList,   
}) => {    
  document.title = "Chelsford | Trainings";
 
    useEffect( async() => {
          window.scrollTo(0, 0);
        }, [ 
    ]);

    function sectionCatHandler(evt, cityName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      tablinks = document.getElementsByClassName("tablinks");
      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active-tab", "");
      }
      document.getElementById(cityName).style.display = "block";
      evt.currentTarget.className += " active-tab";
    } 

  const [contentData, setContentData]= useState([])
  useEffect(()=>{
    const courseContent= courseDetailContent.filter((item)=>item.page_link=="home-page")
    setContentData(courseContent) 
  }, [])
  const {course_information,summary_description, course_module, featur_content, instruction_content, page_link, what_next}= contentData[0] || {}
  const [open, setOpen] = useState(false);

  return (
      <>  
        <div>
         <PicContainer />
          <SubContainer />
          <CetagoryContainer />
          <Vedio/>
          <About/>   
          <OurPartners/>  
           {(course_information?.length !==0 && course_information?.length !==undefined) &&
            <section id="you-talk-with" className="mb-4 only-show-on-desktop you-talk-with course-information-sec" style={{backgroundImage: `url(${getFileSrcFromPublicFolderSpcialLHR('a-female-doctor-in-a-medical-mask.png')})`}}>
             <div className="container-fluid">
              <div className="px-4 col-md-12">
                <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12 col-sm-12">
                      <h1 className="home-tabs-sub-header" style={{color:"white"}}>Why Train with Us?</h1>
                      <p className="py-2 home-head-title">Let us give you these top reasons why you should train with us:</p> 
                    </div> 
                 
                 </div>
              </div>
              </div>
              <div className="row">
                <div className="tabs-ci col-md-3">
                     <ul>
                        {course_information?.map((ciTitle, index)=>{
                         return (
                          <li key={index}>
                            <button className={`tablinks ${index==0 && "active-tab"}`} onClick={(e)=>sectionCatHandler(e, replaceSpaces(ciTitle?.course_info_title, "_"))}><div dangerouslySetInnerHTML={{ __html:ciTitle?.course_info_title}} /></button> 
                          </li>)})} 
                       </ul>
                  </div>
                 
                <div className="tabs col-md-9">
                {course_information?.map((ciTitle, index)=>{
                   return ( 
                    <div key={index} style={ {display: index ==0 && "initial"}} id={replaceSpaces(ciTitle?.course_info_title, "_")} className="tabcontent"   > 
                        <p> { ciTitle?.course_info_detail ==="" ? <h4 style={{padding:6, textAlign:"center"}}>Content Not Found</h4>: <div dangerouslySetInnerHTML={{ __html: ciTitle?.course_info_detail }} /> }</p>
                    </div>)})
                  } 
                </div> 
                </div> 
          </div>  
            </section>
           }
        <section id="course-info-section" className="mb-4 you-talk-with course-information-sec sec_mob" style={{backgroundImage: `url(${getFileSrcFromPublicFolderSpcialLHR('a-female-doctor-in-a-medical-mask.png')}`}}>

           <p className="mb-0 font_mob_sec">Why Train with Us?</p>
          <p className="font_para_mob">Let us give you these top reasons why you should train with us:</p>
            <div className="container">
                 {course_information?.map((obj, index)=>{
                  return (
                  <>
                   <button
                    onClick={() => setOpen(index+10)}
                    aria-controls="example-collapse-text"
                    id="example-collapse-text"

                    aria-expanded={open}
                    className="mt-3 text-left btn btn-light btn_custom1 w-100" >
                    <div className="row">
                        <div className="p-0 text-left col-md-10 col-10">
                          {obj.course_info_title}
                        </div>
                        <div className="p-0 text-right col-md-2 col-2">
                           <i class="fas fa-angle-down"></i>
                        </div>
                    </div>
                  
                    <Collapse className="fae-mob-course-info-desc" in={open==index+10 ? open :false}>
                    <div id="example-collapse-text" >
                        {obj?.course_info_detail}
                      </div> 
                    </Collapse>
                     </button>
                  </>)
                   })}
                  </div>
             </section>
 
    {/* testimonial section  */}
     <Testimonial />
    {/* // {{-- content page section 6 --}} */}
 
    <div className="container-fluid learn-more" >
        <div className="row get-qualified">
              <div className="col-md-7">
                <div className="coursesDiscriptionCol">
                    <h2>Chelsford, The Premier Aesthetic Training Institute</h2>
                    <p className="description">We'll ensure that you reach a high standard of education and are competent in your chosen subject of study so you can move straight into the job industry. Enrol Today!</p> 
                </div> 
              </div>
            <div className="col-md-2"> </div>
            <div className="col-md-3">
                {/* <div className="bookingContainer">
                    <button type="button" className="btn btn-default" style={{background: "#D9BD3E",borderRadius: "5px",top: "35px",bottom: 0,position: "relative"}}><a href="{{ url('course/booking/'.$product['slug'] ) }}"  style={{color:" #fff", fontSize: "22px",fontWeight: 500}}>View Dates & Book</a></button>
                </div> */}
              </div>
            </div>
          </div>  
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

 
