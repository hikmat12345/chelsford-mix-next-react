import { FAEButton  ,FAEText, FAECodeInput } from '@findanexpert-fae/components'
import React from 'react'
import { memo } from 'react'

function PhoneNumVerification({
    resendHandler,
    phoneNumber,
    verifcationCode,
}) {

  return (
    <div className='fae-verification-stuff'>
       <FAEText className="pb fae-verification-text">Enter the code that was sent to <strong>{`${phoneNumber}`}</strong></FAEText>
      <FAECodeInput  getValue={verifcationCode} />
      <FAEButton onClick={resendHandler}>Resend</FAEButton>
    </div>
  )
}

export default memo(PhoneNumVerification)
