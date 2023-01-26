//libs
import React, { Fragment, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { 
  FAEServiceDescription,
  FAEServiceVideoMonitor,
  FAEAdvertisement,
  FAELoading,
  FAEText,
} from "@findanexpert-fae/components";
import { useParams, useLocation } from "react-router-dom";

//src
import { addSpaces, getCookies, getFileSrcFromPublicFolder, getFileSrcFromPublicFolderSpcialLHR, replaceSpaces } from "../../utils"; 
import { getServiceDetail } from "../../redux/actions/serviceContentPageActions";
import history from "../../history"; 
import courseDetailContent from '../../statics/courseDetailContent.json'
import $ from "jquery"
// import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
//scss
import "./ServiceContentPage.scss";
import "./contentDetail.css";
import Testimonial from "../../components/Testimonial/Testimonial";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholder = getFileSrcFromPublicFolder("placeholder.jpg");

const ServiceContentPage = ({ 
  loading, 
  serviceDescription = {}, 
  getServiceDetail,
  userCountryId,
  userId, 
}) => {
  const isProfileCompleted =
    getCookies("customer_details") !== undefined &&
    getCookies("customer_details").isProfileCompleted;
  const userSignedInStatus =
    userId !== "" || getCookies("userId") !== undefined ? true : false;
  const { service } = useParams();
  const serviceName = addSpaces(service, "-");
  const location = useLocation();
  const { state } = location;
 
  const {
    imagePath = "",
    serviceVideoURL = "",
    serviceShortDescription = "",
    remainingDescription = "",
    hasSubservice,
    currencySymbol,
    // description = "",
    isInClinic,
    isInHouse,
    price,
    serviceId,
    hasAttributes,
    maxPrice,
    duration,
    isFreeConsultation,
    percentDiscount,
    meta_Description,
    isServiceAvailable,
    serviceUnavailableMessage,
    hasSession,
    isAvailableForCountry,
    isOnline,
    hasProducts
  } = (serviceDescription !== null &&  serviceDescription !== undefined) ? serviceDescription :{};
  document.title = `Chelsford | ${serviceName}`;
  document.getElementsByTagName("META")[2].content = meta_Description;
 
  useEffect(() => {
    if (userCountryId !== "") {
      getServiceDetail({
        serviceName,
        userCountryId,
        isMobile: window.screen.width > 700 ? false : true,
      });
    }
  }, [getServiceDetail, serviceName, userCountryId]);

function sendwithStates(pathname,   subservice, freeConsultation){
  !userSignedInStatus && !subservice && localStorage.setItem("redirectUrl", pathname)
  !userSignedInStatus && !subservice &&  localStorage.setItem('stateObject', JSON.stringify({
    serviceId,
    isInClinic,
    isInHouse,
    hasAttributes,
    price,
    duration,
    freeConsultation,
    currencySymbol,
    voucherId: state ? state.voucherId : 0,
    availableFlag:isServiceAvailable,
    hasProducts,
    isOnline
  }))

  subservice ? history.push({
    pathname:pathname,
    state: {
      mainService: true,
      serviceId,
      isOnline,
      voucherId: state ? state.voucherId : 0,
      availableFlag:isServiceAvailable,
      hasProducts
    },
  }):
  history.push({
    pathname:pathname,
    state: {
      serviceId,
      isInClinic,
      isInHouse,
      hasAttributes,
      price,
      duration,
      freeConsultation,
      currencySymbol,
      isOnline,
      voucherId: state ? state.voucherId : 0,
      availableFlag:isServiceAvailable,
      hasProducts
    } 
  })
}

  const bookingRedirectUrl = (freeConsultation) => { 
    return isServiceAvailable && (isInClinic || isInHouse || isOnline)
      ? hasSubservice === true && !freeConsultation
        ?sendwithStates( `/booking/${service}/sub-services/${hasSubservice?true: false}/${state ? state.voucherId : 0}/${userCountryId}`,   true, freeConsultation)  
        : hasSession ? sendwithStates( `/booking/${service}/sessions`,   false, freeConsultation) 
                     : (isInClinic && isInHouse) ||
                       (isInHouse && isOnline) ||
                       (isInClinic && isOnline) ? sendwithStates( `/booking/${service}/location-selection`,   false, freeConsultation) 
                                   : isOnline  ? sendwithStates( `/booking/${service}/attributes`,false, freeConsultation)
                                               : isInClinic ? sendwithStates( `/booking/${service}/address-selection`,false, freeConsultation)
        : sendwithStates(`/booking/${service}/address-selection`,false, freeConsultation)
       : "";
  };
 
  
    if (typeof window !== "undefined") {
     window.$ = window.jQuery = require("jquery");
  }
   useEffect(() => {  
      $('.Toggle-header').click(function() {
       $(this).find('i').toggleClass('fas fa-plus fas fa-minus');
     });  
 
   $("#your-talk ul li").click(()=>{
     console.log($(this).html( ), '$(this).find("div")')
     //  $(this).find("div").toggleClass("show-text")
     $(this).animate({
            width: 430
      }); 
   }); 
     $( ".chevron-arrow" ).click((e)=>{
        e.preventDefault();    
        $('.remaining-boxes').toggleClass("remaining-boxes-show");
        if ($(".remaining-boxes").hasClass("remaining-boxes-show")) {
           $(".chevron-arrow").html('<i style="font-size: 12; font-size: 21px !important; color: black;" class="fa fa-angle-up" aria-hidden="true"></i>'); 
          }else {
            $(".chevron-arrow").html('<i style="font-size: 12; font-size: 21px !important; color: black;"  class="fa fa-angle-down" aria-hidden="true"></i>'); 
          }
      });
   
      $(document).on("click",".banner-card ", function () { 
         $(this).toggleClass("hbox-active"); 
         $(".banner-card").not(this).toggleClass("hbox-hidden");
         $(this).find(".box-extra").toggleClass("active-box-extra")
     });
    
    var acc = document.getElementsByClassName("you-talk-btn");
    var i; 
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      } 
   })
 
 
   function openCity(evt, cityName) {
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
  
 const courseContent= courseDetailContent.filter((item)=>item.page_link==service?.toLocaleLowerCase())
 const {course_information, course_module, featur_content, instruction_content, page_link, what_next}= courseContent[0] || {}

 const padding= courseContent?.length ==0 && 300
   return (
    <>
      {loading && (
        <FAELoading loaderImage={loaderImage} type="svg" height="630px" />
      )}
        {!loading && (
          <div  style={{paddingBottom:padding}}>
          <FAEServiceDescription
            className="fae--service-content-page-service-description-tab"
            actionButtonProps={{
              className: "fae--service-description-page-action-button",
            }}
            placeholder={placeholder}
            textOnImage={isOnline && !isInClinic && !isInHouse && "Only Online"}
            isFreeConsultation={false}
            src={imagePath}
            bookingButtonClicked={() =>
              !isProfileCompleted && userSignedInStatus
                ? history.push({
                    pathname: "/profile/edit",
                    state: { next: history.location.pathname },
                  })
                : bookingRedirectUrl(false)
            }
            isAvailableForCountry={isAvailableForCountry}
            freeConsultationClicked={() =>
              !isProfileCompleted && userSignedInStatus
                ? history.push({
                    pathname: "/profile/edit",
                    state: { next: history.location.pathname },
                  })
              : bookingRedirectUrl(true)
            }
            label={serviceName}
            price={maxPrice}
            discountedPrice={percentDiscount !== 0 && price}
            alt={serviceName}
            currencySymbol={currencySymbol}
            serviceDescription={serviceShortDescription}
            bookingButtonText={
              !isServiceAvailable
                ? serviceUnavailableMessage
                : isInHouse || isInClinic || isOnline
                ? maxPrice === 0
                  ? "Free Consultation"
                  : hasSubservice
                  ? "Book Now"
                  : "Book Now"
                : "Service Unavailable"
            }
            freeConsultationButtonText={
              !isServiceAvailable
                ? serviceUnavailableMessage
                : isInHouse || isInClinic || isOnline
                ? "Free Consultation"
                : "Service Unavailable"
            }
          />
          {/* <div className="fae-service-content-page-advertisement dpt">
            <div
              style={{
                backgroundImage: `url('${getFileSrcFromPublicFolder(
                  "content_page_design_element.png"
                )}`,
              }}
              className="fae-service-content-page-advertisement-content"
            >
              <FAEAdvertisement
                className="fae--service-content-page-advertisement-for-mobile"
                primary={false}
                playStoreImage={getFileSrcFromPublicFolder("google_play.svg")}
                appleStoreImage={getFileSrcFromPublicFolder("apple_store.svg")}
              />
            </div>
            <div className="fae-service-content-page-advertisement-video">
              <FAEServiceVideoMonitor
                video={serviceVideoURL}
                width={window.screen.width < 799 ? "95%" : "75%"}
                videoStand={getFileSrcFromPublicFolder("iMac_stand.webp")}
              />
            </div>
          </div>
          <div>
            <FAEAdvertisement
              primary={true}
              image1={getFileSrcFromPublicFolder("mobile_image.webp")}
              image2={getFileSrcFromPublicFolder("ad_girl_image.webp")}
            />
          </div>
          <div className="fae--service-content-page-container">
            <div className="fae--red-bg-content-container">
              <FAEText
                style={{
                  width: "80%",
                  fontSize: "14px",
                  lineHeight: "1.5",
                  fontWeight: "300",
                  color: "#626262",
                }}
              >
                {remainingDescription}
              </FAEText>
            </div> 
          </div> */}

 {courseContent?.length !==0 &&
   <>
   {(course_module?.length !==0 && course_module !==undefined) && <section id="Course_module" className="py-5 course_module">
      <div className="container">
        <h4 className="pt-3 pb-5 text-center">Course Modules</h4>
        <div className="px-5 row"> 
          {course_module?.slice(0,8)?.map((courseModuleName, index)=>{
            return (
                <div className="px-1 col-sm-6 col-6 col-md-6 col-lg-3">
                  <div className="course_module_label">
                    <div className="px-3 py-1 mt-5 text-center text-white fs-3 justify-content-center label-circle">
                      <span>{index+1}</span>
                    </div>
                    <p className="py-5">{courseModuleName}</p>
                  </div>
                </div>)
               })}
          </div>
      <div className="px-5 row remaining-boxes " style={{display:"none"}}> 
       {course_module?.slice(8)?.map((courseModuleName, index)=>{
            return (<div className="px-1 col-sm-6 col-6 col-md-6 col-lg-3">
            <div className="course_module_label">
                <div className="px-3 py-1 mt-5 text-center text-white fs-3 justify-content-center label-circle">
                <span>{index+8}</span>
                </div>
                <p className="py-5">{courseModuleName}</p>
              </div>
            </div>)})} 
           </div> 
          </div>
 
          {course_module?.length >8 && <div className="my-3 text-center justify-content-center">
          <div className="px-3 py-3 text-center text-white justify-content-center chevron-arrow label-circle"><i style={{fontSize: 12, fontSize: "21px", color: "black"}} className="fa fa-angle-down" aria-hidden="true"></i></div>
        </div>} 
    </section>}
   {console.log(featur_content, 'featur_content')}
    {courseContent?.length !==0 && 
      (featur_content?.length !==0 && featur_content !==undefined) && 
        <section id="complete_beauty" className="complete_beauty ">
            <div className="container-fluid">
            <h2 className="only-show-on-mobile">
                {featur_content?.title}
              </h2>
            <div className="row">
             <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
              <h2 className="only-show-on-desktop ">
                {featur_content?.title}
              </h2>
              <artical>
                <p className="cutoff-text"   dangerouslySetInnerHTML={{ __html: featur_content?.content_detail}} /> 
                <input className="expand-btn" type="checkbox" />
                </artical>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
             <FAEImage src={getFileSrcFromPublicFolderSpcialLHR(featur_content?.image)}   />
                <div className="complete_beauty_quality">
                  
                </div>
                <artical>
                <p className="cutoff-text cuttabletext" 
                  dangerouslySetInnerHTML={{ __html: featur_content?.content_detail}} />
                  <input className="expand-btn cuttabletext" type="checkbox" />
              </artical>
            </div>
          </div>
        </div>
      </section>}
  
    {/* <!-- course information   --> */} 
    {(course_information?.length !==0 && course_information?.length !==undefined) &&
          <section id="you-talk-with" className="mb-4 you-talk-with" >
             <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8 col-sm-12">
                      <h2>Course Information</h2>
                      <p className="py-2 description">In this course, you'll learn a variety of new skills that will help launch you into a rewarding career. Have a look at the course information to get an idea of what we’ll cover:</p> 
                    </div> 
                    <div className="col-md-4">
                    </div> 
              </div>
              <div className="row">
                <div className="tabs-ci col-md-3">
                    <ul>
                        {course_information?.map((ciTitle, index)=>{
                         return (
                          <li key={index}>
                            <button className={`tablinks ${index==0 && "active-tab"}`} onClick={(e)=>openCity(e, replaceSpaces(ciTitle?.course_info_title, "_"))}><div dangerouslySetInnerHTML={{ __html:ciTitle?.course_info_title}} /></button> 
                          </li>)})}
        
                        {/* <li>
                          <button className="tablinks" onClick={(e)=>openCity(e, 'Entry_Requirements')}>Entry Requirements</button>
                        </li>
                        <li>
                          <button className="tablinks" onClick={(e)=>openCity(e, 'Teaching_Assessments')}>Teaching/Assessments</button>
                        </li> 
                        <li>
                          <button className="tablinks" onClick={(e)=>openCity(e, 'Resources')}>Resources</button>
                        </li> 
                        <li>
                          <button className="tablinks" onClick={(e)=>openCity(e, 'Study_Options')}>Study Options</button>
                        </li> 
                        <li>
                          <button className="tablinks" id="openCity(event, 'Tuition_Fees')">Tuition Fees</button>
                        </li>  */}  
                    </ul>
                  </div>
                
                
                <div className="tabs col-md-9">
                {course_information?.map((ciTitle, index)=>{
                  console.log(course_information, ciTitle, 'course_information')
                  return ( 
                    <div key={index} style={ {display: index ==0 && "initial"}} id={replaceSpaces(ciTitle?.course_info_title, "_")} className="tabcontent"   > 
                        <p> { ciTitle?.course_info_detail ==="" ? <h4 style={{padding:6, textAlign:"center"}}>Content Not Found</h4>: <div dangerouslySetInnerHTML={{ __html: ciTitle?.course_info_detail }} /> }</p>
                    </div>)})
                  }
                 
                    {/* <div id="Entry_Requirements" className="tabcontent"> 
                      <p>This course is for complete beginners and there are no entry requirements for this course. If you want to enter the world of aesthetics then this is the perfect course that covers everything from foundation to advanced.</p> 
                    </div>

                    <div id="Teaching_Assessments" className="tabcontent"> 
                      <p> <strong>Lectures are delivered by experienced Educators.</strong><br /><br />
                        <strong> Practical:</strong> Our trainers work with Laser/IPL day in day out, so you will receive the most up to date information. Our courses are run in a specialized Laser / IPL training organization. We have a number of different Laser /IPL equipment from different manufacturers, so you can get practical hands-on experience using different devices.<br />
                        <strong>Group Work:</strong> You will work in groups to perform consultations and role plays. This breaks the theory up and makes the course a lot more fun and interesting. It refines the understanding of the subject area and allows the opportunity to give and receive feedback on performance.<br />
                        <strong> Discussions:</strong> Discussions are encouraged throughout the training, this allows reflective thinking, which leads to a deeper understanding of the subject area. There are a lot of differing opinions on the types of Lasers and parameters to use and a discussion clarifies any issues.<br />
                        <strong>Assignments:</strong> This satisfies the theory part of the qualification. Assignments will need to be completed for each of the modules. We will provide you with detailed course material that will allow you to complete the assignments. You can work on the assignments at your own pace, however the quicker you complete them, the quicker you will receive your qualification. 100% support and help will be provided for you to complete this part of the study programme.<br />
                        <strong>Observations:</strong> This satisfies the practical part of the qualification. You will be required to perform treatments on real clients under assessment conditions. We will ensure that you are 100% ready for this part of the course by providing you with enough practical experience. You will perform Facial Treatments, Facial/Body Electricals, Massage including Indian Head, Electrolysis and Hair removal treatments using Laser and IPL.<br />
                        You will perform Skin tightening, Skin rejuvenation, Red blood spots, Rosacea, Vein removal and Pigmented lesions removal using Lasers.<br />
                        <strong> Portfolio:</strong> As part of this course, you will be required to produce a portfolio. All evidence will need to be documented in the portfolio and cross-referred to unit outcomes.<br />
                          Constructing the portfolio should not be left to the end, and we will help you to do this step by step as you go along on this course. 
                        <strong> Independent Study:</strong> You will be required to perform some independent study on this course. This will enable you to tailor the general course materials to your own interests and requirements and develop your learning style. </p>
                    </div>
                    
                    <div id="Resources" className="tabcontent"> 
                      <p>You will have all teaching resources provided, including a notepad pen and iPad to keep all your notes safe. A full uniform will be provided at no extra cost. You will have access to our student portal, which supports you throughout your study. You will be assigned a dedicated tutor to guide and support you until the completion of the course. Access to the latest electrical facial equipment will be available for you to use at any time during the course.</p>
                    </div>

                    <div id="Study_Options" className="tabcontent"> 
                      <p>You will enter the college 4 days a week Monday to Thursday for 6 weeks 10am to 5pm. Once you have completed the Level 2 and Level 3 you will start your Level 4 Laser course which will be carried out Monday to Thursday 10am to 5pm. You're studies will be supported by your student portal where you can access you're resources and assignments for home study.</p>
                    </div>
                    <div id="Tuition_Fees" className="tabcontent"> 
                          <p>         
                              £4750 includes the following:<br/> 
                              Level 2 Infections control<br/> 
                              Core of Knowledge<br/> 
                              Tunic<br/> 
                              Resources<br/> 
                              VTCT Qualification Fee<br/> 
                              Assessment Fees<br/>  
                          </p>
                    </div> */}
                </div> 
                </div> 
          </div>  
         </section>
     }
    {/*  your talk with  */}
   
    <section id="your-talk">
      <div className="custom-container-overlay">
        <div className="custom-container">
          <h2>You'll walk away with </h2>
            <ul>
              {instruction_content?.map((instruction_content, index)=>{
                return (
                   <li key={index}> 
                    <div className="tick-icon"> 
                        <span><img  src="https://chelsford.com/public/icon/tick.svg" height={20} width={20} alt='tick icon' /></span>
                    </div> 
                    <div>
                        <div className="you-talk-btn">{instruction_content?.title}...</div>
                        <div className="you-talk-remaining-text" dangerouslySetInnerHTML={{ __html: instruction_content?.content_detail }} />
                    </div>
                  </li> )})
                }
              {/* <li>
                <div className="tick-icon"> 
                    <span><img  src="https://chelsford.com/public/icon/tick.svg" height={20} width={20} alt='tick icon' /></span>
                </div> 
                <div>
                    <div className="you-talk-btn">Once you complete the course, you will earn a VTCT Qualification...</div>
                    <div className="you-talk-remaining-text"> in Level 2 and 3 Beauty Therapy (General Route), including Face and Body Electrical, Massage, Indian Head, Pre-blended oil Massage and Epilation. Apart from that, you will also walk away with a VTCT Qualification in NVQ Level 4 Laser and Light & Knowledge of the Identification of Fitzpatrick Skin Types, Laser & IPL Hair Reduction, Pigmentation - sunspots & Freckles Removal, Vein Removal (Face & Legs), Skin Tightening Treatments, IPL Treatments for Sun Damage, Acne, Rosacea & Rejuvenation. As an added bonus you will receive a Level 2 in Infection control and Core of Knowledge.</div>
                </div>
              </li>  */}
          </ul>
        </div>
      </div>
    </section> 
    {/* //  <!-- testimonila  --> */}
    {/* <div className="container .home-testimonial">
        <div className="row">
            <div id="myCarousel" className="carousel slide course-testimonial" data-ride="carousel" 
            > 
               <div className="mobile-banner" id="mobile-icon">
                </div>
                <OwlCarousel items={1}  
                    className="carousel-inner"
                    loop  
                    nav  
                    margin={8} 
                     >
                    <div className="item active">
                        <div className="customStyleTestimonial">
                            <div className="img-box"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/b-AvUzcgVNE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                              <p className="testimonial"><i className="fa fa-quote-right" style={{color:"#1F105A", fontSize:"30px"}}></i><br/>After passing this course I was able to set up my own professional laser clinic within 4 weeks I was confident in buying my own equipment, making consent forms, advice sheets and everything else that is needed and I now have a very successful business! </p> 
                                  <br/><br/>
                                  <div className="innerControl">
                                 
                                    <span className="clientName">Ghazala’s Story</span>
                                    
                                </div>
                             
                          </div>
                       </div>
                    <div className="item">
                        <div className="customStyleTestimonial">
                        <div className="img-box"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/XS_ht5XxwRI" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                        <p className="testimonial"><i className="fa fa-quote-right" style={{color:"#1F105A", fontSize:"30px"}}></i><br/>Aesthetic Laser Clinic is very well set up to do training as it is a working clinic with excellent facilities. The trainers were very welcoming and friendly which in turn creates a good atmosphere in which to learn. I would recommend them for training and treatments. </p>
                            <br/><br/>
                            <div className="innerControl">
                        <a className="" href="#myCarousel" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <span className="clientName">Sally’s Story</span>
                        <a className="" href="#myCarousel" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                    </div>
                         
                        
                        </div>
                    </div>
                    <div className="item">
                        <div className="customStyleTestimonial">
                        <div className="img-box"><iframe width="100%" height="100%" src="https://www.youtube.com/embed/lxZYjFnYTV4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>
                        <p className="testimonial"><i className="fa fa-quote-right" style={{color:"#1F105A", fontSize:"30px"}}></i><br/>I found the training very thorough, very interesting and very informative and helpful. I now am able to carry on lasering using the new techniques that I have learnt and will be quite happy to carry out laser hair removal and skin rejuvenation. I would feel extremely confident.  </p>
                            <br/><br/>
                            <div className="innerControl">
                        <a className="" href="#myCarousel" data-slide="prev">
                            <i className="fa fa-angle-left"></i>
                        </a>
                        <span className="clientName">Michelle’s Story</span>
                        <a className="" href="#myCarousel" data-slide="next">
                            <i className="fa fa-angle-right"></i>
                        </a>
                      </div>
                        
                        </div>
                    </div>
                </OwlCarousel>
                <div className="CarouselcontrolsCustom">
                    <h2>Testimonials</h2> 
                </div>
            </div>
            
        </div>
    </div> */}
    
    {/* // <!-- what next  --> */}
      <div className="container-fluid content-feature-courses content-feature-courses-update">
        <div className="row">
            <div className="headerContainer">
                <h2>What’s Next </h2>
            </div>
            <div className="coursesContainer">
            {what_next?.map((what_next_cont, index)=>{
                 return (
                     <div className="course-card">
                      <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                      </div>
                      <h3>{what_next_cont?.title}</h3>
                      <p>{what_next_cont?.detail}</p>
                      <a href= {`/services/${replaceSpaces(what_next_cont?.title?.toLocaleLowerCase()?.replaceAll(".", ""), "-")}`}>Explore More</a>
                  </div>
                 )})}
                {/* <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div><h3>CPD ADVANCED PLASMA FIBROBLAST</h3>
                    <p>Learn Plasma Non-Surgical Eye Lift procedure & Wrinkle Removal.</p>
                    <a href="/services/cpd-advanced-plasma-fibroblast">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3>CPD ADVANCED CHEMICAL PEELS</h3>
                    <p>Learn to use Chemical Peels to treat various skin conditions.</p>
                    <a href="/services/cpd-advanced-chemical-peels">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3>VTCT LEVEL 4 SKIN BLEMISH REMOVAL</h3>
                    <p>Learn Advanced techniques to remove Skin tags, Milia & Veins.</p>
                    <a href="/services/level-4-laser-and-blemish-removal">Explore More</a>
                </div>
                <div className="course-card">
                    <div className="iconDiv">
                        <div className="iconContainer">
                            <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                        </div>
                    </div>
                    <h3>VTCT LEVEL 2 AND 3 NVQ BEAUTRY THERAPY</h3>
                    <p>Necessary Qualification to enter the world of Lasers & IPL.</p>
                    <a href="/services/VTCT-Level-2-and-3-NVQ-Beauty-Therapy">Explore More</a>
                </div> */}
                
            </div>
        </div>
     </div>
    {/* testimonial section  */}
     <Testimonial />
    {/* // {{-- content page section 6 --}} */}

    <div className="container-fluid learn-more" >
        <div className="row get-qualified">
              <div className="col-md-7">
                <div className="coursesDiscriptionCol">
                    <h2>Get Qualified and Start Today</h2>
                    <p className="description">We'll ensure that you reach a high standard of education and are competent in your chosen subject of study so you can move straight into the job industry. Enroll Today!</p> 
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
  </>}
{/* // <!-- footer sticky icons on mobile  --> */}
{/* 
     <div className="contact-source">
       <div className="contact-btns">
         <button type="button" className="btn btn-default" ><a href="tel:0800 955 0054" ><img  src={getFileSrcFromPublicFolder("icon/call_icon-svg.png")} alt="call us" /></a></button>
         <button type="button" className="btn btn-default " ><a href="{{ url('course/booking/'.$product['slug'] ) }}" >View Dates & Book</a></button>
         <button type="button" className="btn btn-default" ><a href="mailto:team@chelsford.com" ><img  src={getFileSrcFromPublicFolder("icon/chat_icon_svg.png")} alt="chat us" /></a></button>
       </div>
    </div> */}
  
         </div>
       )}
   </>
  )
};

const mapStateToProps = ({
  serviceContentPageReducer: {
    error,
    loading,
    relatedServices,
    serviceDescription,
    onlyForYouServices,
    latestBlogs,
    bottomBanners,
    middleBanners,
    topBanners,
    featuredServices,
    trendingServices,
  },
  defaultReducer: { userCountryId, userId },
}) => ({
  error,
  loading,
  relatedServices,
  serviceDescription,
  onlyForYouServices,
  latestBlogs,
  bottomBanners,
  middleBanners,
  userCountryId,
  userId,
  topBanners,
  featuredServices,
  trendingServices,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getServiceDetail,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceContentPage);
