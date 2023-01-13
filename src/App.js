//libs
import React, { Suspense, useEffect, lazy, useState } from "react";
import { Router, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import {
  FAEFooter,
//  FAENavbar,
  FAEGuardedRoute,
  FAELoading,
  FAEText,
} from "@findanexpert-fae/components";
import CookieConsent from "react-cookie-consent";

//src
import {
  navBarData,
  footerData,
  navBarDropDownInfo,
  mobileMenu,
  signedInMobileMenu,
  navBarDropDownInfoLogedIn,
} from "./StaticDataForLandingPage";
import {
  getCookies,
  getFileSrcFromPublicFolder,
  removeCookies,
  replaceSpaces,
  setCookies,
  validateInput,
} from "./utils";
import {
  getNotificationsList,
  getUserLocation,
  getUserLocationId,
  setUserId,
} from "./redux/actions/defaultActions";
import history from "./history";
import { notificationsParser, searchServicesParser } from "./parsers";
import { getSearchResults } from "./redux/actions/homePageActions";
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
//scss
import "./App.scss";
// redux and messages comp 
import ConsentFormPage from "./Pages/ConsentFormPage";
import { SocketService } from "./helpers/socketservice";
import { customerChatActions } from "./redux/reducers/customerChatReducer";
import { getAllConversations } from "./Pages/ChatPage/SendMessage";
import { changeULocId } from "./redux/actions/changeCountryLocId";
import { getProfileFields } from "./redux/actions/editProfilePageActions";
import { FAENavbar } from "./Temps/Navbar/FAENavbar/FAENavbar";
import { signOutDeleteAccount } from "./redux/actions/signInPageActions"; 
import { FAEDialogueBox } from "@findanexpert-fae/components/dist/stories/FAEDialogueBox/FAEDialogueBox"; 
import Footer from "./components/Footer/Footer";
import Header from "./components/header/Header";
const CreatePasswordPage = lazy(() => import( "./Pages/CreatePasswordPage"));
const   VoucherHistoryPage  = lazy(()=> import( "./Pages/VoucherHistoryPage"));
const AddPaymentPage = lazy(()=> import("./Pages/AddPaymentPage"));
const PaymentSuccessPage =lazy(()=> import("./Pages/PaymentSuccessPage/PaymentSuccessPage"));
const  PaymentSelection =lazy(()=> import("./Pages/PaymentMethodSelectionPage/PaymentMethodSelectionPage"));
const  PaymentInvoice = lazy(()=> import("./Pages/PaymentInvoice/PaymentInvoice")); 
//components-importing
const LandingPage = lazy(() => import("./Pages/LandingPage"));
const SubIndustriesPage = lazy(() => import("./Pages/SubIndustriesPage"));
const ServicesPage = lazy(() => import("./Pages/ServicesPage"));
const ServiceContentPage = lazy(() => import("./Pages/ServiceContentPage"));
const SubServicesPage = lazy(() => import("./Pages/SubServicesPage"));
const ServiceLocationPage = lazy(() => import("./Pages/ServiceLocationPage"));
const AddressSelectionPage = lazy(() => import("./Pages/AddressSelectionPage"));
const SummaryPage = lazy(() => import("./Pages/SummaryPage"));
const DateTimeSelectionPage = lazy(() => import("./Pages/DateTimeSelectionPage"));
const ServiceAttributesPage = lazy(() => import("./Pages/ServiceAttributesPage"));
const SignUpPage = lazy(() => import("./Pages/SignUpPage"));
const CodeVerificationPage = lazy(() => import("./Pages/CodeVerificationPage"));
const SignInPage = lazy(() => import("./Pages/SignInPage"));
const UserInfoPageLayout = lazy(() => import("./Pages/UserInfoPageLayout"));
const AddPaymentCardPage = lazy(() => import("./Pages/AddPaymentCardPage"));
const AddAddressPage = lazy(() => import("./Pages/AddAddressPage"));
const ChangeCountry = lazy(() => import("./Pages/VCountry"));
const ProductListPage = lazy(() => import("./Pages/ProductListPage"));
const ProductCartList = lazy(() => import("./Pages/ProductCartList"));
const ProductCustomizeAttr = lazy(() => import("./Pages/ProductCustomizeAttr"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const OffersPage = lazy(() => import("./Pages/OffersPage"));
const BookingsPage = lazy(() => import("./Pages/BookingsPage"));
const AllAddressesPage = lazy(() => import("./Pages/AllAddressesPage"));
const AddressSelectionBStatusPage = lazy(() => import("./Pages/AddressSelectionBStatusPage"));
const EmailsPage = lazy(() => import("./Pages/EmailsPage"));
const PaymentDetailsPage = lazy(() => import("./Pages/PaymentDetailsPage"));
const ReferralPage = lazy(() => import("./Pages/ReferralPage"));
const ContactUsPage = lazy(() => import("./Pages/ContactUsPage"));
const BookingDetailPage = lazy(() => import("./Pages/BookingDetailPage"));
const BookingEditPage = lazy(() => import("./Pages/BookingEditPage"));
const EditProfilePage = lazy(() => import("./Pages/EditProfilePage"));
const PrivacyPolicyPage = lazy(() => import("./Pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(() => import("./Pages/TermsAndConditionsPage"));
const CookiesPolicyPage = lazy(() => import("./Pages/CookiesPolicyPage"));
const AboutUsPage = lazy(() => import("./Pages/AboutUsPage"));
const ConsentPage = lazy(() => import("./Pages/ConsentPage"));
const HelpPage = lazy(() => import("./Pages/HelpPage")); 
const VouchersPage = lazy(() => import("./Pages/VouchersPage"));
const ForgotPasswordPage = lazy(() => import("./Pages/ForgotPasswordPage"));
const ThankYouPage = lazy(() => import("./Pages/ThankYouPage"));
const NotFound = lazy(() => import("./Pages/NotFound"));
const SessionSelectionPage = lazy(() => import("./Pages/SessionSelectionPage"));
const TrainingSelectionPage = lazy(() => import("./Pages/TrainingSelectionPage"));
const DateTimeSelectionForClinics = lazy(() => import("./Pages/DateTimeSelectionForClinics"));
const ChatPage = lazy(() => import("./Pages/ChatPage"));
const CustomerChatPage = lazy(() => import("./Pages/ChatPage/CustomerChatPage"));
const GiftVouchersDetailPage = lazy(() => import("./Pages/GiftVouchersDetailPage/GiftVouchersDetailPage"));
const GiftVouchersPage  = lazy(() => import("./Pages/GiftVouchersPage"));
const ServicesVouchersPage = lazy(() => import("./Pages/ServicesVouchersPage"));
const ServicesVouchersDetailPage = lazy(() => import("./Pages/ServicesVouchersDetailPage")); 
const SummSecureThreeD = lazy(() => import("./Pages/SummSecureThreeD")); 
 
const ThreedsStatus =lazy(()=>import("./Webviews/ThreedsStatusWebviewAndroid"));
const ThreedsStatusPageIOS= lazy(()=>import("./Webviews/ThreedsStatusWebviewIOS"));
const specialLHRPage= lazy(()=>import("./Pages/SpecialLaserHRPage"));
const authRedirectPath = "/account";
const userAlreadyLoggedInRedirect = "/";
const signUp= lazy(()=>import ("./Pages/SIgnUpNewPage"))
const App = ({
  getUserLocation,
  userCountry,
  getUserLocationId,
  userId,
  setUserId,
  notificationsList,
  getNotificationsList,
  getSearchResults,
  searchResults,
  userCountryId,
  changeULocId, 
  signOutDeleteAccount
}) => {
 
  const socialLinks = [
    {
      icon: (
        <img
          src={getFileSrcFromPublicFolder("facebook_icon.svg")}
          alt="facebook_icon"
          width="80%"
          height="80%"
          className="fae--footer-social-link"
        />
      ),
      href:
        userCountry === "PK"
          ? "https://www.facebook.com/ExpertAppPak"
          : "https://www.facebook.com/ExpertAppUk",
    },
    {
      icon: (
        <img
          src={getFileSrcFromPublicFolder("twitter_icon.svg")}
          alt="twitter_icon"
          width="80%"
          height="80%"
          className="fae--footer-social-link"
        />
      ),
      href:
        userCountry === "PK"
          ? "https://twitter.com/expertpakistan"
          : "https://twitter.com/expertappuk",
    },
    {
      icon: (
        <img
          src={getFileSrcFromPublicFolder("linkedin_icon.svg")}
          alt="linkedin_icon"
          width="80%"
          height="80%"
          className="fae--footer-social-link"
        />
      ),
      href:
        userCountry === "PK"
          ? "https://www.linkedin.com/company/expertpakistan"
          : "https://www.linkedin.com/company/expertuk",
    },
    {
      icon: (
        <img
          src={getFileSrcFromPublicFolder("instagram_icon.svg")}
          alt="instagram_icon"
          width="80%"
          height="80%"
          className="fae--footer-social-link"
        />
      ),
      href:
        userCountry === "PK"
          ? "https://www.instagram.com/expertpakistan/"
          : "https://www.instagram.com/expertappuk/",
    },
    {
      icon: (
        <img
          src={getFileSrcFromPublicFolder("pinterest_icon.svg")}
          alt="pinterest_icon"
          width="80%"
          height="80%"
          className="fae--footer-social-link"
        />
      ),
      href:
        userCountry === "PK"
          ? "https://www.pinterest.co.uk/ExpertAppUK/"
          : "https://www.pinterest.co.uk/ExpertAppUK/",
    },
    {
      icon: (
        <img
          src={getFileSrcFromPublicFolder("youtube_icon.svg")}
          alt="youtube_icon"
          width="80%"
          height="80%"
          className="fae--footer-social-link"
        />
      ),
      href:
        userCountry === "PK"
          ? "https://www.youtube.com/channel/UCCr1Cv5QiiGsEztlFYG8OQw"
          : "https://www.youtube.com/channel/UCCr1Cv5QiiGsEztlFYG8OQw",
    },
  ];
  const dispatch = useDispatch();
  const [logoutState, setLogoutState]=useState(false)
  const [deleteAccountState, setDeleteState]=useState(false)
  const logOutHandle=()=>{
          
            setLogoutState(false)
            history.push("/");
            setUserId("");
            removeCookies("userId");
            removeCookies("customer_details");
            removeCookies("switched_country")
            removeCookies("switched_id",)
            removeCookies("switched_userCurrencyCode")
            removeCookies("user_country")
            signOutDeleteAccount(userId, false);
           // removeCookies("redirectUrl")
          
  }
  const deleteAccountHandle=()=>{
            setDeleteState(false)
            history.push("/");
            setUserId("");
            removeCookies("userId");
            removeCookies("customer_details");
            removeCookies("switched_country")
            removeCookies("switched_id",)
            removeCookies("switched_userCurrencyCode")
            removeCookies("user_country")
            signOutDeleteAccount(userId, true);
          // removeCookies("redirectUrl")
         
  }
  const userSignedInStatus =
    userId !== "" || getCookies("userId") !== undefined ? true : false;

  const mobileMenuList = userSignedInStatus
    ? [
        ...signedInMobileMenu,
        ...mobileMenu,
        {
          label: "Logout",
          icon:<ExitToAppIcon />,
          onClick: () => {setLogoutState(true)},
        },
        {
          label: "Delete Your Account",
          icon:<PersonAddDisabledOutlinedIcon/>,
          onClick: () => {
           setDeleteState(true)
          },
        },
      ]
    : [
        ...mobileMenu,
        { label: "Login", onClick: () => history.push("/account") },
        { label: "SignUp", onClick: () => history.push("/account") },
      ];

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  useEffect(() => {
    if (userSignedInStatus) {
      SocketService.init(dispatch);
    } 
  }, []);
  useEffect(() => {
    if (userSignedInStatus) {
      if(window.initScript) {
        window.initScript(getCookies("customer_details"));
      }
    } 
  }, []);
  useEffect(() => {
    if(getCookies("switched_country")){  
          changeULocId( getCookies("switched_id"), getCookies("switched_country"),getCookies("switched_userCurrencyCode") )
          getUserLocationId( getCookies("switched_country"));
          setCookies("user_country",  getCookies("switched_country"));
    } else if (userCountry !== "") {
          getUserLocationId(userCountry);
          setCookies("user_country", userCountry);
    }
  }, [getUserLocationId, userCountry]);

  useEffect(() => {
    if (getCookies("userId") !== undefined) {
      setUserId(getCookies("userId"));
      getNotificationsList(getCookies("userId"));
    }
  }, [getNotificationsList, setUserId]);
  const navbarDrodownInfoData =getCookies("customer_details") !== undefined ?  navBarDropDownInfoLogedIn:navBarDropDownInfo
  return (
    <>
      <Router history={history}>
        <Suspense
          fallback={
            <FAELoading
              loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
              type="svg"
            />
          }
        > 
          <FAENavbar
            userName={
              getCookies("customer_details") !== undefined
                ? getCookies("customer_details").firstName
                : "Guest"
            }
            isLogin={userSignedInStatus}
            dropDownInfo={{
              signOutClicked: () => { 
                 setLogoutState(true)
                // setUserId("");
                // removeCookies("userId");
                // removeCookies("customer_details"); 
                // removeCookies("switched_country")
                // removeCookies("switched_id",)
                // removeCookies("switched_userCurrencyCode")
                // removeCookies("user_country") 
                // signOutDeleteAccount(userId, false);
                // history.push("/");
              },
              deleteAccountClicked: () => { 
                setDeleteState(true)
                // setUserId("");
                // removeCookies("userId");
                // removeCookies("customer_details");
                // signOutDeleteAccount(userId, true);
                // history.push("/");
              },
             ...navbarDrodownInfoData
            }}
            userCountry={getCookies("switched_country") !=="" && getCookies("switched_country") !==null && getCookies("switched_country") !==undefined ? getCookies("switched_country"):userCountry}
            notificationsList={notificationsParser(notificationsList)}
            getSearchValue={(value) => {
              if (
                validateInput(
                  "^[a-zA-Z](([',. -][a-zA-Z ])?[a-zA-Z0-9]*)*$",
                  value,
                )
              ) {
                userCountryId && getSearchResults({ userCountryId, value });
              }
            }}
            searchResults={searchServicesParser(searchResults)}
            getSelectedValue={(value) =>
              history.push({
                pathname: `/services/${replaceSpaces(value, "-")}`,
              })
            }
            mobileMenu={mobileMenuList}
            expertMobileLogo={getFileSrcFromPublicFolder(
              "mobile_expert_logo.png",
            )}
            {...navBarData}
            // new in navbar 
            userProfileImage={ getCookies("customer_details")?.imagePath ==""? getFileSrcFromPublicFolder("profile-avatar.PNG"):getCookies("customer_details")?.imagePath}
            userProfileAvatarImage={getFileSrcFromPublicFolder("logo.PNG")}
            userCompleteName={
              getCookies("customer_details") !== undefined
                ? `${getCookies("customer_details")?.firstName}  ${getCookies("customer_details")?.lastName}`
                : "Guest"
            }
          />
          <Header/>
          <Switch>
            {/*Routes that don't need auth */}
            <FAEGuardedRoute
              path="/"
              component={LandingPage}
              exact
              auth={true}
            />
            {/* <FAEGuardedRoute
              path="/chat-page"
              component={ChatPage}
              exact
              auth={true}
            /> */}
            {/* <FAEGuardedRoute
              path="/customer-chat"
              component={CustomerChatPage}
              exact
              auth={true}
            /> */}
            {/* <FAEGuardedRoute
              path="/sign-up"
              component={SignUpPage}
              exact
              auth={userSignedInStatus ? false : true}
              redirectPath={userAlreadyLoggedInRedirect}
            /> */}
            <FAEGuardedRoute
              path="/account"
              component={signUp}
              exact
              auth={true}
              // auth={userSignedInStatus ? false : true}
              // redirectPath={userAlreadyLoggedInRedirect}
              />
            <FAEGuardedRoute
              path="/sign-in"
              component={SignInPage}
              exact
              auth={userSignedInStatus ? false : true}
              redirectPath={userAlreadyLoggedInRedirect}
            />
            {/* <FAEGuardedRoute
              path="/payment-invoice"
              component={PaymentInvoice}
              exact
              auth={true}
            />
            <FAEGuardedRoute
              path="/add-payment"
              component={AddPaymentPage}
              exact
              auth={true}
            />
            <FAEGuardedRoute
              path="/payment-selection"
              component={PaymentSelection}
              exact
              auth={true}
            />
            <FAEGuardedRoute
              path="/payment-success"
              component={PaymentSuccessPage}
              exact
              auth={true}
            /> */}
            {/* <FAEGuardedRoute
              path="/verify-account"
              component={CodeVerificationPage}
              exact
              auth={userSignedInStatus ? false : true}
              redirectPath={userAlreadyLoggedInRedirect}
            /> */}
            <FAEGuardedRoute
              path="/reset-password"
              component={ForgotPasswordPage}
              exact
              auth={true} 
            />
            <FAEGuardedRoute
              path="/create-password"
              component={CreatePasswordPage}
              exact
              auth={userSignedInStatus ? false : true}
              redirectPath={userAlreadyLoggedInRedirect}
            />
            <FAEGuardedRoute
              path="/:industry/sub-industries"
              component={SubIndustriesPage}
              exact
              auth={true}
            />
            <FAEGuardedRoute
              path="/:industry/services"
              component={ServicesPage}
              exact
              auth={true}
            />
            <FAEGuardedRoute
              path="/services/:service"
              component={ServiceContentPage}
              exact
              auth={true}
            />
            {/* <FAEGuardedRoute
              path="/offers"
              component={OffersPage}
              exact
              auth={true}
            /> */}
            <FAEGuardedRoute
              path="/contact-us"
              component={ContactUsPage}
              exact
              auth={true}
            />
            {/* <FAEGuardedRoute
              path="/privacy-policy"
              component={PrivacyPolicyPage}
              exact
              auth={true}
            /> */}
            <FAEGuardedRoute
              path="/paymentverification"
              component={SummSecureThreeD}
              exact
              auth={true}
            />
            {/* <FAEGuardedRoute
              path="/terms-and-conditions"
              component={TermsAndConditionsPage}
              exact
              auth={true}
            /> */}
            <FAEGuardedRoute
              path="/cookies-policy"
              component={CookiesPolicyPage}
              exact
              auth={true}
            />
            <FAEGuardedRoute
              path="/about-us"
              component={AboutUsPage}
              exact
              auth={true}
            />
            {/* <FAEGuardedRoute
              path="/special-laser-hair-removal"
              component={specialLHRPage}
              exact
              auth={true}
            />  */}
            <FAEGuardedRoute
              path="/help"
              component={HelpPage}
              exact
              auth={true}
            />

            {/* <FAEGuardedRoute
              path="/product-list:service"
              component={ProductListPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/addto-cart-list"
              component={ProductCartList}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/add-customize-prod-to-cart"
              component={ProductCustomizeAttr}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            {/*Routes that need auth */}
            {/* <FAEGuardedRoute
              path="/watchlist"
              component={UserInfoPageLayout}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/referral"
              component={ReferralPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            <FAEGuardedRoute
              path="/profile"
              component={ProfilePage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/profile/edit"
              component={EditProfilePage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/your-bookings/:jobtype"
              component={BookingsPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/your-bookings/:service/details"
              component={BookingDetailPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/your-bookings/:service/details/consent-form"
              component={ConsentFormPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/your-bookings/:service/consent"
              component={ConsentPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/your-bookings/:service/edit"
              component={BookingEditPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            {/* <FAEGuardedRoute
              path="/your-experts"
              component={UserInfoPageLayout}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            <FAEGuardedRoute
              path="/payment-details"
              component={PaymentDetailsPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/payment-details/add-card"
              component={AddPaymentCardPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            {/* <FAEGuardedRoute
              path="/your-addresses"
              component={AllAddressesPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            <FAEGuardedRoute
              path="/booking/:service/date-time-selection/select-clinic-address"
              component={AddressSelectionBStatusPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> 
            {/* <FAEGuardedRoute
              path="/your-addresses/:addressoperation"
              component={AddAddressPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            {/* <FAEGuardedRoute
              path="/your-vouchers/:vouchertype"
              component={VouchersPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            {/* <FAEGuardedRoute
              path="/your-vouchers/service-voucher"
              component={ServicesVouchersPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            {/* <FAEGuardedRoute
              path="/your-vouchers/history"
              component={VoucherHistoryPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
             <FAEGuardedRoute
              path="/your-vouchers/gift-voucher"
              component={GiftVouchersPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
             {/* <FAEGuardedRoute
              path="/your-vouchers/service-voucher-detail"
              component={ServicesVouchersDetailPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> 
            <FAEGuardedRoute
              path="/your-vouchers/gift-voucher-detail"
              component={GiftVouchersDetailPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />  */}
            <FAEGuardedRoute
              path="/switch-country"
              component={ChangeCountry}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> 
            {/* <FAEGuardedRoute
              path="/your-emails/:emailtype"
              component={EmailsPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> */}
            <FAEGuardedRoute
              path="/booking/:service/sub-services/:mainService/:voucherId/:selected_country_id"
              component={SubServicesPage}
              exact
              auth={true}
              // redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/sessions"
              component={SessionSelectionPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/location-selection"
              component={ServiceLocationPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/address-selection"
              component={AddressSelectionPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            /> 
            <FAEGuardedRoute
              path="/booking/:service/attributes"
              component={ServiceAttributesPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/date-time-selection"
              component={DateTimeSelectionPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/date-time-selection-for-clinics"
              component={DateTimeSelectionForClinics}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/training-selection"
              component={TrainingSelectionPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/booking/:service/summary"
              component={SummaryPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />
            <FAEGuardedRoute
              path="/thank-you-for-booking"
              component={ThankYouPage}
              exact
              auth={userSignedInStatus}
              redirectPath={authRedirectPath}
            />

            {/* web view  */}
            <FAEGuardedRoute
              path="/ThreedsStatus"
              component={ThreedsStatus}
              exact
              auth={true}
            />
            
            {/* <FAEGuardedRoute
              path="/three-d-s-ios"
              component={ThreedsStatusPageIOS}
              exact
              auth={true}
            /> */}
            <FAEGuardedRoute path="*" component={NotFound} exact auth={true} />
          </Switch>
          <Footer />
          {/* <FAEFooter socialLinks={socialLinks} {...footerData} /> */}
        </Suspense>
      </Router>
      {/* <CookieConsent
          location="bottom"
          buttonText="I Accept"
          cookieName="faeCookieAccepted"
          buttonStyle={{
            color: "white",
            background: "#dc0000",
            fontSize: "12px",
            borderRadius: "5px",
            margin: 0,
          }}
          expires={30}
        >
        <FAEText style={{ margin: 0 }} primary>
          We use cookies to enhance your visit to our site. By continuing to
          browse the site, you are agreeing to our{" "}
          <span
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => history.push("/cookies-policy")}  >
            use of cookies
          </span>
        </FAEText>
      </CookieConsent> */}
      <FAEDialogueBox
        // title={"dialogueBoxTitle"}
        open={logoutState}
        content={"Are you sure you want to logout?"}
        buttons={[
          {
            label: "No",
            onClick: () => setLogoutState(false),
          },
          {
            label: "Yes",
            onClick: logOutHandle,
          },
        ]}
      />   
        <FAEDialogueBox
        // title={"dialogueBoxTitle"}
        open={deleteAccountState}
        content={"Are you sure you want to delete your account?"}
        buttons={[
          {
            label: "No",
            onClick: () => setDeleteState(false),
          },
          {
            label: "Yes",
            onClick: deleteAccountHandle,
          },
        ]}
      />                                     
    </>
  );

};

const mapStateToProps = ({
  editProfilePageReducer: { loading, profileFields,},
  defaultReducer: { userCountry, userId, notificationsList, userCountryId },
  homePageReducer: { searchResults }, 
}) => ({
  loading,
  profileFields,
  userCountry,
  userId,
  notificationsList,
  searchResults,
  userCountryId,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getUserLocation,
      getUserLocationId,
      setUserId,
      getNotificationsList,
      getSearchResults,
      changeULocId,
      getProfileFields,
      signOutDeleteAccount
    },
    dispatch,
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
export const handleConversations = (dispatch) => {
  if (!getCookies("customer_details")?.id) {
    return;
  }
  getAllConversations(getCookies("customer_details")?.id)
    .then((res) => {
      
      dispatch({
        type: customerChatActions.SET_CONVERSATION_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const handleNewMessage = (dispatch, message) => {
  const type = customerChatActions.NEW_MESSAGE;
  dispatch({
    type,
    payload: message,
  });
};
