//libs
import { combineReducers } from "redux";

//src
import homePageReducer from "./homePageReducer";
import defaultReducer from "./defaultReducer";
import subIndustriesPageReducer from "./subIndustriesPageReducer";
import servicesPageReducer from "./servicesPageReducer";
import dateTimeSelectionPageReducer from "./dateTimeSelectionPageReducer";
import serviceContentPageReducer from "./serviceContentPageReducer";
import serviceAttributesPageReducer from "./serviceAttributesPageReducer";
import signUpPageReducer from "./signUpPageReducer";
import codeVerificationPageReducer from "./codeVerificationPageReducer";
import signInPageReducer from "./signInPageReducer";
import addressSelectionPageReducer from "./addressSelectionPageReducer";
import subServicesPageReducer from "./subServicesPageReducer";
import summaryPageReducer from "./summaryPageReducer";
import addPaymentCardPageReducer from "./addPaymentCardPageReducer";
import paymentDetailsPageReducer from "./paymentDetailsPageReducer";
import addAddressPageReducer from "./addAddressPageReducer";
import offersPageReducer from "./offersPageReducer";
import upcomingBookingsPageReducer from "./upcomingBookingsPageReducer";
import completedBookingsPageReducer from "./completedBookingsPageReducer";
import allAddressesPageReducer from "./allAddressesPageReducer";
import bookingDetailPageReducer from "./bookingDetailPageReducer";
import bookingEditPageReducer from "./bookingEditPageReducer";
import editProfilePageReducer from "./editProfilePageReducer";
import consentPageReducer from "./consentPageReducer";
import helpPageReducer from "./helpPageReducer";
import referralPageReducer from "./referralPageReducer";
import addVoucherPageReducer from "./addVoucherPageReducer";
import contactUsPageReducer from "./contactUsPageReducer";
import forgotPasswordPageReducer from "./forgotPasswordPageReducer";
import profilePageReducer from "./profilePageReducer";
import sessionSelectionPageReducer from "./sessionSelectionPageReducer";
import sessionBookingsPageReducer from "./sessionBookingsPageReducer";
import trainingSelectionPageReducer from "./trainingSelectionPageReducer";
import giftVouchersPageReducer from "./giftVouchersPageReducer";
import pointsVouchersPageReducer from "./pointsVouchersPageReducer";
import servicesVouchersPageReducer from "./servicesVouchersPageReducer";
import dateTimeSelectionForClinicsReducer from "./dateTimeSelectionForClinicsReducer";
import allServicesHomePage from "./allServices";
import productsReducer from "./productsReducer";
import thankyouBookingPageReducter from "./thankyouBookingPageReducter";
import threeDSecureReducer from "./threeDSecurePageReducer";
import chatSupportPageReducer from "./chatPageReducer";
import customerChatReducer from "./customerChatReducer";
import signOutPageReducer from "./signOutPageReducer";
import consentPageImageReducer from './consentImageReducer'
import salesOrderinvoiceRedcuer from "./paymentInvoicePageReducer";
const allReducers = combineReducers({
  salesOrderinvoiceRedcuer,
  consentPageImageReducer,
  signOutPageReducer,
  thankyouBookingPageReducter,
  threeDSecureReducer,
  homePageReducer,
  defaultReducer,
  subIndustriesPageReducer,
  servicesPageReducer,
  dateTimeSelectionPageReducer,
  serviceContentPageReducer,
  serviceAttributesPageReducer,
  signUpPageReducer,
  codeVerificationPageReducer,
  signInPageReducer,
  addressSelectionPageReducer,
  subServicesPageReducer,
  summaryPageReducer,
  addPaymentCardPageReducer,
  paymentDetailsPageReducer,
  addAddressPageReducer,
  offersPageReducer,
  upcomingBookingsPageReducer,
  completedBookingsPageReducer,
  allAddressesPageReducer,
  bookingDetailPageReducer,
  bookingEditPageReducer,
  editProfilePageReducer,
  consentPageReducer,
  helpPageReducer,
  referralPageReducer,
  addVoucherPageReducer,
  contactUsPageReducer,
  forgotPasswordPageReducer,
  profilePageReducer,
  sessionSelectionPageReducer,
  sessionBookingsPageReducer,
  trainingSelectionPageReducer,
  giftVouchersPageReducer,
  servicesVouchersPageReducer,
  pointsVouchersPageReducer,
  dateTimeSelectionForClinicsReducer,
  allServicesHomePage,
  productsReducer,
  chatSupportPageReducer,
  customerChatReducer,
});

export default allReducers;
