//libs
import React, { useEffect, Children, useState, Fragment } from "react";
import {
  FAETitle,
  FAELoading,
  FAETextField,
  FAEButton,
  FAECheckBoxGroup,
  FAERadioGroup,
  FAESelect,
  FAEDatePicker,
  FAEPhoneInput,
} from "@findanexpert-fae/components";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//src
import {
  eighteenYearsBackDate,
  getCookies,
  getFileSrcFromPublicFolder,
  getUniqueData,
  objectIsEmpty,
  setCookies,
  validateInput,
} from "../../utils";
import history from "../../history";
import {
  getProfileFields,
  makeUpdateProfileResponseToEmpty,
  updateProfile,
} from "../../redux/actions/editProfilePageActions";
import UserInfoPageLayout from "../UserInfoPageLayout";

//scss
import "./EditProfilePage.scss";

const loaderImage = getFileSrcFromPublicFolder("loader.GIF");

const profileFormParser = (data) => {
  const parsedData = data?.map(({ value, id }) => ({
    value: `${id}`,
    label: value,
  }));
  return parsedData;
};

const EditProfilePage = ({
  loading,
  error,
  userCountryId,
  profileFields,
  getProfileFields,
  updateProfileRespone,
  makeUpdateProfileResponseToEmpty,
  updateProfile,
}) => {
  document.title = `Chelsford | Edit Profile`;
  const userId = getCookies("userId");
  const [errorFileds, setErrorFields] = useState([]);
  const [fieldAnswers, setFieldAnswers] = useState([]);
  const securityAnswerField = profileFields.find((field) =>
    field.label.includes("Answer")
  );
  const countryIdFieldCode= profileFields.find((field=>field.label.includes("Country")))
  useEffect(() => {
    if (userCountryId !== "") {
      getProfileFields({ userCountryId, userId });
    }
  }, [getProfileFields, userCountryId, userId]);

  useEffect(() => {
    setFieldAnswers(
      profileFields.map((field) => {
        return { fieldId: field.id, answer: field.inputField };
      })
    );
  }, [profileFields]);

  useEffect(() => {
    if (!objectIsEmpty(updateProfileRespone)) {
      const { error, message, customerData } = updateProfileRespone; 
      error === true
        ? alert(message)
        : profileUpdatedSuccessfully(customerData);
      makeUpdateProfileResponseToEmpty();
    }
  }, [makeUpdateProfileResponseToEmpty, updateProfileRespone]);
  const profileUpdatedSuccessfully =async (customer) => { 
          await  setCookies("customer_details", customer);
          await  history.push({
                  pathname: `${history.location.state.next}`,
                 }); 
      };

  const handleChangefieldValue = ({ value, regex, id }) => {
    setFieldAnswers(
      getUniqueData(
        [{ fieldId: id, answer: value }, ...fieldAnswers],
        "fieldId"
      )
    );
    value !== "" &&
      setErrorFields(
        getUniqueData(
          [
            { fieldId: id, error: !validateInput(regex, value) },
            ...errorFileds,
          ],
          "fieldId"
        )
      );
  };

  const handleCheckBoxError = ({ isRequired, id, error }) => {
    isRequired === true &&
      setErrorFields(getUniqueData([{ id, error }, ...errorFileds], "id"));
    return error;
  };  
  const handleSubmit = (e) => {
    e.preventDefault();
    return errorFileds.some((field) => field.error === true)
      ? alert("Please fill required fields")
      :parseInt(countryIdFieldCode?.inputField) == parseInt(userCountryId)
      ? updateProfile({ fieldAnswers, userId })
      : alert("Please switch your country.")
  };

  return (
    <>
      <UserInfoPageLayout>
        <div className="fae--edit-profile-page-container">
          <div className="fae--edit-profile-page-wrapper">
            <FAETitle
              label="Update Profile"
              className="fae--edit-title"
              logo={getFileSrcFromPublicFolder("title_logo.svg")}
            />
            {loading && (
              <FAELoading
                type="svg"
                loaderImage={loaderImage}
                height="200px"
              />
            )}
            {!loading && profileFields.length > 1 && (
              <form
                onSubmit={handleSubmit}
                className="fae--edit-profile-page-form-wrapper"
              >
                {Children.toArray(
                  profileFields.map((field) => {
                    const {
                      type,
                      regex,
                      isRequired,
                      errorMessage,
                      label,
                      id,
                      optionList,
                      inputField,
                    } = field;
                    const fieldType = type.toLowerCase();
                    return (
                      <>
                        {(fieldType === "text" ||
                          fieldType === "email" ||
                          fieldType === "password") &&
                          !label.includes("Answer") && (
                            <FAETextField
                              label={label}
                              placeholder={label}
                              primary
                              value={inputField}
                              required={isRequired}
                              type={fieldType}
                              error={(value) =>
                                value !== "" && !validateInput(regex, value)
                              }
                              errorMessage={errorMessage}
                              getValue={(value) =>
                                handleChangefieldValue({
                                  value,
                                  regex,
                                  id,
                                })
                              }
                              shadowBoxProps={{
                                className: "fae--edit-profile-page-field",
                              }}
                              inputProps={{
                                readOnly: fieldType === "email" && true,
                              }}
                            />
                          )}
                        {fieldType === "date" && (
                          <FAEDatePicker
                            label={label}
                            primary
                            shadowBoxProps={{
                              className: "fae--edit-profile-page-field",
                            }}
                            required
                            dateFormat={(date) =>
                              `${date.year}-${
                                `${date.month}`.length === 2
                                  ? date.month
                                  : `0${date.month}`
                              }-${
                                `${date.day}`.length === 2
                                  ? date.day
                                  : `0${date.day}`
                              }`
                            }
                            value={
                              inputField !== "" && {
                                year: parseInt(inputField.split("-")[0]),
                                day: parseInt(inputField.split("-")[2]),
                                month: parseInt(inputField.split("-")[1]),
                              }
                            }
                            getSelectedDate={(date) =>
                              handleChangefieldValue({
                                id,
                                value: `${date.year}-${
                                  `${date.month}`.length === 2
                                    ? date.month
                                    : `0${date.month}`
                                }-${
                                  `${date.day}`.length === 2
                                    ? date.day
                                    : `0${date.day}`
                                }`,
                              })
                            }
                            maximumDate={eighteenYearsBackDate()}
                          />
                        )}
                        {fieldType === "radio"  && optionList !==null && (
                          <> 
                          <FAERadioGroup
                            label={label}
                            values={profileFormParser(optionList)}
                            primary
                            value={inputField}
                            shadowBoxProps={{
                              className: "fae--edit-profile-page-field",
                            }}
                            isRequired={isRequired}
                            required={isRequired}
                            getSelectedValue={(value) =>
                              handleChangefieldValue({ id, value })
                            }
                          />
                          </>
                        )}
                        {fieldType === "phone" && (
                          <FAEPhoneInput
                            label={label}
                            primary
                            value={inputField}
                            isRequired={isRequired}
                            required={isRequired}
                            getValue={(value) =>
                              handleChangefieldValue({ id, value })
                            }
                            shadowBoxProps={{
                              className: "fae--edit-profile-page-field",
                            }}
                          />
                        )}
                        {fieldType === "select" &&
                        !label.includes("Security Question") ? (
                          <FAESelect
                            label={label}
                            primary
                            shadowBoxProps={{
                              className: "fae--edit-profile-page-field",
                            }}
                            values={profileFormParser(optionList)}
                            required={isRequired}
                            isRequired={isRequired}
                            getSelectedValue={(value) =>
                              handleChangefieldValue({ id, value })
                            }
                            value={inputField}
                          />
                        ) : (
                          fieldType === "select" &&
                          label.includes("Security Question") && (
                            <Fragment>
                              <FAESelect
                                label={label}
                                primary
                                shadowBoxProps={{
                                  className: "fae--edit-profile-page-field",
                                }}
                                values={profileFormParser(optionList)}
                                required={isRequired}
                                isRequired={isRequired}
                                getSelectedValue={(value) =>
                                  handleChangefieldValue({ id, value })
                                }
                                value={inputField}
                              />
                              <FAETextField
                                label={securityAnswerField.label}
                                placeholder={securityAnswerField.label}
                                primary
                                required={securityAnswerField.isRequired}
                                type={securityAnswerField.type}
                                error={(value) =>
                                  value !== "" &&
                                  !validateInput(
                                    securityAnswerField.regex,
                                    value
                                  )
                                }
                                value={securityAnswerField.inputField}
                                errorMessage={securityAnswerField.errorMessage}
                                getValue={(value) =>
                                  handleChangefieldValue({
                                    value,
                                    regex: securityAnswerField.regex,
                                    id: securityAnswerField.id,
                                    isRequired: securityAnswerField.isRequired,
                                    type: securityAnswerField.type.toLowerCase(),
                                  })
                                }
                                shadowBoxProps={{
                                  className: "fae--edit-profile-page-field",
                                }}
                                inputProps={{
                                  readOnly:
                                    securityAnswerField.type.toLowerCase() ===
                                      "email" && true,
                                }}
                              />
                            </Fragment>
                          )
                        )}
                        {fieldType === "checkbox" && (
                          <FAECheckBoxGroup
                            label={label}
                            values={profileFormParser(optionList)}
                            primary
                            shadowBoxProps={{
                              className: "fae--edit-profile-page-field",
                            }}
                            error={(values) =>
                              isRequired && values.length < 1
                                ? handleCheckBoxError({
                                    isRequired,
                                    id,
                                    error: true,
                                  })
                                : handleCheckBoxError({
                                    isRequired,
                                    id,
                                    error: false,
                                  })
                            }
                            errorMessage="Select at least 1"
                            isRequired={isRequired}
                            getSelectedValues={(values) =>
                              handleChangefieldValue({
                                id,
                                value: values.toString(),
                              })
                            }
                          />
                        )}
                      </>
                    );
                  })
                )}
                <FAEButton className="fae--edit-profile-page-form-button">
                  Save Profile
                </FAEButton>
              </form>
            )}
          </div>
        </div>
      </UserInfoPageLayout>
    </>
  );
};

const mapStateToProps = ({
  editProfilePageReducer: {
    error,
    loading,
    profileFields,
    saveSignUpFormResponse,
    updateProfileRespone,
  },
  defaultReducer: { userCountryId },
}) => ({
  error,
  loading,
  profileFields,
  userCountryId,
  saveSignUpFormResponse,
  updateProfileRespone,
});
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProfileFields,
      makeUpdateProfileResponseToEmpty,
      updateProfile,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);
