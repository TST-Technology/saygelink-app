import React from 'react'
import { ImageCardStyle } from '../../style-component/image-card/image-card'

const ImageCard = ({
  headingTitle,
  headingButton,
  cardText,
  buttonText,
  backgroundImage,
  showBorder
}) => {
  console.log(backgroundImage)
  return (
    <ImageCardStyle bgImage={backgroundImage} showBorder={showBorder}>
      {headingTitle && headingButton ? (
        <div className='cardHeading'>
          <p className=''>{headingTitle}</p>
          <span className=''>{headingButton}</span>
        </div>
      ) : null}
      <div className='cardBody'>
        <div className='cardImage'>
          <p className='cardImageText'>{cardText}</p>
          <a>{buttonText}</a>
        </div>
      </div>
    </ImageCardStyle>
  )
}

ImageCard.defaultProps = {
  showBorder: true
}

export default ImageCard
