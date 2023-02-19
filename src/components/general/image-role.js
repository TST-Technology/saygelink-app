import React, { useEffect, useRef, useState } from "react";
import {
  ImageRoleContainerStyle,
  ImageRoleStyle,
  LinearProgressStyle,
} from "../../style-component/image.role";
import { ROLES } from "../../utils/constants";
import defaultPersonImage from "../../assets/images/defaultImage.png";

//possible roles => student, alumni, faculty
const ImageRole = ({
  role,
  height,
  width,
  radius,
  src,
  className,
  onClick,
  defaultImage,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const ref = useRef();

  const handleLoad = () => {
    setImageLoaded(true);
  };

  const handleError = () => {
    ref.current.src = defaultImage;
  };

  return (
    <ImageRoleContainerStyle>
      <ImageRoleStyle
        ref={ref}
        src={src}
        onLoad={() => {
          handleLoad();
        }}
        onError={() => {
          handleError();
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
        className={className}
        role={role}
        hide={imageLoaded}
      />
    </ImageRoleContainerStyle>
  );
};

ImageRole.defaultProps = {
  radius: 0,
  role: ROLES.STUDENT,
  defaultImage: defaultPersonImage,
};

export default ImageRole;
