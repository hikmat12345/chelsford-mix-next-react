//libs
import React, { useEffect, useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";

//src
// import { FAEContainer } from "../FAEContainer/FAEContainer";
// import { FAEText } from "../FAEText/FAEText";
// import { FAEShadowBox } from "../FAEShadowBox/FAEShadowBox";
import { FAEShadowBox,FAEText, FAEContainer } from "@findanexpert-fae/components"
//scss
import "./FAEPhoneInput.scss";

export  const FAEPhoneInput = ({
  justify,
  align,
  className = "",
  primary,
  shadowBoxProps,
  isRequired,
  label,
  getValue = () => {},
  value = "",
  disabled,
  countryCode,
  ...rest
}) => {
  const [initialValue, setInitialValue] = useState("");

 const handleChangeValue = ({ code, number }) => {
    setInitialValue(value);
    number.length > 3
      ? getValue(
          `+${code}-${number
            .replace("+", "")
            .replace(code, "")
            .replaceAll(" ", "")
            .replace(/[^\w\s]/gi, "")}`
        )
      : getValue(number);
  };

  useEffect(() => {
    setInitialValue(value);
  }, [value]);

  return (
    <>
      <FAEContainer justify={justify} align={align}>
        {primary ? (
          <FAEShadowBox {...shadowBoxProps} padding={true}>
            <div className={`fae--phone-input-container ${className}`}>
              <FAEText important={isRequired && true} tertiary>
                {label}
              </FAEText>
              <MuiPhoneNumber
                name="phone"
                data-cy="user-phone"
                defaultCountry={countryCode?countryCode.toLowerCase():"pk"}
                className={className}
                value={initialValue}
                disabled={disabled}
                disableDropdown={disabled}
                onChange={(number, countrydata) =>
                  handleChangeValue({ code: countrydata.dialCode, number })
                }
                {...rest}
              />
            </div>
          </FAEShadowBox>
        ) : (
          <div className={`fae--select-container ${className}`}>
            <FAEText important={isRequired && true} tertiary>
              {label}
            </FAEText>
            <MuiPhoneNumber
              name="phone"
              data-cy="user-phone"
              defaultCountry={countryCode?countryCode:"pk"}
              className={className}
              variant="outlined"
              value={initialValue}
              disabled={disabled}
              disableDropdown={disabled}
              onChange={(number, countrydata) =>
                handleChangeValue({ code: countrydata.dialCode, number })
              }
              {...rest}
            />
          </div>
        )}
      </FAEContainer>
    </>
  );
};
export default FAEPhoneInput