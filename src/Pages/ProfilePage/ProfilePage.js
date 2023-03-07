//libs
import React, { useEffect, useState } from "react";
import {
  FAETextField,
  FAEText,
  FAEDialogueBox,
  FAELoading,
} from "@findanexpert-fae/components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import {
  getCookies,
  getFileSrcFromPublicFolder,
  objectIsEmpty,
} from "../../utils";
import history from "../../history";
import {
  changePassword,
  makePasswordChangedFalse,
} from "../../redux/actions/profilePageActions";

//scss
import "./ProfilePage.scss";
import {
  getProfileFields, 
} from "../../redux/actions/editProfilePageActions";
const editIcon = getFileSrcFromPublicFolder("edit_icon.svg");

const ProfilePage = ({
  loading,
  error,
  userCountryId,
  passwordChanged,
  changePassword,
  makePasswordChangedFalse,
  getProfileFields,
  profileFields=[]
}) => {
  document.title = `Chelsford | Profile`;
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [openResponse, setOpenResponse] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const userId = getCookies("userId");
  const [confirmPassword, setConfirmPassword] = useState("");
  const customerData = getCookies("customer_details");
  //const [profileFieldsData, setProfileFieldsData]= useState()
  const [statval, setStateValue]= useState([]) 
  const {
    firstName = "",
    lastName = "",
    email = "",
    gender = "",
    dob = "",
    mobile = "",
  } = customerData;  
  useEffect(async() => {
    if (!objectIsEmpty(passwordChanged)) {
      const { error, message } = passwordChanged;
      setContent(message);
      setOpenResponse(true);
      makePasswordChangedFalse();
      if (!error) {
        setOpen(false);
        setPassword("");
        setConfirmPassword("");
        setOldPassword("");
      }
    }

    
  }, [makePasswordChangedFalse, passwordChanged]);
  const handleChangePassword = (e) => {
    if (password === confirmPassword && password.length > 7) {
        changePassword({ email, password, oldPassword });
      } else {
        alert("Incorrect Values!");
      }
  };
// useEffect(async()=>{
//   if (userCountryId !=="") {
//     await  getProfileFields({ userCountryId, userId });
//     } 
//  } ,[])

  // useEffect(async()=>{ 
  //   const profile= await profileFields?.map((fieldValue)=>{
  //     const fieldName=fieldValue.field
  //    return  {[fieldName]: fieldValue.inputField}
  //   }) 
  //    await setStateValue(profile)
  // }, [])
//  const profileGetDetail={...statval}
//    const [statev, setStatev]= useState({})
//  profileGetDetail
// statval?.forEach(val => {
//   setStatev({...statev, ...val})
// });
//  console.log(profileGetDetail, statev, 'profileGetDetail')
//   [
//     {
//         "First Name": "Syed"
//     },
//     {
//         "Last Name": "Farrukh Chishti"
//     },
//     {
//         "Answer": "do this"
//     },
//     {
//         "Date Of Birth": "1987-06-10"
//     },
//     {
//         "Mobile": "+92-2222333355"
//     },
//     {
//         "Email": "asdf11211@mailinator.com"
//     },
//     {
//         "Gender": "1"
//     },
//     {
//         "Nationality": "8"
//     },
//     {
//         "Country": "171"
//     },
//     {
//         "Security Question": "9"
//     }
// ]
   const dobFiltered= dob?.split("T")[0]
  return (
    <> 
    <UserInfoPageLayout>
        <div className="fae--profile-page-main-container">
        {loading && (
          <FAELoading
            type="svg"
            loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
            height="200px"
            />
          )}
        {!loading && 
         (<>
          <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
                
            <div className="fae--profile-title-wrapper">
              
              <FAEText heading>Profile</FAEText>
              <img
                style={{ cursor: "pointer" }}
                src={editIcon}
                alt="edit_icon"
                height="auto"
                width="auto"
                onClick={() =>
                  history.push({
                    pathname: "/profile/edit",
                    state: { next: history.location.pathname },
                  })
                }
              />
            </div>
            {/* <FAEText
              onClick={() => setOpen(true)}
              style={{ cursor: "pointer" }}
              secondary>
              Change Password
            </FAEText> */}
          </div>
          <div className="fae--profile-page-elements-wrapper">
            <FAETextField
              label="First Name"
              value={firstName}
              inputProps={{ readOnly: true }}
              primary
              shadowBoxProps={{
                className: "fae--profile-page-text-field",
              }}
            />
            <FAETextField
              label="Last Name"
              value={lastName}
              inputProps={{ readOnly: true }}
              primary
              shadowBoxProps={{
                className: "fae--profile-page-text-field",
              }}
            />
          </div>
          <div className="fae--profile-page-elements-wrapper">
            <FAETextField
              label="Gender"
              value={gender}
              inputProps={{ readOnly: true }}
              primary
              shadowBoxProps={{
                className: "fae--profile-page-text-field",
              }}
            />
            <FAETextField
              label="Date Of Birth"
              value={dobFiltered}
              inputProps={{ readOnly: true }}
              primary
              shadowBoxProps={{
                className: "fae--profile-page-text-field",
              }}
            />
          </div>
          <div className="fae--profile-page-elements-wrapper">
            <FAETextField
              label="Mobile Number"
              value={mobile}
              inputProps={{ readOnly: true }}
              primary
              shadowBoxProps={{
                className: "fae--profile-page-text-field",
              }}
            />
            <FAETextField
              label="Email"
              value={email}
              inputProps={{ readOnly: true }}
              primary
              shadowBoxProps={{
                className: "fae--profile-page-text-field",
              }}
            />
          </div>
          </>)
          }
        </div>
      </UserInfoPageLayout>
      <FAEDialogueBox
        title="Set a new password"
        open={open}
        content={
          <>
            {loading ? (
              <FAELoading
                loaderImage={getFileSrcFromPublicFolder("loader.GIF")}
                type="svg"
                height="200px"
              />
            ) : (
              <>
                <FAETextField
                  type="password"
                  placeholder="Old Password"
                  getValue={(value) => {
                    setOldPassword(value);
                  }}
                  error={() => oldPassword.length < 8 && oldPassword.length > 0}
                  errorMessage={"Password length must be 8"}
                  value={oldPassword}
                />
                <FAETextField
                  type="password"
                  placeholder="Password"
                  getValue={(value) => {
                    setPassword(value);
                  }}
                  error={() => password.length < 8 && password.length > 0}
                  errorMessage={"Password length must be 8"}
                  value={password}
                />
                <FAETextField
                  type="password"
                  placeholder="Confirm Password"
                  getValue={(value) => {
                    setConfirmPassword(value);
                  }}
                  error={(value) =>
                    value !== password && confirmPassword.length > 0
                  }
                  errorMessage={"Passwods do not match!"}
                  value={confirmPassword}
                />
              </>
            )}
          </>
        }
        buttons={[
          {
            label: "Update Password",
            onClick: handleChangePassword,
          },
          {
            label: "Cancel",
            onClick: () => {
              setOpen(false);
            },
          },
        ]}
      />
      <FAEDialogueBox
        open={openResponse}
        content={content}
        buttons={[
          {
            label: "Ok",
            onClick: () => {
              setOpenResponse(false);
            },
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  profilePageReducer: {  error, passwordChanged },
  defaultReducer: { userCountryId },
  editProfilePageReducer: { loading, profileFields  },
}) => ({
  loading,
  error,
  passwordChanged,
  userCountryId,
  profileFields
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      changePassword,
      makePasswordChangedFalse,
      getProfileFields
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
