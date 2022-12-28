import React from 'react'
import ArrowLeft from '../../assets/images/arrow-left.svg'
import { ReactCalenderStyle } from '../../style-component/calender/custom-calender'

const CustomCalender = ({ onChange, value }) => {
  return (
    <ReactCalenderStyle
      onChange={onChange}
      value={value}
      nextLabel={
        <img style={{ transform: 'rotate(180deg)' }} src={ArrowLeft} />
      }
      prevLabel={<img src={ArrowLeft} />}
    />
  )
}

export default CustomCalender
