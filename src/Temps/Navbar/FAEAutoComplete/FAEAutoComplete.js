//libs
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

//src
import { FAEContainer, FAEShadowBox, FAEText } from "@findanexpert-fae/components"; 

//scss
import "./FAEAutoComplete.scss";

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export const FAEAutoComplete = ({
  placeholder = "placeholder",
  className = "",
  justify,
  align,
  primary,
  shadowBoxProps,
  renderOption,
  values = [],
  value = "",
  label,
  type = "",
  getSelectedValue = () => {},
  isRequired = false,
  ...rest
}) => {
  const classes = useStyles();

  const [selectedValue, setSelectedValue] = useState({ label: "" });

  useEffect(() => {
    setSelectedValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.label]);

  const handleChange = (e, valueObj) => {
    setSelectedValue(valueObj === null ? { label: "" } : valueObj);
    getSelectedValue(valueObj === null ? "" : valueObj.value);
  };

  return (
    <>
      <FAEContainer justify={justify} align={align}>
        {primary ? (
          <FAEShadowBox {...shadowBoxProps} padding={true}>
            <div className="fae--auto-complete-container">
              <FAEText important={isRequired && true} tertiary>
                {label}
              </FAEText>
              <Autocomplete
                className={className}
                id="country-select-demo"
                freeSolo={type === "search" && true}
                disableClearable={type === "search" && true}
                options={values}
                classes={{
                  option: classes.option,
                }}
                value={selectedValue}
                autoHighlight
                getOptionLabel={(option) => option.label}
                filterOptions={(option) => option}
                onChange={handleChange}
                renderOption={renderOption}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={placeholder}
                    inputProps={{
                      ...params.inputProps,
                      type: type,
                    }}
                    {...rest}
                  />
                )}
              />
            </div>
          </FAEShadowBox>
        ) : (
          <div className="fae--auto-complete-container">
            <FAEText important={isRequired && true} tertiary>
              {label}
            </FAEText>
            <Autocomplete
              className={className}
              id="country-select-demo"
              freeSolo={type === "search" && true}
              disableClearable={type === "search" && true}
              options={values}
              classes={{
                option: classes.option,
              }}
              filterOptions={(option) => option}
              value={selectedValue}
              autoHighlight
              getOptionLabel={(option) => option.label}
              onChange={handleChange}
              renderOption={renderOption}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    type: type,
                  }}
                  {...rest}
                />
              )}
            />
          </div>
        )}
      </FAEContainer>
    </>
  );
};
