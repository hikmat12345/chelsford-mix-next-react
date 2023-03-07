import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import PersonIcon from "@material-ui/icons/Person";
import { getFileSrcFromPublicFolder } from "./utils";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ContactMailIcon from "@material-ui/icons/ContactMail";
// import EmailIcon from "@material-ui/icons/Email";
import PaymentIcon from "@material-ui/icons/Payment";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import GroupIcon from "@material-ui/icons/Group";
import CachedIcon from '@material-ui/icons/Cached';
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import PersonAddDisabledOutlinedIcon from '@material-ui/icons/PersonAddDisabledOutlined';
import history from "./history";

const proFaeUrl = process.env.REACT_APP_PRO_FAE_URL;
const blogFaeUrl = process.env.REACT_APP_BLOG_FAE_URL;

export const navBarDropDownInfo = {
  label: "Account",
  icon: <ArrowDropDownIcon />,
  // new signIn link change
  signInClicked: () => history.push("/account"),
  list: [
    // {
    //   label: "Recommend a Friend ",
    //   icon: <img src={getFileSrcFromPublicFolder("Recommended a Friend.svg")} />,
    //   onClick: () => history.push("/offers"),
    // }, 
    {
      label: "About Chelsford",
      icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
      onClick: () => history.push("/about-us"),
    },
    // {
    //   label: "Laser Courses",
    //   icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
    //   onClick: () => history.push("/laser"),
    // },
    // {
    //   label: "Beauty Courses",
    //   icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
    //   onClick: () => history.push("/beauty"),
    // },
    // {
    //   label: "Medical Courses",
    //   icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
    //   onClick: () => history.push("/medical"),
    // },
    // { 
    //   label: "Legal", 
    //   icon: <img src={getFileSrcFromPublicFolder("Legal.svg")} />,
    //   onClick: () => history.push("/privacy-policy") 
    // },
    { 
      label: "Contact us",
      icon: <img src={getFileSrcFromPublicFolder("Contact Us.svg")} />,
      onClick: () => history.push("/contact-us") 
    },
  ],
  userStatus: true,
};
export const navBarDropDownInfoLogedIn = {
  label: "Account",
  icon: <ArrowDropDownIcon />,
  // new signIn link change
  signInClicked: () => history.push("/account"),
  list: [
    {
      label: "Profile",
      icon:  <img src={getFileSrcFromPublicFolder("profile.svg")} />,
      onClick: () => history.push("/profile"),
   },
   {
      label: "Your Bookings",
      icon: <img src={getFileSrcFromPublicFolder("orders.svg")} />,
      onClick: () => history.push("/your-bookings/upcoming"),
   },
  //  {
  //     label: "Your Addresses",
  //     icon: <img src={getFileSrcFromPublicFolder("addresses.svg")} />,
  //     onClick: () => history.push("/your-addresses"),
  //  },
 
   {
      label: "Payment Details",
      icon: <img src={getFileSrcFromPublicFolder("payment.svg")} />,
      onClick: () => history.push("/payment-details"),
   },
  //  {
  //     label: "Vouchers",
  //     icon:<img src={getFileSrcFromPublicFolder("gift box.svg")} />,
  //     onClick: () => history.push("/your-vouchers/service-voucher"),
  //  },
  //  {
  //     label: "Switch Country", 
  //     icon: <CachedIcon />,
  //     onClick: () => history.push("/switch-country"),
  //  }
    // {
    //   label: "Your Experts",
    //   icon: <AssignmentIndIcon />,
    //   onClick: () => history.push("/your-experts"),
    // },
  
    // {
    //   label: "Your Emails",
    //   icon: <EmailIcon />,
    //   onClick: () => history.push("/your-emails/inbox"),
    // },
   
    // {
    //   label: "Watchlist",
    //   icon: <FavoriteIcon />,
    //   onClick: () => history.push("/watchlist"),
    // },
  
  ],
  userStatus: true,
};
export const navBarData = {
  userNameClicked: () => history.push("/profile"),
  ordersClicked: () => history.push("/your-bookings/upcoming"),
  expertLogoClicked: () => history.push("/"),
  expertLogo: getFileSrcFromPublicFolder("logo.png"),
  // new signIn link change
  signInClicked: () => history.push("/account"),
  signUpClicked: () => history.push("/account"),
  itemsList: [
    // {
    //   label: "Become an Expert",
    //   href: proFaeUrl,
    // },
    // {
    //   label: "Offers",
    //   onClick: () => history.push("/offers"),
    // },
    // {
    //   label: "Referral",
    //   onClick: () => history.push("/referral"),
    // },
    // {
    //   label: "Watchlist",
    //   onClick: () => history.push("/watchlist"),
    // },
    {
      label: "About Expert",
      onClick: () => history.push("/about-us"),
    },
    {
      label: "Blog",
      href: blogFaeUrl,
    },
    {
      label: "Help",
      onClick: () => history.push("/help"),
    },
  ],
};
  
