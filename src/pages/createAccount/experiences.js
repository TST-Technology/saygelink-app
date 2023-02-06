import React, { useContext, useEffect, useState } from 'react'
import useHttp from '../../hooks/use-http'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleMarginTop2,
  StyleNextButton,
  StyleNextButtonContainer
} from '../../style-component/createAccount/create-account'
import { DarkGrayLable } from '../../style-component/general'
import CONSTANT, { ROUTES } from '../../utils/constants'
import {
  StyleCategoryCard,
  StyleCompleteProfileContainer,
  StyledExperienceContainer,
  StyleSubcategoryItem,
  StyleTopicItem
} from '../../style-component/createAccount/experiences'
import RightArrow from '../../assets/images/RightArrow.svg'
import { CreateAccountContext } from './create-account'
import { notify } from '../../utils/funcs'
import PeopleImage from '../../assets/images/people.png'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'

const Experiences = () => {
  const categoryApi = useHttp()
  const subCategoryApi = useHttp()
  const experienceApi = useHttp()
  const navigate = useNavigate()

  const { formData, setStep, setFormData, step } =
    useContext(CreateAccountContext)

  const [categories, setCategories] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [subCategoryList, setSubCategoryList] = useState(null)
  const [activeSubCategory, setActiveSubCategory] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const [isExperienceGiven, setIsExperienceGiven] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    categoryApi.sendRequest(CONSTANT.API.getCategories, handleCategoryResponse)
  }

  const handleCategoryResponse = (resp) => {
    if (resp?.categories) {
      setCategories(resp?.categories)
      // handleCategoryClick(resp?.categories[0]?._id)
    }
  }
  const handleCategoryClick = (category) => {
    setLoading(true)
    setActiveSubCategory()
    setActiveCategory(category)
    const url = JSON.parse(JSON.stringify(CONSTANT.API.getSubcategories))
    url.endpoint = url.endpoint.replace(':categoryId', category?._id)
    subCategoryApi.sendRequest(url, handleSubcategoryResponse)

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }

  const handleSubcategoryResponse = (resp) => {

    if (
      resp?.subcategoriesWithTopics &&
      Array.isArray(resp?.subcategoriesWithTopics)
    ) {
      console.log(resp?.subcategoriesWithTopics)
      setSubCategoryList(resp?.subcategoriesWithTopics)
    }
  }

  const handleTopicSelection = (topicId) => {
    if (topicId) {
      if (activeTopic && Array.isArray(activeTopic)) {
        if (activeTopic.includes(topicId)) {
          setActiveTopic((prevValue) => {
            return prevValue.filter((row) => row !== topicId)
          })
        } else {
          setActiveTopic((prevValue) => {
            return [...prevValue, topicId]
          })
        }
      } else {
        setActiveTopic([topicId])
      }
    }
  }

  const handleCompleteProfileClick = (e) => {
    e.preventDefault()
    if (activeTopic && Array.isArray(activeTopic) && activeTopic.length > 0) {
      const payload = {
        experience: activeTopic
      }
      experienceApi.sendRequest(
        CONSTANT.API.addExperience,
        handleAddExperienceResponse,
        payload
      )
    } else {
      notify.error('Please select your experience.')
    }
  }

  const handleAddExperienceResponse = (resp) => {
    if (resp) {
      setIsExperienceGiven(true)
    }
  }

  return (
    <>
      {isExperienceGiven ? (
        <>
          <StyleCompleteProfileContainer>
            <DarkGrayLable>
              Congratulations, your profile is complete!
            </DarkGrayLable>

            <img src={PeopleImage} className='peopleImage' />
          </StyleCompleteProfileContainer>

          <StyleNextButtonContainer>
            <StyleNextButton
              onClick={() => {
                navigate(ROUTES.HOME)
              }}
            >
              Start connecting
            </StyleNextButton>
          </StyleNextButtonContainer>
        </>
      ) : (
        <>
          <DarkGrayLable>
            Important step! Select the experiences you have.
          </DarkGrayLable>
          <StyleMarginTop2>
            <StepperSubtitleBold>
              Be a SAYge! We all bring experiences with us and they hold great
              value.
            </StepperSubtitleBold>
            <StepperSubtitle>
              Select topics you have insight on through your lived experiences
              and would be willing to share.
            </StepperSubtitle>
          </StyleMarginTop2>

          <StyledExperienceContainer>
            <div className='categoryContainer'>
              {categories &&
                categories.map((category) => {
                  return (
                    <StyleCategoryCard
                      selected={category?._id === activeCategory?._id}
                      key={category?._id}
                      onClick={() => handleCategoryClick(category)}
                    >
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

            

            <div className='subCategoryContainer'>
              <p className='subCategoryHeading'>{activeCategory?.name}</p>
              {
                loading ? 
                <div className='text-center mt-5'>
                  <CircularProgress  size="2rem"/>
                </div> : 
                subCategoryList &&
                  subCategoryList.map((subCategory, index) => {
                    return (
                      <StyleSubcategoryItem
                        selected={subCategory?._id === activeSubCategory?._id}
                        onClick={() => {
                          setActiveSubCategory(subCategory)
                        }}
                        border={index !== subCategoryList.length - 1}
                      >
                        <p>{subCategory?.name}</p>
  
                        <img src={RightArrow} />
                      </StyleSubcategoryItem>
                    )
                  })
              }
             
            </div>

            <div className='topicContainer'>
              {activeSubCategory &&
                activeSubCategory?.topics &&
                activeSubCategory?.topics.map((topic, index) => {
                  return (
                    <StyleTopicItem
                      selected={
                        Array.isArray(activeTopic) &&
                        activeTopic.includes(topic?._id)
                      }
                      border={index !== subCategoryList.length - 1}
                      onClick={() => {
                        handleTopicSelection(topic?._id)
                      }}
                    >
                      <p>{topic?.name}</p>
                    </StyleTopicItem>
                  )
                })}
            </div>
          </StyledExperienceContainer>

          <StyleNextButtonContainer>
            <StyleMarginTop2 margin={'6rem'}>
              <DarkGrayLable>
                Done selecting your experiences to share?
              </DarkGrayLable>
            </StyleMarginTop2>
          </StyleNextButtonContainer>
          <StyleNextButtonContainer>
            <StyleNextButton
              onClick={(e) => {
                handleCompleteProfileClick(e)
              }}
              disabled={experienceApi.isLoading}
            >
              {experienceApi.isLoading ? `Loading...` : `Complete Profile`}
            </StyleNextButton>
          </StyleNextButtonContainer>
        </>
      )}
    </>
  )
}

export default Experiences
