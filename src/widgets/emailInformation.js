import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton'
import React from 'react'
import { memo } from 'react'

 function EmailProfileInformation() {
  return (
    <div>
      Profile Information
      <FAEButton>Next</FAEButton>
    </div>
  )
}
export default memo(EmailProfileInformation)