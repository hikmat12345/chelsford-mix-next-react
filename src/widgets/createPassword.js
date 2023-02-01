import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton'
import { FAEText } from '@findanexpert-fae/components/dist/stories/FAEText/FAEText'
import React from 'react'
import PaswordField from './passwordToLogin'

function CreatePassword({
  createPasswordSubmit,
  confirmPasswordText,

  confirmPasswordValue
}) {
  return (
    <div>
        <PaswordField />
        <PaswordField   
         passwordLabel="Please confirm your password" />
        <FAEText className="fae-confirm-Text">{confirmPasswordText}</FAEText>
        <FAEButton onClick={createPasswordSubmit}>Next</FAEButton>
    </div>
  )
}

export default CreatePassword
