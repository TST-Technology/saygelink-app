import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ImageCardStyle } from '../../style-component/image-card/image-card'

const ImageCard = ({
  mainId,
  field,
  participant,
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
  let history = useNavigate();

  const onClickEvent = (mainId,participant,field) => {
    if(participant){
      history(`/network/${field}/${mainId}`);
    }
  }

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
      <div className='cardBody' onClick={() => onClickEvent(mainId, participant,field)}>
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
