import React from 'react'
import { memo } from 'react'
import { getFileSrcFromPublicFolder } from '../utils'
import PropTypes from 'prop-types'
function InputField({fieldIcon, fieldOnChange, fieldValue, fieldType}) {
  return (
    <div className='fae-field-box'> 
        {fieldIcon && <img src={getFileSrcFromPublicFolder(fieldIcon)} />}
         <input type={fieldType} required onChange={fieldOnChange} value={fieldValue} name ="input-field" className ="field-input"/>
     </div> 
  )
}

export default memo(InputField)

InputField.propTypes ={
    fieldIcon: PropTypes?.string,
    fieldOnChange: PropTypes.func,
    fieldValue:PropTypes.oneOfType([PropTypes.string , PropTypes.number ]),
    fieldType:PropTypes.oneOfType([PropTypes.string , PropTypes.number])
}
