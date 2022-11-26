import React, { useRef, useState } from 'react'
import {
  ImageRoleContainerStyle,
  ImageRoleStyle,
  LinearProgressStyle
} from '../../style-component/image.role'
import { ROLES } from '../../utils/constants'
import defaultImage from '../../assets/images/defaultImage.png'

//possible roles => student, alumni, faculty
const ImageRole = ({
  role,
  height,
  width,
  radius,
  src,
  className,
  onClick
}) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const ref = useRef()
  const imagePath = src ? src : defaultImage

  const handleLoad = () => {
    console.log('loaded')
    setImageLoaded(true)
  }

  const handleError = () => {
    ref.current.src = defaultImage
  }

  return (
    <ImageRoleContainerStyle>
      <ImageRoleStyle
        ref={ref}
        src={src}
        onLoad={() => {
          handleLoad()
        }}
        onError={() => {
          handleError()
        }}
        onClick={onClick}
        height={height}
        width={width}
        radius={radius}
        role={role}
        className={className}
        hide={!imageLoaded}
      />
      <LinearProgressStyle
        height={height}
        width={width}
        radius={radius}
        role={role}
        hide={imageLoaded}
      />
    </ImageRoleContainerStyle>
  )
}

ImageRole.defaultProps = {
  radius: 0,
  role: ROLES.STUDENT
}

export default ImageRole
