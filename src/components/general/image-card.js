import React from 'react'
import { ImageCardStyle } from '../../style-component/image-card/image-card'

const ImageCard = ({
  headingTitle,
  headingButton,
  cardText,
  buttonText,
  backgroundImage,
  showBorder,
  onButtonClick = () => {},
  blueButton = true,
  onHeadingButtonClick = () => {}
}) => {
  return (
    <ImageCardStyle bgImage={backgroundImage} showBorder={showBorder}>
      {headingTitle && headingButton ? (
        <div className='cardHeading'>
          <p className=''>{headingTitle}</p>
          <span className='' onClick={onHeadingButtonClick}>
            {headingButton}
          </span>
        </div>
      ) : null}
      <div className='cardBody'>
        <div className='cardImage'>
          <p className='cardImageText'>{cardText}</p>
          {buttonText && blueButton ? (
            <a onClick={onButtonClick}>{buttonText}</a>
          ) : null}
          {!blueButton ? (
            <a className='notABlueButton' onClick={onButtonClick}>
              {buttonText}
            </a>
          ) : null}
        </div>
      </div>
    </ImageCardStyle>
  )
}

ImageCard.defaultProps = {
  showBorder: true
}

export default ImageCard
