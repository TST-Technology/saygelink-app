import React from 'react'
import CrossIcon from '../../assets/images/close.svg'
import { DialogStyle } from '../../style-component/dialog'

const Dialog = ({ title, onClose, width, content, open }) => {
  return (
    <DialogStyle open={open} onClose={onClose} width={width}>
      <div className='dialog'>
        <div className='dialogHeader'>
          <div className='dialogHeadingLeft'>
            <h3 className='dialogTitle'>{title}</h3>
          </div>

          <img className='closeIcon' src={CrossIcon} onClick={onClose} />
        </div>

        <div className='dialogBody'>{content}</div>
      </div>
    </DialogStyle>
  )
}

export default Dialog
