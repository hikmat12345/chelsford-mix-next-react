import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton'
import { FAEText } from '@findanexpert-fae/components/dist/stories/FAEText/FAEText'
 import React, { useState } from 'react'
import { memo } from 'react'
import InputField from './inputField';
import { withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


// emailTypeError
function ProfileInformation({checkedSign, handleChange=()=>{},handleAgreement=()=>{},checkedStatus=false,InputFieldEmailChange=()=>{}, InputFieldFNameChange=()=>{}, InputFieldLNameChange=()=>{}, submitPInfo=()=>{}}) {
   

  const RedRadio = withStyles({
    root: {
      color: red[600],
      '&$checked': {
        color: red[600],
      },
     
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  const RedCheckBox = withStyles({
    root: {
      color: red[600],
      '&$checked': {
        color: red[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  
  return (
    <div className='f'>
      <FAEText subHeading className="pb"> Profile Information </FAEText>
       <FAEText className="pt pb"> First Name</FAEText>
       <InputField fieldIcon="user.svg" fieldOnChange={InputFieldFNameChange}   />
       <FAEText className="pt pb"> Last Name</FAEText>
       <InputField fieldIcon="user.svg" fieldOnChange={InputFieldLNameChange}   />
       <FAEText className="pt pb"> Add your email information</FAEText>
       <InputField fieldIcon="mail.svg" fieldType="email" fieldOnChange={InputFieldEmailChange}   />
      {/* gender selection  */}
      <FAEText style={{paddingTop:"10px"}} >Gender</FAEText>
       <RadioGroup aria-label="gender" className='fae-radio-group-gender' name="gender1" value={"value"} onChange={handleChange}>
          
          <FormControlLabel value="male" control={ <RedRadio
            checked={checkedSign === 'Male'}
            onChange={handleChange}
            value="Male"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'B' }}
          />} label="Male" />

          <FormControlLabel value="female" control={<RedRadio
            checked={checkedSign=== 'Female'}
            onChange={handleChange}
            value="Female"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'A' }}
          />} label="Female" />
           
           <FormControlLabel value="other" control={ <RedRadio
            checked={checkedSign === 'other'}
            onChange={handleChange}
            value="other"
            name="radio-button-demo"
            inputProps={{ 'aria-label': 'C' }}
          />} label="Other" />
        </RadioGroup>  

     {/* <div className='fae-gender-selectio'>
       <RedCheckBox
        checked={checkedStatus}
        onChange={handleAgreement}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      /> 
      <FAEText className="pt pb">I agree to the Expert <strong>Terms of Services and Privacy Policy</strong></FAEText>
    </div> */}
 
      <FAEButton onClick={submitPInfo}> Confirm </FAEButton>
    </div>
  )
}
export default memo(ProfileInformation)
