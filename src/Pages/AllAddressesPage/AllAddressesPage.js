//libs
import React, { useEffect, Children, Fragment, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  FAEText,
  FAELoading,
  FAEShadowBox,
  FAEDialogueBox,
} from "@findanexpert-fae/components";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

//src
import UserInfoPageLayout from "../UserInfoPageLayout";
import { getCookies, getFileSrcFromPublicFolder, NoResult } from "../../utils";
import {
  deleteAddress,
  getAllAddresses,
} from "../../redux/actions/allAddressesPageActions";
import history from "../../history";

//scss
import "./AllAddressesPage.scss";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
const loaderImage = getFileSrcFromPublicFolder("loader.GIF");
// const deleteIcon = getFileSrcFromPublicFolder("delete_svg.svg");
const notesIcon = getFileSrcFromPublicFolder("notes_svg.svg");

const AllAddressesPage = ({
  error,
  loading,
  allAddresses,
  addressDeleted,
  getAllAddresses,
  deleteAddress,
}) => {
  
  document.title = `Chelsford | Addresses`;
  const userId = getCookies("userId");
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
    const [openPopUp, setOpenPopup] = useState(false);
  useEffect(() => {
    if (addressDeleted === true) {
      getAllAddresses(userId);
    }
  }, [addressDeleted, getAllAddresses, userId]);
  useEffect(() => {
    getAllAddresses(userId);
  }, [getAllAddresses, userId]);
  
  const clickHandler = async(id)=>{ 
     await deleteAddress(id)
     await  setOpenPopup(false)
  }

  return (
    <>
      <UserInfoPageLayout>
        <div className="fae--all-addresses-page-main-container">
          <div className="fae--all-addresses-heading-button-wrapper">
            <FAEText heading>Your Addresses</FAEText>{" "}
            <FAEText
              onClick={() =>
                history.push({ pathname: "/your-addresses/add", state: {} })
              }
              className="fae--all-addresses-add-button"
            >
              <span className="red-text bold">+</span> Add Address
            </FAEText>
          </div>
          {loading && (
            <FAELoading type="svg" loaderImage={loaderImage} height="200px" />
          )}
          {!loading && (
            <div className="fae--all-addresses-addresses-wrapper">
             {Children.toArray(
                allAddresses.map((userAddress) => {
                  const {
                    line1 = "",
                    line2,
                    townCity,
                    postalCode,
                    id,
                    address,
                    isResidentialAddress,
                  } = userAddress;
                  return (
                    <FAEShadowBox
                      primary
                      className="fae--all-addresses-adrress-bar-wrapper"
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <FAEText
                          className="fae--all-addresses-page-original-address"
                          paragraph
                          tertiary
                        >
                          {line1}
                        </FAEText>
                        {isResidentialAddress && (
                          <CheckCircleIcon style={{ color: "green" }} />
                        )}
                      </div>
                      <div>
                        <FAEText className="fae--all-addresses-page-original-address">
                          {line2}
                        </FAEText>
                        <FAEText className="fae--all-addresses-page-original-address">
                          {townCity}
                        </FAEText>
                        <FAEText className="fae--all-addresses-page-original-address">
                          {postalCode}
                        </FAEText>
                      </div>
                      <div className="fae--al-addresses-notes-and-delete-icon-wrapper">
                        <FAEText
                          className="fae--all-addresses-notes-text pointer"
                          onClick={() => {
                            setOpen(true);
                            setContent(address);
                          }}
                          paragraph
                          tertiary
                        >
                          <img
                            className="fae--all-addresses-action-icon"
                            src={notesIcon}
                            alt="notes_icon"
                            width="auto"
                            height="auto"
                          />
                          Address Notes
                        </FAEText>
  
                      <Popup  trigger={<button  className="fae--addresses-delete-icon-button pointer" > X</button>} open={openPopUp}  position="left center">
                            {close => (
                              <div>
                                Are you sure? You want to delete this address.
                                <a className="close" onClick={close}>
                                  &times;
                                </a>
                                <buton className='popup-sure-btn' onClick={()=>clickHandler(id) }>Yes</buton>
                              </div>
                            )}
                        </Popup> 

                      </div>
                    </FAEShadowBox>
                  );
                })
              )}
            </div>
          )}
          {NoResult(loading, allAddresses)}
        </div>
      </UserInfoPageLayout>
      <FAEDialogueBox
        title="Address Notes"
        open={open}
        content={content.length !==0?content: "Address Notes not available"}
        buttons={[
          {
            label: "Ok",
            onClick: () => setOpen(false),
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = ({
  allAddressesPageReducer: { error, loading, allAddresses, addressDeleted },
}) => ({
  error,
  loading,
  allAddresses,
  addressDeleted,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllAddresses, deleteAddress }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AllAddressesPage);
