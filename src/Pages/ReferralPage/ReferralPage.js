//libs
import {
  FAEContainer,
  FAEText,
  FAEButton,
  FAETextField,
  FAEDialogueBox,
//  FAEPhoneInput,
  FAEShadowBox,
  FAELoading,
} from "@findanexpert-fae/components";
import FAEPhoneInput from "../../Temps/FAEPhoneInput/FAEPhoneInput";
import React, { useState, useEffect, Children } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  EmailShareButton,
  TwitterIcon,
  EmailIcon,
} from "react-share";

//src
import {
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
  validateInput,
} from "../../utils";
import {
  getReferralDetails,
  getReferralList,
  sendReferral,
} from "../../redux/actions/referralPageActions";
import history from "../../history";

//scss
import "./ReferralPage.scss";

const refferalImage = getFileSrcFromPublicFolder("referral_image.png");
const refferalImage2 = getFileSrcFromPublicFolder("referral_image_2.png");
const refferalImage3 = getFileSrcFromPublicFolder("referral_image_3.png");
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const ReferralPage = ({
  userCountry,
  sendReferral,
  referralSentResponse,
  loading,
  error,
  sentReferralList = [],
  getReferralList,
  referralBonusDetails,
  getReferralDetails,
}) => {
  const userId = getCookies("userId");
  const isProfileCompleted =
    getCookies("customer_details") !== undefined &&
    getCookies("customer_details").isProfileCompleted;
  document.title = `Chelsford | Refer A Friend`;
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [pageNumber] = useState(1);
  const [name, setName] = useState("");

  useEffect(() => {
    if (userCountry !== "") {
      getReferralList({ userId, pageNumber, pageSize: 100 });
      getReferralDetails({ userCountry, userId });
    }
  }, [getReferralDetails, getReferralList, pageNumber, userCountry, userId]);

  useEffect(() => {
    if (!objectIsEmpty(referralSentResponse)) {
      const { message } = referralSentResponse;
      setOpen(true);
      setContent(message);
      getReferralList({ userId, pageNumber, pageSize: 100 });
    }
  }, [getReferralList, pageNumber, referralSentResponse, userCountry, userId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return email === "" && phone === ""
      ? alert("Email or Phone is required.")
      : validateInput("^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z]*)*$", name)
      ? sendReferral({ userId, email, userCountry, phone, name })
      : alert("Name Can not have special characters and numbers!");
  };

  const {
    currency_symbol,
    referralbonus,
    referral_message,
    bottomsectionheading,
    bottomsectiontext,
    middlesectionheading,
    middlesectiontext,
  } = referralBonusDetails;

  return (
    <>
      <FAEContainer style={{ flexDirection: "column" }}>
        <div
          style={{
            backgroundImage:
              "url(/assets/images/referral_background_image.png)",
          }}
          className="fae--referral-page-offer-container">
          <div className="referral-page-bonus-text-container">
            
            <FAEText primary heading bold>
            <FAEText bold heading primary>
                {currency_symbol}
                {referralbonus}
              </FAEText>
              <FAEText primary>
                for you and <FAEText primary>for your friend</FAEText>
              </FAEText>
            </FAEText><div className="referral-page-bonus-text-wrapper">
              
            </div>
          </div>
          <img
            src={refferalImage}
            className="referral-page-image"
            width="auto"
            height="auto"
            alt="refferal_image"
          />
        </div>
        <div className="fae--referral-page-mail-container dpb dpt">
          <div className="referral-page-details-container">
            <div className="referral-page-details-wrapper">
              <FAEText heading bold>
                REFER A FRIEND
              </FAEText>
              <FAEText tertiary>{referral_message}</FAEText>
              <br/>
              <FAEText tertiary className="refferal-bouns-text-announcement">There's no limit, the more Referrals the more you Earn.</FAEText>
            </div>
            <img
              src={refferalImage2}
              width="auto"
              height="auto"
              alt="referral_image_2"
            />
          </div>
          <FAEText bold subHeading>
            <span className="red-text">So Get Referring</span>
          </FAEText>
          <form
            onSubmit={handleSubmit}
            className="fae--referral-page-email-field"
          >
            <FAETextField
              type="text"
              placeholder="Receiver Name"
              getValue={(value) => {
                setName(value);
              }}
              primary
              shadowBoxProps={{
                primary: true,
              }}
              error={(value) =>
                value !== "" &&
                !validateInput(
                  "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                  value
                )
              }
              errorMessage={"Can not have special characters and numbers!"}
              value={name}
              required
            />
            <div className="referral-page-mbile-and-email-field">
              <FAETextField
                type="email"
                placeholder="Email Address"
                primary
                shadowBoxProps={{
                  primary: true,
                }}
                getValue={(value) => {
                 // setPhone("");
                  setEmail(value);
                }}
                value={email}
              />
              <FAEText className="fae-or-text" style={{ margin: "0 10px" }}>Or</FAEText>
              <FAEPhoneInput
                primary
                getValue={(value) => {
                 // setEmail("");
                  setPhone(value);
                }}
                shadowBoxProps={{
                  primary: true,
                }}
                countryCode={userCountry}
                value={phone}
              />
            </div>
            <FAEButton className="fae--referral-page-invite-button">
              {loading ? "Please Wait..." : "Invite Friend"}
            </FAEButton>
          </form>
          <div
            style={{ display: "none" }}
            className="fae--referral-page-social-links"
          >
            <FacebookShareButton
              url={"https://www.findanexpert.net"}
              quote={
                "Expert provides thousands of different services bookable via one app. It allows you to book almost any service you can think of, from doctors to beauticians and tradesmen."
              }
              hashtag="#ExpertApp"
            >
              <FacebookIcon size={36} round />
            </FacebookShareButton>
            <WhatsappShareButton
              url={"https://www.findanexpert.net"}
              title={"Expert | AnyService, AnyTime, AnyWhere"}
            >
              <WhatsappIcon size={36} round />
            </WhatsappShareButton>
            <TwitterShareButton
              url={"https://www.findanexpert.net"}
              title={"Expert | AnyService, AnyTime, AnyWhere"}
              via={"expertappuk"}
              hashtags={["expertapp", "bookanyservice"]}
            >
              <TwitterIcon size={36} round />
            </TwitterShareButton>
            <EmailShareButton
              url={"https://www.findanexpert.net"}
              subject={"Expert App"}
              body={
                "Expert provides thousands of different services bookable via one app. It allows you to book almost any service you can think of, from doctors to beauticians and tradesmen.\n Expert has the most qualified and experienced staff members for every profession under its belt. Most services can be performed from your home, workplace or online.\n The others can be carried out in our state-of-the-art centres across London. The services operate from 7am until 7pm for your convenience. For value-for-money fixed rates and unbeatable customer service, choose Expert.\n"
              }
            >
              <EmailIcon size={36} round />
            </EmailShareButton>
          </div>
          { sentReferralList?.length !==0 && 
           <FAEShadowBox className="referral-page-list-box" primary padding>
              
                <div className="referral-page-referral-list-main-container">
                  <FAEText secondary>Referral</FAEText>
                  <FAEText secondary>Status</FAEText>
                </div>
              
            <div className="referral-page-list-wrapper">
              {loading ? (
                <FAELoading
                  loaderImage={loaderImage}
                  type="svg"
                  height="200px"
                />
              ) : (
                Children.toArray(
                  sentReferralList.map((receiver) => {
                    const { receiveremail, receivermobile, isreferralused } =
                      receiver;
                    return (
                      <div className="referral-page-list-items">
                        <FAEText tertiary>
                          {receiveremail !== "" && receiveremail !== null
                            ? receiveremail
                            : receivermobile}
                        </FAEText>
                        <FAEText
                          tertiary={!isreferralused}
                          secondary={isreferralused}
                        >
                          {!isreferralused
                            ? "Pending"
                            : `${currency_symbol}${referralbonus} Claimed`}
                        </FAEText>
                      </div>
                    );
                  })
                )
              )}
            </div>
           </FAEShadowBox>
          }
        </div>
        <div className="referral-page-bonus-explanation dpt dpb">
          <div className="referral-page-details-container">
            <div className="referral-page-details-wrapper">
              <FAEText bold heading>
                {middlesectionheading}
              </FAEText>
              <FAEText tertiary>{middlesectiontext}</FAEText>
            </div>
            <img
              src={refferalImage3}
              width="auto"
              height="auto"
              alt="referral_image_3"
            />
          </div>
          <div className="referral-page-terms-and-conditions">
            <FAEText bold className="red-text">
              {bottomsectionheading}
            </FAEText>
            <FAEText tertiary>{bottomsectiontext}</FAEText>
          </div>
        </div>
      </FAEContainer>
      <FAEDialogueBox
        title="Referral"
        open={!isProfileCompleted}
        content="Please complete your profile to move further."
        buttons={[
          {
            label: "Ok",
            onClick: () =>
              history.push({
                pathname: "/profile/edit",
                state: { next: history.location.pathname },
              }),
          },
        ]}
      />
      <FAEDialogueBox
        title="Referral"
        open={open}
        content={content}
        buttons={[
          {
            label: "Ok",
            onClick: () => {
              setOpen(false);
            },
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  referralPageReducer: {
    loading,
    error,
    sentReferralList,
    referralSentResponse,
    referralBonusDetails,
  },
  defaultReducer: { userCountry },
}) => ({
  userCountry,
  loading,
  error,
  sentReferralList,
  referralSentResponse,
  referralBonusDetails,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { sendReferral, getReferralList, getReferralDetails },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferralPage);
