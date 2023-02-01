import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton'
import React from 'react'
 import { memo } from 'react'
import FAEPhoneInput from '../Temps/FAEPhoneInput/FAEPhoneInput'
import PasswordToLogin from './passwordToLogin'

function MobileEntry({
  enterNumberHandler,
  handleChangefieldmobileValue,
  message="",
  userCountry="GB",
  children
 }) {

 
   
  return (
    <form onSubmit={enterNumberHandler} className='fae-mobile-entry'>
        <p className='before-submit-text' >Enter your mobile number</p>
          <FAEPhoneInput
            primary
            required={true}
            getValue={ 
              handleChangefieldmobileValue 
            }
            shadowBoxProps={{
              primary: true,
            }}
            countryCode={userCountry}
          />
          
          {message !="" && <p className='fae-phone-input-error'>{message}</p>}
          {children}
        <p className='before-submit-text'>By proceeding,you consent to get calls, WhatsApp or SMS messages, including by automated means, from Expert and Its affiliates to the number provided.</p>
        <FAEButton >Next</FAEButton>
    </form>
  )
}
export default memo(MobileEntry)