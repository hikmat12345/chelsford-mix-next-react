//libs
import React, { Fragment, useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {  
  FAELoading, 
} from "@findanexpert-fae/components";
import { useParams, useLocation } from "react-router-dom"; 
import Collapse from 'react-bootstrap/Collapse';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
//src
import { addSpaces, getCookies, getFileSrcFromPublicFolder, getFileSrcFromPublicFolderOther, getFileSrcFromPublicFolderSpcialLHR, replaceSpaces } from "../../utils"; 
import { getServiceDetail } from "../../redux/actions/serviceContentPageActions";
import history from "../../history"; 
import courseDetailContent from '../../statics/courseDetailContent.json' 
import $, { isEmptyObject } from "jquery"
// import OwlCarousel from 'react-owl-carousel';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
//scss
import "./ServiceContentPage.scss";
import "./contentDetail.css";
import Testimonial from "../../components/Testimonial/Testimonial";
import { FAEImage } from "@findanexpert-fae/components/dist/stories/FAEImage/FAEImage";
import WhatNextCard from "../../components/whatnextCard/whatNextCard";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
const placeholder = getFileSrcFromPublicFolder("placeholder.jpg");

const ServiceContentPage = ({ 
  loading, 
  serviceDescription = {}, 
  getServiceDetail, 
  userId, 
}) => {
  
  const [open, setOpen] = useState(false);
  const [walkWIthopen, setWalkWIthopen] = useState(false);
  const [contentData, setContentData]= useState([])
  const isProfileCompleted =  getCookies("customer_details") !== undefined && getCookies("customer_details").isProfileCompleted;
  const userSignedInStatus = userId !== "" || getCookies("userId") !== undefined ? true : false;
  const { service } = useParams();
  const serviceUrlName = addSpaces(service, "-");
  const location = useLocation();
  const { state } = location; 
  var url = new URL(window.location.href); 
  var urlserviceName = url?.searchParams?.get("serviceName") ?? ""
  const serviceQueryParams= urlserviceName ==""? service: urlserviceName; 
 
  const { currencySymbol,isInClinic,isInHouse,price,serviceId,hasAttributes, duration, meta_Description,isServiceAvailable, isOnline,hasProducts,serviceName
   } = (serviceDescription !== null &&  serviceDescription !== undefined) ? serviceDescription :{};
      document.title = `Chelsford | ${serviceUrlName}`;
      document.getElementsByTagName("META")[2].content = meta_Description;
      const [viewText, setViewText]=useState(1200)
      useEffect(() => {
        // if (userCountryId !== "") {
          getServiceDetail({
            serviceName:addSpaces(serviceQueryParams, "-"),
            userCountryId:1,
            isMobile: window.screen.width > 700 ? false : true,
          });
        // }
      }, [getServiceDetail, serviceUrlName]);
 
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
          $(".chevron-arrow" ).click((e)=>{
              e.preventDefault();    
              $('.remaining-boxes').toggleClass("remaining-boxes-show");
              if ($(".remaining-boxes").hasClass("remaining-boxes-show")) {
                $(".chevron-arrow").html('<i style="font-size: 12; font-size: 21px !important; color: black;" class="fa fa-angle-up" aria-hidden="true"></i>'); 
                }else {
                  $(".chevron-arrow").html('<i style="font-size: 12; font-size: 21px !important; color: black;"  class="fa fa-angle-down" aria-hidden="true"></i>'); 
                }
            }); 
        
        var acc = document.getElementsByClassName("you-talk-none");
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
      useEffect(()=>{
         const courseContent= courseDetailContent.filter((item)=>item.page_link==serviceQueryParams?.toLocaleLowerCase())
         setContentData(courseContent)
         setViewText(1200) 
       }, [serviceUrlName])
      const {course_information,summary_description,header_key_info, course_module, featur_content, instruction_content, page_link, what_next}= contentData[0] || {}
      const placeholderImage = getFileSrcFromPublicFolder("placeholder.jpg");
     
      const bookingHandler = ()=>{ 
        !isProfileCompleted && userSignedInStatus
          ? history.push({
            pathname: "/profile/edit",
            state: { next: history.location.pathname },
         })
        :history.push({ 
            pathname:"/booking/"+service+"/sub-services/true/0/1",
            state: { serviceId,
              isInClinic,
              isInHouse,
              hasAttributes,
              price,
              duration,
              currencySymbol,
              isOnline,
              voucherId: state ? state.voucherId : 0,
              availableFlag:isServiceAvailable,
              hasProducts},
        })
      }
   const padding= contentData?.length ==0 && 300
 
  const [stateDom, setState]= useState({showHide1: false,showHide2: false,showHide3: false });
  const  hideComponent=(name) =>{
     switch (name) {
      case "showHide1":
        showHide1==true ? setState({showHide1: false,showHide2: false,showHide3: false  }):
        setState({ showHide1: !stateDom.showHide1 });
        break;
      case "showHide2":
        showHide2==true ? setState({showHide1: false,showHide2: false,showHide3: false }):
        setState({ showHide2: !stateDom.showHide2 });
        break;
      case "showHide3":
        showHide3==true ? setState({showHide1: false,showHide2: false,showHide3: false  }):
        setState({ showHide3: !stateDom.showHide3 });
        break;
      default:
        return null;
    }
  }
   const {showHide1, showHide2, showHide3}=stateDom
   console.log(serviceDescription,isEmptyObject(serviceDescription), 'serviceDescription')
    return (
    <>
      {(loading)?
        (<FAELoading loaderImage={loaderImage} type="svg" height="630px" />)
      :
     ( <div  style={{paddingBottom:padding}}>
        
        <section id="main-sect" className="main-sect" style={{backgroundImage: `url(${serviceDescription?.imagePath})`, position: 'relative', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', width: '100%', height: '470px', WebkitBoxShadow: 'inset -45px -215px 64px -9px rgb(0 0 0 / 32%)', boxShadow: 'inset -45px -215px 64px -9px rgb(0 0 0 / 32%)'}}>
            <div className="course-overlay">
              <div className="container">
                <div className="main-text">
                  <h3>{serviceName}</h3>
                  <p>
                    Qualification Code: &nbsp;{header_key_info?.qualification_code}
                    <br />
                    Credit Value: &nbsp;{header_key_info?.credit_value}
                  </p>
                </div>
                <div className="banner-card-row ">
                  <div className={`px-1 banner-card-col banner-card ${showHide1==true?"hbox-active":showHide1==undefined?"hbox-hidden":""}`} onClick={()=>hideComponent("showHide1")}  title data-original-title="None">
                    <button className="my-1 btn main-btns" 
                    // style={{height: "85px"}}
                    >
                      <div className="py-2 d-flex">
                        <img src={getFileSrcFromPublicFolderSpcialLHR("pre-requisite.png")} alt="pre-requisite img" />
                        <p className="px-2 banner-boxes-tex justify-content-start text-start">
                          Pre-requisites
                          <br />
                          <span className=" pre-req">{header_key_info?.PreRequisites}</span>
                          {/* <span className={`fs-5 box-extra ${showHide1 && "active-box-extra"}`}>{header_key_info?.exp_duration} </span> */}
                        </p>
                      </div>
                    </button>
                  </div>
                  <div className={`px-1 banner-card-col banner-card ${showHide2==true?"hbox-active":showHide2==undefined?"hbox-hidden":""}`} onClick={()=>hideComponent("showHide2")} >
                    <button className="my-1 btn main-btns">
                      <div className="py-2 d-flex">
                        <img src={getFileSrcFromPublicFolderSpcialLHR("detail-duration.svg")} alt="" />
                        <p className="px-2 banner-boxes-tex justify-content-start text-start">
                          Duration
                          <br />
                          <span className="">{header_key_info?.days}</span>
                          <span className={`box-extra ${showHide2 && "active-box-extra"}`}>{header_key_info?.exp_duration} </span>
                        </p>
                      </div>
                    </button>
                  </div>
                  <div className={`px-1 banner-card-col banner-card ${showHide3==true?"hbox-active":showHide3==undefined?"hbox-hidden":""}`} onClick={()=>hideComponent("showHide3")}  title data-original-title=" ">
                    <button className="my-1 btn main-btns">
                      <div className="py-2 d-flex">
                        <img src={getFileSrcFromPublicFolderSpcialLHR("detail-pric-icon.svg")} alt="" />
                        <p className="px-2 banner-boxes-tex justify-content-start text-start">
                          Price
                          <br />
                          <span className="">  £ {serviceDescription?.maxPrice} Plus VAT </span>
                        </p>
                      </div>
                    </button>
                  </div>
                  <div className="px-1 banner-card-col">
                    <button className="my-1 btn main-btns-4 main-btns" onClick={bookingHandler}  style={{color: '#fff', fontSize: '20px', fontWeight: 500}}>
                          View Dates &amp; Book
                          <i className="my-2 ml-4 text-white fa fa-arrow-right" style={{fontSize: '17px'}} />
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        
      {/* summary detail page       */}
      <section className="h-auto p-md-5 p-sm-2 my-text-sect">
        <div className="container">
          <div className="row"> 
              <p className="text-center px-md-5 px-sm-0 mx-sm-0 mx-md-5">{summary_description}</p>
            </div>  
          </div> 
      </section> 
      {contentData?.length !==0 &&
      <>
        {(course_module?.length !==0 && course_module !==undefined) && <section id="Course_module" className="py-5 course_module">
          <div className="container">
            <h4 className="pt-3 pb-5 text-center">Course Modules</h4>
            <div className="px-3 row"> 
              {course_module?.slice(0,8)?.map((courseModuleName, index)=>{
                return (
                    <div className="px-1 col-sm-6 col-6 col-md-6 col-lg-3">
                      <div className="course_module_label">
                        <div className="px-3 py-1 mt-1 text-center text-white fs-3 justify-content-center label-circle">
                          <span>{index+1}</span>
                        </div>
                        <p className="">{courseModuleName}</p>
                      </div>
                    </div>)
                  })}
              </div>
          <div className="px-3 row remaining-boxes " style={{display:"none"}}> 
          {course_module?.slice(8)?.map((courseModuleName, index)=>{
                return (<div className="px-1 col-sm-6 col-6 col-md-6 col-lg-3">
                <div className="course_module_label">
                    <div className="px-3 py-1 mt-1 text-center text-white fs-3 justify-content-center label-circle">
                    <span>{index+9}</span>
                    </div>
                    <p className="">{courseModuleName}</p>
                  </div>
                </div>)})} 
              </div> 
              </div>
    
              {course_module?.length >8 && <div className="my-3 text-center justify-content-center">
              <div className="px-3 py-3 text-center text-white justify-content-center chevron-arrow label-circle"><i style={{fontSize: 12, fontSize: "21px", color: "black", pointer:"cursor"}} className="fa fa-angle-down" aria-hidden="true"></i></div>
            </div>} 
        </section>}

        
          {contentData?.length !==0 && 
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
                    <p className={`cutoff-text`} dangerouslySetInnerHTML={{ __html: featur_content?.content_detail?.length >1200? featur_content?.content_detail.substr(0, viewText)+(viewText==1200?"...":""):featur_content?.content_detail }} /> 
                  {window.screen.width > 800 ? featur_content.content_detail.length < 1200?"": <button className="read-more-btn" onClick={()=>setViewText(viewText==1200?1500000:1200)} >{viewText==1200?"View More": "View Less "}</button>:""}
                    {/* {featur_content?.content_detail?.length > 1700 && <input className="expand-btn" type="checkbox" />} */}
                    </artical>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <FAEImage placeholder={placeholderImage} src={getFileSrcFromPublicFolderSpcialLHR(featur_content?.image)}   />
                    <div className="complete_beauty_quality">
                      
                    </div>
                    <artical>
                    <p className="cutoff-text cuttabletext" 
                     dangerouslySetInnerHTML={{ __html: featur_content?.content_detail?.length >1200? featur_content?.content_detail.substr(0, viewText)+(viewText==1200?"...":""):featur_content?.content_detail }} />
                      {window.screen.width < 800 ? featur_content.content_detail.length < 1200?"": <button className="read-more-btn" onClick={()=>setViewText(viewText==1200?1500000:1200)} >{viewText==1200?"View More": "View Less"}</button>:""}
                  </artical>
                </div>
              </div>
            </div>
          </section>}
      
        {/* <!-- course information   --> */} 
        <div className="p-0 col-md-12 sec_pc">
        {(course_information?.length !==0 && course_information?.length !==undefined && course_information?.find((citile)=>citile?.course_info_detail.length >0)) &&
              <section id="you-talk-with" style={{backgroundImage:`url(${getFileSrcFromPublicFolderOther(window.screen.width>900?"remote-learning-back-to-school-girl-student-study-min.png":"remote-learning-back-to-school-girl-student-study-mobile.png")}`}} className="mb-4 you-talk-with" >
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 col-sm-12">
                          <h2 className="home-head-title">Course Information</h2>
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
                                <button className={`tablinks ${index==0 && "active-tab"}`} onClick={(e)=>sectionCatHandler(e, replaceSpaces(ciTitle?.course_info_title, "_"))}><div dangerouslySetInnerHTML={{ __html:ciTitle?.course_info_title}} /></button> 
                              </li>)})} 
                        </ul>
                      </div>  
                      <div className="tabs col-md-9" >
                      {course_information?.map((ciTitle, index)=>{ 
                        return ( 
                          <div key={index} style={ {display: index ==0 && "block"}} id={replaceSpaces(ciTitle?.course_info_title, "_")} className="tabcontent"   > 
                              <p> { ciTitle?.course_info_detail ==="" ? <h4 style={{padding:6, textAlign:"center"}}>Content Not Found</h4>: <div dangerouslySetInnerHTML={{ __html: ciTitle?.course_info_detail }} /> }</p>
                          </div>)})
                        } 
                      </div> 
                    </div> 
                </div>  
            </section> }
        </div>

        {/* for mobile  */}
        <div className="py-4 my-5 col-md-12 background_image_walk sec_mob " style={{backgroundImage:`url(${getFileSrcFromPublicFolderOther(window.screen.width>900?"remote-learning-back-to-school-girl-student-study-min.png":"remote-learning-back-to-school-girl-student-study-mobile.png")}`}}>
          <p className="mb-0 font_mob_sec">Course Information</p>
            <p className="font_para_mob">In this course, you’ll learn a variety of new skills that will help launch you into a rewarding career. Have a look at the course information to get an idea of what we’ll cover:</p>
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
                            <div className="p-0 text-left col-md-10 col-10 fw-bold">
                              {obj.course_info_title}
                            </div>
                            <div className="p-0 text-right col-md-2 col-2">
                              <i className="fas fa-angle-down"></i>
                            </div>
                        </div>
                      </button>
                        <Collapse className="fae-mob-course-info-desc" in={open==index+10 ? open :false}>
                        <div id="example-collapse-text" dangerouslySetInnerHTML={{ __html:obj?.course_info_detail}} /> 
                        </Collapse>
                      </>)
                      })}
                      </div>
                </div>
    

        {/*  your talk with for pc  */}
      
        <section id="your-talk">
          <div className="custom-container-overlay sec_pc ">
            <div className="custom-container ">
              <h2>You'll walk away with </h2>
              <div className="col-md-12 ">
                <ul>
                  {instruction_content?.map((instruction_content, index)=>{
                    return (
                      <li key={index}> 
                        <div className="tick-icon"> 
                            <span><img  src={getFileSrcFromPublicFolderSpcialLHR("tick.svg")} height={20} width={20} alt='tick icon' /></span>
                        </div> 
                        <div>
                            <div className="you-talk-btn">{instruction_content?.title}</div>
                            <div className="you-talk-remaining-text" dangerouslySetInnerHTML={{ __html: instruction_content?.content_detail }} />
                        </div>
                      </li> )})
                    } 
                </ul>
              </div> 
            </div>
          </div>
        </section> 
      {/*  your talk with for mobile  */}
      <div className="col-md-12 background_image_walk" style={{backgroundImage:`url(${getFileSrcFromPublicFolderOther(window.screen.width>900?"":"remote-learning-back-to-school-girl-student-study-mobile.png")}`}}>
        <div className="py-4 col-md-12 sec_mob">
            <h2 className="mob_coll">You'll walk away with </h2>
                {instruction_content?.map((instruction_content, index)=>{
                  return (
                    <>
                      <button
                        onClick={() => setWalkWIthopen(index+1)}
                        aria-controls="example-collapse-text"
                        aria-expanded={walkWIthopen}
                        className="mt-3 text-center btn btn-light btn_custom w-100" >
                        <div className="row">
                            <div className="p-0 col-md-12 col-12">
                              {instruction_content?.title}
                            </div>
                            <div className="p-0 text-center col-md-12 col-12">
                              <span className="custom_oicon"><i className="fas fa-angle-down"></i></span> 
                            </div>
                        </div>
                          
                        <Collapse in={walkWIthopen==index+1 ? walkWIthopen :false}>
                          <div id="example-collapse-text" dangerouslySetInnerHTML={{ __html: instruction_content?.content_detail }} />
                        </Collapse> 
                      </button>
                      </>
                      )})}
          
              </div>
        </div>
        
        {/* // <!-- what next  --> */}
          <div className="container-fluid content-feature-courses content-feature-courses-update">
            <div className="row">
                <div className="headerContainer">
                    <h2>What’s Next </h2>
                </div>
                <div className="coursesContainer"> 
                    <WhatNextCard what_next={what_next}/>
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
                        <p className="description">We'll ensure that you reach a high standard of education and are competent in your chosen subject of study so you can move straight into the job industry. Enrol Today!</p> 
                    </div> 
                  </div>
                <div className="col-md-2"> </div>
                <div className="col-md-3">
                    <div className="bookingContainer">
                        <button type="button" className="btn btn-default" style={{background: "#D9BD3E",color:"#fff", borderRadius: "5px",top: "35px",bottom: 0,position: "relative", fontSize: "22px", fontWeight: 400, textDecoration: "none"}} onClick={bookingHandler} >View Dates & Book</button>
                    </div>
                </div>
            </div>
          </div>  
        </>}
    {/* // <!-- footer sticky icons on mobile  --> */}
    <div className="contact-source">
      <div className="contact-btns">
        <button type="button" className="btn btn-default" ><a href="mailto:team@chelsford.com" ><img  src={getFileSrcFromPublicFolderSpcialLHR("chat.png")} alt="call us" /></a></button>
        <button type="button" className="btn btn-default " onClick={bookingHandler} >View Dates & Book</button>
        <button type="button" className="btn btn-default" ><a  href="tel:0800 955 0054" ><img  src={getFileSrcFromPublicFolderSpcialLHR("phone-icon.png")} alt="chat us" /></a></button>
      </div>
      </div> 
     </div>
      )} 
   </>
  )
};

const mapStateToProps = ({
  serviceContentPageReducer: {
    error,
    loading,  
    serviceDescription   
  },
  defaultReducer: {  userId },
}) => ({
  error,
  loading, 
  serviceDescription, 
  userId, 
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
