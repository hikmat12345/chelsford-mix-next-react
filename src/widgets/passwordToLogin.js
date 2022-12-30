import { FAEButton } from '@findanexpert-fae/components/dist/stories/FAEButton/FAEButton'
import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import history from '../history'
import { getFileSrcFromPublicFolder } from '../utils'

export default function PaswordField({SubmitPasswordToLogin, passwordfieldValue,setPasswordValue=()=>{}, passwordLabel="Please enter your password"}) {
  const [passwordIcon, setPasswordIcon]=useState(false)
    const ref=useRef()
   
   const passwordViewHandle=()=>{
     setPasswordIcon(!passwordIcon)
    !passwordIcon ? ref.current.type="text" : ref.current.type="password"
  }

  return (
    < >
        <p className='fae-pasword-lable pt pb'>{passwordLabel} </p>
         <div className='fae-password-bfield-box'> 
            <input ref={ref} type="password" onChange={setPasswordValue}   name ="login-password" className ="login-password" id  ="login-password" />
            {passwordIcon && <img src={getFileSrcFromPublicFolder("password-dotted.PNG")} onClick = { passwordViewHandle } />}
            {!passwordIcon && <img src={getFileSrcFromPublicFolder("password-texted.PNG")} onClick = { passwordViewHandle } />}
        </div>
      
    </>
  )
}
