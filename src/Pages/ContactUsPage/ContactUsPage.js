//libs
import {
  FAEText,
  FAEButton,
  FAEDialogueBox,
  FAELoading,
  FAETextField,
} from "@findanexpert-fae/components";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";

//src
import {
  makeSendMessageFalse,
  sendMessage,
} from "../../redux/actions/contactUsPageActions";
import {
  getFileSrcFromPublicFolder,
  getUniqueData,
  validateInput,
} from "../../utils";

//scss
import "./ContactUsPage.scss";

const mailIcon = getFileSrcFromPublicFolder("mail_icon.svg");
const callIcon = getFileSrcFromPublicFolder("call_icon.svg");
const messageIcon = getFileSrcFromPublicFolder("message_icon.svg");

const ContactUsPage = ({
  userCountry,
  messageSent,
  loading,
  error,
  sendMessage,
  makeSendMessageFalse,
}) => {
  document.title = "Expert | Contact Us";
  const phoneNumber = userCountry === "PK" ? "0518900207" : "+442070997738";
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [subject, setSubject] = useState("");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [errorFields, setErrorFields] = useState([]);
  useEffect(() => {
    if (messageSent) {
      setOpen(true);
      setContent("Message Sent");
    }
  }, [messageSent]);
  const handleSubmit = (e) => {
    e.preventDefault();
    errorFields.some((e) => e.error === true)
      ? alert(errorFields.find((e) => e.error === true).message)
      : sendMessage({ subject, email, customerName, message });
  };

  return (
    <>
      <div className="">
        <div className="destop-banner">
          <div className="image-container">
           <img src="https://chelsford.com/public/chelsforImages/contact-banner.webp" width="100%" className="img-fluid" alt="Responsive image" />
          </div>
      </div>

    <div className="mobile-banner">
        <div className="image-container">
            <img src="https://chelsford.com/public/chelsforImages/contact-banner-mob.webp" width="100%" className="img-fluid" alt="Responsive image" />
        </div>
    </div>

<div className="container contact-form-section">
    <div className="row">
        <div className="formContainer">
            <div className="contentContainer">
                <p>Leader in Aesthetics Education</p>
                <h2>Get In Touch</h2>
                <p>We are looking forward to hearing from you. If you have any questions, comments or suggestions, send in your details, and our careers advisor will contact you immediately.
                </p>
            </div>
            <div className="formbox">
              {loading && (
              <FAELoading
                loaderImage={getFileSrcFromPublicFolder("loader.webm")}
                type="video"
                height="300px"
              />
            )}
          {!loading && (
            <form onSubmit={handleSubmit} className="fae--contact-us-page-form">
              <FAETextField
                placeholder="Your Name"
                type="text"
                primary
                shadowBoxProps={{ primary: true }}
                getValue={(value) => {
                  setCustomerName(value);
                  setErrorFields(
                    getUniqueData(
                      [
                        {
                          id: 1,
                          error:
                            value === ""
                              ? false
                              : !validateInput(
                                  "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                                  value,
                                ),
                          message:
                            "Name can not have special characters and numbers!",
                        },
                        ...errorFields,
                      ],
                      "id",
                    ),
                  );
                }}
                error={(value) =>
                  value !== "" &&
                  !validateInput(
                    "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                    value,
                  )
                }
                errorMessage={"Can not have special characters and numbers!"}
              />
              <FAETextField
                placeholder="Your Email"
                type="email"
                primary
                shadowBoxProps={{ primary: true }}
                required
                getValue={setEmail}
              />
              <FAETextField
                placeholder="Your Subject"
                type="text"
                primary
                shadowBoxProps={{ primary: true }}
                required
                getValue={(value) => {
                  setSubject(value);
                  setErrorFields(
                    getUniqueData(
                      [
                        {
                          id: 2,
                          error:
                            value === ""
                              ? false
                              : !validateInput(
                                  "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$",
                                  value,
                                ),
                          message: "Subject can not have special characters!",
                        },
                        ...errorFields,
                      ],
                      "id",
                    ),
                  );
                }}
                error={(value) =>
                  value !== "" &&
                  !validateInput(
                    "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$",
                    value,
                  )
                }
                errorMessage={"Can not have special characters!"}
              />
              <FAETextField
                placeholder="Your Message..."
                type="text"
                primary
                shadowBoxProps={{ primary: true }}
                required
                getValue={(value) => {
                  setMessage(value);
                  setErrorFields(
                    getUniqueData(
                      [
                        {
                          id: 3,
                          error:
                            value === ""
                              ? false
                              : !validateInput(
                                  "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$",
                                  value,
                                ),
                          message: "Message can not have special characters!",
                        },
                        ...errorFields,
                      ],
                      "id",
                    ),
                  );
                }}
                error={(value) =>
                  value !== "" &&
                  !validateInput(
                    "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$",
                    value,
                  )
                }
                errorMessage={"Can not have special characters!"}
              />
              <FAEButton className="fae--contact-us-page-form-button">
                SEND MESSAGE
              </FAEButton>
            </form>)}
            </div>
          <div id="response" style={{width:"100%"}}></div>
            </div>
            <div className="imageContainer">
                <img src="https://chelsford.com/public/chelsforImages/Contact-us-inner.webp" alt=""  />
            </div>
          </div>
      </div>
      </div>
      <FAEDialogueBox
        open={open}
        content={content}
        buttons={[
          {
            label: "Ok",
            onClick: () => {
              setOpen(false);
              makeSendMessageFalse();
            },
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  contactUsPageReducer: { messageSent, loading, error },
  defaultReducer: { userCountry },
}) => ({
  userCountry,
  messageSent,
  loading,
  error,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      sendMessage,
      makeSendMessageFalse,
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUsPage);




// import React from 'react'; 
// import { FaFacebookF, FaPhone, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
// import { MdEmail, MdLocationOn } from 'react-icons/md'; 
// import { useState } from 'react';  

// const url = "https://newadminapi-preprod.findanexpert.net/api/Users/contactus"
  
// function ContactUsPage(props) {

//   const [formData, setFormData] = useState({
//     body : "",
//     customerEmail : "",
//     customerName : "",
//     subject : ""
//   })

//   const handlerNameChange = (e) => {setFormData({...formData, customerName: e.target.value})}
//   const handlerEmailChange = (e) => {setFormData({...formData, customerEmail: e.target.value})}
//   const handlerSubjectChange = (e) => {setFormData({...formData, subject: e.target.value})}
//   const handlerBodyChange = (e) => {setFormData({...formData, body: e.target.value})}

//   console.log("handle change==", formData)

//   // const submitHandler = (e) => {
//   //   e.preventDefault()
//   //    postRequest('/Users/contactus', formData).then((response => {
//   //     if(response.data.error){
//   //       alert(response.data.message)
//   //     }
//   //     else alert("Successfully submitted")
//   //     console.log("post response===>", response)
//   //    }))
//   //    setFormData({
//   //     body : "",
//   //     customerEmail : "",
//   //     customerName : "",
//   //     subject : ""})
//   // }
 
//   return (
//     <>
//       {/* <Header /> */}
//       <div
//        className="contactUs__container"
//        >
//         <div className="">
//           <img
//             src="https://chelsford.com/public/chelsforImages/contact-banner.webp"
//             className="banner__sec"
//           />
//         </div>
//         <div className="w-full">
//           <div className="m-3 md:m-10">
//             <div className="flex justify-evenly flex-col md:flex-row">
//               <div className="w-full md:w-5/12">
//                 <div className="w-full">
//                   <p className="">Leader in Aesthetics Education</p>
//                   <h2>Get In Touch</h2>
//                   <p className="mb-3">
//                     We are looking forward to hearing from you. If you have any
//                     questions, comments or suggestions, send in your details, and our
//                     careers advisor will contact you immediately.
//                   </p>
//                 </div>
//                 <div className="">
//                   <form method='post'
//                     id="frm-add-contact"
//                     className="contactForm"
//                     // action="/Users/contactus"
//                     // onSubmit={submitHandler}
//                   >
//                     <input
//                       type="text"
//                       value= {formData.customerName}
//                       name="name"
//                       id="name"
//                       // defaultValue=""
//                       onChange= {handlerNameChange}
//                       required
//                       // className="form-control contactFormInput"
//                       className="contactFormInput"
//                       placeholder="Your Name"
//                     />
//                     <input
//                       type="email"
//                       value= {formData.customerEmail}
//                       name="email"
//                       id="email"
//                       // defaultValue=""
//                       onChange= {handlerEmailChange}
//                       required
//                       className="contactFormInput"
//                       placeholder="Your Email"
//                     />
//                     <input
//                       type="text"
//                       value= {formData.subject}
//                       name="subject"
//                       id="subject"
//                       // defaultValue=""
//                       onChange= {handlerSubjectChange}
//                       className="contactFormInput"
//                       placeholder="Your Subject"
//                       required
//                     />
//                     <textarea
//                       className="contactFormArea"
//                       name="message"
//                       value= {formData.body}
//                       rows={5}
//                       id="massage"
//                       required
//                       cols={30}
//                       onChange= {handlerBodyChange}
//                       placeholder="Your Message"
//                       // defaultValue={""}
//                     />
//                     {/* <input
//                       type="submit"
//                       defaultValue="Submit"
//                       name="contact_form"
//                       className="bg-[#D9BD3E] text-white rounded-lg py-2 float-right w-full md:w-1/5 mb-3 md:mb-0"
//                     /> */}
//                     <button
//                     //  onClick={e => submitHandler()}
//                     type="submit" className="bg-[#D9BD3E] text-white rounded-lg py-2 float-right w-full md:w-1/5 mb-3 md:mb-0">Submit</button>
//                   </form>
//                 </div>
//                 {/* <div id="response" style={{ width: "100%" }} /> */}
//               </div>
//               <div className="">
//                 <img
//                   src="https://chelsford.com/public/chelsforImages/Contact-us-inner.webp"
//                   alt=""
//                   srcSet=""
//                 />
//               </div>
//             </div>
//           </div>
//         </div>


//         {/**************************** * contact-feature ************************/}

//         <div className="flex flex-col bg-[#F3F7FF] justify-center p-3">
//           <div className="m-2 md:m-10">
//             <div className="flex flex-col justify-center text-center">
//               <h2>Speak to us</h2>
//               <p>Our knowledgeable careers advisors is available to answer your questions and give you peace of mind knowing we've got your back. Following are the ways to contact us with your questions or concerns. So don't wait, let's talk about your future goals.</p>
//             </div>
//             <div className="flex flex-col md:flex-row mt-3">
//               <div className="flex flex-col bg-[#1F105A] justify-center rounded-l-lg w-full md:w-1/4 text-center h-60">
//                 <h3 className="text-white">Let's Go Social</h3>
//                 <p className="text-white">Follow us on social media</p>
//                 <div className="">
//                   <ul className='flex space-x-5 justify-center mr-10'>
//                     <li>
//                       <a href="https://www.facebook.com/liatraininguk/" target="_blank"><FaFacebookF color='white' /></a>
//                     </li>
//                     <li>
//                       <a href="https://twitter.com/LaserTrainingUK" target="_blank"><FaTwitter color='white' /></a>
//                     </li>
//                     <li>
//                       <a href="https://instagram.com/chelsfordinstitute" target="_blank"><FaInstagram color='white' /></a>
//                     </li>
//                     <li>
//                       <a href="https://www.youtube.com/channel/UCLOQkMw8kYSIZu8HcePE79w" target="_blank"><FaYoutube color='white' /></a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               <div className="bg-[#eceff4] items-center p-10 w-100 md:w-1/4 text-center">
//                 <div className="flex justify-center pb-3">
//                   <div className="iconContainer">
//                     <FaPhone color='white' size={26} />
//                   </div>
//                 </div>
//                 <p>Phone:</p>
//                 <h3>0800 955 0054</h3>
//               </div>
//               <div className="bg-[#E7EDFC] p-10 w-100 md:w-1/4 text-center">
//                 <div className="flex justify-center pb-3">
//                   <div className="iconContainer">
//                     <MdEmail color='white' size={28} />
//                   </div>
//                 </div>
//                 <p>Email</p>
//                 <h3>team@chelsford.com</h3>
//               </div>
//               <div className="bg-[#DFE7FB] p-10 rounded-r-lg w-100 md:w-1/4 text-center">
//                 <div className="flex justify-center pb-3">
//                   <div className="iconContainer">
//                     <MdLocationOn color='white' size={30} />
//                   </div>
//                 </div>
//                 <p>Address:</p>
//                 <h3 className="text-2xl">31-32 Eastcastle Street
//                   London
//                   W1W 8DL</h3>
//               </div>
//             </div>
//           </div>
//         </div>



//         <div className="flex justify-center p-3 bg-[#E7EDFC]">
//            <div class="flex flex-col md:flex-row justify-center w-full md:w-11/12 px-2">
//             <div class="flex flex-col mx-2 w-100 md:w-70">
//               <h2>Get Qualified and Start Today</h2>
//               <p class="description">We'll ensure that you reach a high standard of education and are competent in your chosen subject of study so you can move straight into the job industry. Enrol Today!</p>
//             </div>
//             <div class="flex flex-col w-30 pt-4">
//               <a href="#" className="bg-[#D9BD3E] py-3 px-5 rounded text-white text-center"> Date/Book</a>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Footer /> */}
//     </>
//   );
// }

// export default ContactUsPage;