export const signedInMobileMenu = [
  {
     label: "Profile",
     icon:  <img src={getFileSrcFromPublicFolder("profile.svg")} />,
     onClick: () => history.push("/profile"),
  },
  {
     label: "Your Bookings",
     icon: <img src={getFileSrcFromPublicFolder("orders.svg")} />,
     onClick: () => history.push("/your-bookings/upcoming"),
  },
  // {
  //    label: "Your Addresses",
  //    icon: <img src={getFileSrcFromPublicFolder("addresses.svg")} />,
  //    onClick: () => history.push("/your-addresses"),
  // },

  {
     label: "Payment Details",
     icon: <img src={getFileSrcFromPublicFolder("payment.svg")} />,
     onClick: () => history.push("/payment-details"),
  },
  // {
  //    label: "Vouchers",
  //    icon:<img src={getFileSrcFromPublicFolder("gift box.svg")} />,
  //    onClick: () => history.push("/your-vouchers/service-voucher"),
  // },
  // {
  //    label: "Switch Country", 
  //    icon: <CachedIcon />,
  //    onClick: () => history.push("/switch-country"),
  // },
//   {
//     label: "Delete Your Account", 
//     icon: <PersonAddDisabledOutlinedIcon/>,
//     onClick: () => history.push("/switch-country"),
//  },
];

export const mobileMenu = [
  // {
  //   label: "Become an Expert",
  //   href: proFaeUrl,
  // },
  // {
  //   label: "Recommend a Friend ",
  //   icon: <img src={getFileSrcFromPublicFolder("Recommended a Friend.svg")} />,
  //   onClick: () => history.push("/offers"),
  // },
  // {
  //   label: "Referral",
  // />
  //onClick: () => history.push("/referral"),
  // },
  // {
  //   label: "Watchlist",
  //} />
  // onClick: () => history.push("/watchlist"),
  // },
  {
    label: "About Chelsford",
    icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
    onClick: () => history.push("/about-us"),
  },
  
  // { 
  //   label: "Legal", 
  //   icon: <img src={getFileSrcFromPublicFolder("Legal.svg")} />,
  //   onClick: () => history.push("/privacy-policy") 
  // },
  { 
    label: "Contact us",
    icon: <img src={getFileSrcFromPublicFolder("Contact Us.svg")} />,
    onClick: () => history.push("/contact-us") 
  },
  // {
  //   label: "Laser Courses",
  //   icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
  //   onClick: () => history.push("/laser"),
  // },
  // {
  //   label: "Beauty Courses",
  //   icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
  //   onClick: () => history.push("/beauty"),
  // },
  // {
  //   label: "Medical Courses",
  //   icon:  <img src={getFileSrcFromPublicFolder("About Expert.svg")} />,
  //   onClick: () => history.push("/medical"),
  // },
    
];

export const footerData = {
  links: [
    { label: "About Expert", onClick: () => history.push("/about-us") },
    // {
    //   label: "Become an Expert",
    //   href: proFaeUrl,
    // },
    { label: "Legal", onClick: () => history.push("/privacy-policy") },
    { label: "Contact us", onClick: () => history.push("/contact-us") },
    { label: "Blog", href: blogFaeUrl },
    { label: "Cookies Policy", onClick: () => history.push("/cookies-policy") },
    {
      label: "Terms & Conditions",
      onClick: () => history.push("/terms-and-conditions"),
    },
    { label: "Help", onClick: () => history.push("/help") },
  ],
  expertLogo: getFileSrcFromPublicFolder("expert_logo_full.png"),
  expertLogoClicked: () => history.push("/"),
};
