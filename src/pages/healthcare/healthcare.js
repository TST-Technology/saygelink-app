import React from 'react'
import Header from '../../components/general/header'
import {
  HealthcareContainerStyle,
  StyleConnectButton,
  StyleFeedContainer,
  StyleMembersCard,
  StyleMembersCardContainer,
  ThoughtsTextArea
} from '../../style-component/healthcare/healthcare'
import PersonImage from '../../assets/images/person.png'
import FacebookImage from '../../assets/images/facebook.svg'
import LinkedinImage from '../../assets/images/linkedin.svg'

const Healthcare = () => {
  return (
    <>
      <HealthcareContainerStyle>
        <Header />
        <div className='healthCareContainer'>
          <div className='leftContainer'>
            <h3 className='heading'>Healthcare Innovation</h3>
            <span className='subHeading'>Members </span>

            <StyleMembersCardContainer>
              {[0, 1, 2, 3].map((row, index) => {
                return (
                  <StyleMembersCard key={0} scale={index}>
                    <div className='headingContainer'>
                      <div>
                        <img src={PersonImage} />
                      </div>

                      <StyleConnectButton>Connect</StyleConnectButton>
                    </div>
                    <h2 className='memberName'>Zoe Jones</h2>

                    <p className='skills'>Parenting | Pregnancy | Career </p>

                    <p className='insights'>Zoe Jone's insights</p>

                    <ul>
                      <li>RELATIONSHIP</li>
                      <li>PARENTING</li>
                    </ul>

                    <p className='insights'>Available</p>
                    <span className='dayText'>
                      Thursday - friday (12:00 pm - 03:00 pm)
                    </span>

                    <p className='insights'>Social profiles</p>

                    <div className='socialProfileContainer'>
                      <img src={LinkedinImage} className='socialImage' />
                      <img src={FacebookImage} className='socialImage' />
                    </div>
                  </StyleMembersCard>
                )
              })}
            </StyleMembersCardContainer>

            <StyleFeedContainer>
              <h3 className='heading'>Work life board</h3>

              <ThoughtsTextArea placeholder='Share your thoughts...' />

              <img src={PersonImage} className='postPreviewImage' />
            </StyleFeedContainer>
          </div>
          <div className='rightContainer'>
            <h3 className='heading'>My Groups</h3>

            <div className='rightSideCard'>
              <div className='cardHeading'>
                <p className=''>Event groups</p>
                <span className=''>View all</span>
              </div>
              <div className='cardBody'>
                <div className='cardImage'>
                  <p className='cardImageText'>Job Opportunities</p>
                  <a>Join</a>
                </div>
              </div>
            </div>

            <div className='rightSideCard'>
              <div className='cardHeading'>
                <p className=''>Interest groups</p>
                <span className=''>View all</span>
              </div>
              <div className='cardBody'>
                <div className='cardImage2'>
                  <p className='cardImageText'>Job Opportunities</p>
                  <a>Join</a>
                </div>
              </div>
              <div className='cardBody'>
                <div className='cardImage2'>
                  <p className='cardImageText'>Job Opportunities</p>
                  <a>Join</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HealthcareContainerStyle>
    </>
  )
}

export default Healthcare
