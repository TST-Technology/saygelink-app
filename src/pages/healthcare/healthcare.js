import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  HealthcareContainerStyle,
  StyleConnectButton,
  StyleFeedContainer,
  StyleMembersCard,
  StyleMembersCardContainer,
  StylePostButton,
  ThoughtsTextArea
} from '../../style-component/healthcare/healthcare'
import ImageRole from '../../components/general/image-role'
import PersonImage from '../../assets/images/person.png'
import FacebookImage from '../../assets/images/facebook.svg'
import LinkedinImage from '../../assets/images/linkedin.svg'
import GalleryImage from '../../assets/images/gallery.svg'
import ThreeDotImage from '../../assets/images/threeDotMenu.svg'
import ImageCard from '../../components/general/image-card'
import cardBackgroundImage1 from '../../assets/images/cardBackground1.png'
import cardBackgroundImage2 from '../../assets/images/cardBackground2.png'
import Post from '../../components/general/post'
import { useEffect } from 'react'
import useHttp from '../../hooks/use-http'
import CONSTANT from '../../utils/constants'

const Healthcare = () => {
  const api = useHttp()
  const { topicId } = useParams()
  const [allMembers, setAllMembers] = useState([])

  useEffect(() => {
    if (topicId) {
      getAllMembers()
    }
  }, [topicId])

  const getAllMembers = () => {
    const url = {
      ...CONSTANT.API.findSayge,
      endpoint: CONSTANT.API.findSayge.endpoint.replace(':topicId', topicId)
    }
    api.sendRequest(url, handleMembersResponse)
  }

  const handleMembersResponse = (resp) => {
    console.log(resp)
    if (resp && resp?.matchesProfiles) {
      setAllMembers(resp.matchesProfiles)
    }
  }

  const getAvailability = (avail) => {
    return (
      <div className='dayText'>
        {avail.map((row) => {
          return (
            <div>
              <span>
                {row.day} {row.start_time} {row.end_time} {row.timezone}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <>
      <HealthcareContainerStyle>
        <div className='healthCareContainer'>
          <div className='leftContainer'>
            <h3 className='heading'>Healthcare Innovation</h3>
            <span className='subHeading'>Members </span>

            <StyleMembersCardContainer>
              {Array.isArray(allMembers) && allMembers.length > 0
                ? allMembers.map((member, index) => {
                    return (
                      <StyleMembersCard key={member.id} scale={index}>
                        <div className='headingContainer'>
                          <div>
                            <ImageRole
                              className='memberImage'
                              src={member?.profile_image}
                              role={member?.qualification}
                            />
                          </div>

                          <StyleConnectButton>Connect</StyleConnectButton>
                        </div>
                        <h2 className='memberName'>{member.name}</h2>

                        <p className='skills'>
                          Parenting | Pregnancy | Career{' '}
                        </p>

                        <p className='insights'>Zoe Jone's insights</p>

                        <ul>
                          <li>RELATIONSHIP</li>
                          <li>PARENTING</li>
                        </ul>

                        <p className='insights'>Available</p>

                        {getAvailability(member?.availability)}

                        <p className='insights'>Social profiles</p>

                        <div className='socialProfileContainer'>
                          <img src={LinkedinImage} className='socialImage' />
                          <img src={FacebookImage} className='socialImage' />
                        </div>
                      </StyleMembersCard>
                    )
                  })
                : null}
            </StyleMembersCardContainer>

            <StyleFeedContainer>
              <h3 className='heading'>Work life board</h3>

              <ThoughtsTextArea placeholder='Share your thoughts...' />

              <img src={PersonImage} className='postPreviewImage' />

              <span className='photoInput'>
                <img src={GalleryImage} /> Photo
              </span>

              <StylePostButton>Post</StylePostButton>

              <div className='postContainer'>
                {[0, 1, 2, 3].map((row, index) => {
                  return (
                    <>
                      <Post
                        name='Rebecca Shoenfield'
                        time={'Just Now'}
                        description={
                          "Don't miss out on the opportunitiy to network with alumni at our annual HPM event! Register here."
                        }
                        image={PersonImage}
                      />
                    </>
                  )
                })}
              </div>
            </StyleFeedContainer>
          </div>
          <div className='rightContainer'>
            <h3 className='heading'>My Groups</h3>

            <div className='rightSideCard'>
              <ImageCard
                backgroundImage={cardBackgroundImage1}
                buttonText='Join'
                cardText='Job Opportunities'
                headingTitle='Event groups'
                headingButton='View all'
              />
            </div>

            <div className='rightSideCard'>
              <ImageCard
                backgroundImage={`${cardBackgroundImage2}`}
                buttonText='Join'
                cardText='Job Opportunities'
                headingTitle='Interest groups'
                headingButton='View all'
              />
              <ImageCard
                backgroundImage={cardBackgroundImage2}
                buttonText='Join'
                cardText='Job Opportunities'
              />
            </div>
          </div>
        </div>
      </HealthcareContainerStyle>
    </>
  )
}

export default Healthcare
