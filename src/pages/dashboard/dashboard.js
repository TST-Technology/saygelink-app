import React from 'react'
import BackgroundLogoImage from '../../assets/images/saygeLinkBgLogo.png'
import { HomeContainerStyle } from '../../style-component/dashboard/dashboard'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import cardBackgroundImage3 from '../../assets/images/cardBackground3.png'
import cardBackgroundImage4 from '../../assets/images/cardBackground4.png'
import Experience1 from '../../assets/images/experience1.png'
import Experience2 from '../../assets/images/experience2.png'
import Experience3 from '../../assets/images/experience3.png'
import Experience4 from '../../assets/images/experience4.png'
import ImageCard from '../../components/general/image-card'
import { StyleCategoryCard } from '../../style-component/createAccount/experiences'

const Dashboard = () => {
  const categories = [
    { image: Experience1, name: 'Student Sundry' },
    { image: Experience2, name: 'Healthcare Innovation' },
    { image: Experience3, name: 'Well Being' },
    { image: Experience4, name: 'Work Life Balance' }
  ]
  return (
    <HomeContainerStyle>
      <div className='homeBackgroundContainer'>
        <div className='homeBannerTextContainer'>
          <h2 className='blackText'>
            Start a <br /> Conversation On
          </h2>
          <img className='bgLogo' src={BackgroundLogoImage} />
        </div>
      </div>

      <div className='homeContentContainer'>
        <div className='homeContentLeftContainer'>
          <img src={cardBackgroundImage4} />
          <ImageCard
            backgroundImage={cardBackgroundImage3}
            buttonText='Join'
            cardText='Job Opportunities'
            headingTitle={'Events'}
            headingButton='View all'
            showBorder={false}
          />
          <ImageCard
            backgroundImage={cardBackgroundImage2}
            buttonText='Join'
            cardText='Job Opportunities'
            headingTitle={'Interest'}
            headingButton='View all'
            showBorder={false}
          />
        </div>
        <div className='homeContentCenterContainer'>
          <div className=''>
            {categories &&
              categories.map((category, index) => {
                return (
                  <StyleCategoryCard key={index}>
                    <div className='imageContainer'>
                      <img src={category?.image} />
                    </div>
                    <div className='labelContainer'>
                      <span className='label'>{category?.name}</span>
                    </div>
                  </StyleCategoryCard>
                )
              })}
          </div>
        </div>
        <div className='homeContentRightContainer'></div>
      </div>
    </HomeContainerStyle>
  )
}

export default Dashboard
