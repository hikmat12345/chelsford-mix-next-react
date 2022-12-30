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
        {/* <div className="fae--contact-us-page-wrapper  dpt dpb">
          <div className="fae--contact-us-page-helping-buttons">
            <a
              href={`tel:${phoneNumber}`}
              className="fae--contact-us-page-helping-button"
            >
              <img width="auto" height="auto" src={callIcon} alt="call_icon" />
              <FAEText>Call Us</FAEText>
            </a>
            <a
              href="mailto:contact@expert.one"
              className="fae--contact-us-page-helping-button"
            >
              <img width="auto" height="auto" src={mailIcon} alt="mail_icon" />
              <FAEText>Email</FAEText>
            </a>
            <Link
              to={"/chat-page"}
              className="fae--contact-us-page-helping-button"
            >
              <img
                width="auto"
                height="auto"
                src={messageIcon}
                alt="message_icon"
              />
              <FAEText>Message</FAEText>
            </Link>
          </div>
          <div className="fae--contact-us-page-address-info">
            <FAEText subHeading>
              Get In <span className="red-text">Touch!</span>
            </FAEText>
           </div>
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
            </form>
          )}
        </div> */}
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
