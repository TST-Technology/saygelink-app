import React, { useEffect, useState } from 'react'
import useHttp from '../../hooks/use-http'
import CONSTANT, { ROUTES } from '../../utils/constants'
import RightArrow from '../../assets/images/RightArrow.svg'
import SearchImage from '../../assets/images/search-white.svg'
import { FindSaygeButtonStyle } from '../../style-component/dashboard/dashboard'
import {
  StyleCategoryCard,
  StyleCategoryContainer,
  StyleSubcategoryTopicItem
} from '../../style-component/category/category'
import { useNavigate } from 'react-router-dom'

const Category = ({ isFindSayge }) => {
  const categoryApi = useHttp()
  const subCategoryApi = useHttp()
  const experienceApi = useHttp()

  const [categories, setCategories] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [subCategoryList, setSubCategoryList] = useState(null)
  const [activeSubCategory, setActiveSubCategory] = useState(null)
  const [activeTopic, setActiveTopic] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    categoryApi.sendRequest(CONSTANT.API.getCategories, handleCategoryResponse)
  }

  const handleCategoryResponse = (resp) => {
    console.log(resp)
    if (resp?.categories) {
      setCategories(resp?.categories)
    }
  }

  const handleCategoryClick = (category) => {
    console.log(category?._id)
    setActiveCategory(category)
    const url = JSON.parse(JSON.stringify(CONSTANT.API.getSubcategories))
    console.log(url)
    url.endpoint = url.endpoint.replace(':categoryId', category?._id)
    console.log(url)

    subCategoryApi.sendRequest(url, handleSubcategoryResponse)
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

  const handleSubCategoryClick = (subCategory) => {
    setActiveSubCategory(subCategory)
    if (!isFindSayge) {
      setActiveTopic(() => {
        return subCategory.topics
          .filter((topic) => {
            return topic.hasExperience
          })
          .map((row) => row._id)
      })
    }
  }

  const removeSaygeApiCall = (topicId) => {
    if (topicId && !isFindSayge) {
      const url = {
        ...CONSTANT.API.removeSayge,
        endpoint: CONSTANT.API.removeSayge.endpoint.replace(':saygeId', topicId)
      }
      experienceApi.sendRequest(url)
    }
  }

  const baASaygeApiCall = (topicIds) => {
    if (topicIds && !isFindSayge) {
      const url = {
        ...CONSTANT.API.beASayge
      }
      const payload = {
        experience: topicIds
      }
      experienceApi.sendRequest(url, () => {}, payload)
    }
  }

  const handleTopicSelection = (topicId) => {
    if (topicId) {
      if (activeTopic && Array.isArray(activeTopic) && !isFindSayge) {
        if (activeTopic.includes(topicId)) {
          setActiveTopic((prevValue) => {
            return prevValue.filter((row) => row !== topicId)
          })
          removeSaygeApiCall(topicId)
        } else {
          setActiveTopic((prevValue) => {
            const tempTopicIds = [...prevValue, topicId]
            baASaygeApiCall([topicId])
            return [...tempTopicIds]
          })
        }
      } else {
        const tempTopicIds = [topicId]
        baASaygeApiCall(tempTopicIds)
        setActiveTopic([...tempTopicIds])
      }
    }
  }

  const handleFindSayge = () => {
    if (activeTopic) {
      const topicId = activeTopic[0]
      if (topicId) navigate(ROUTES.HEALTHCARE.replace(':topicId', topicId))
    }
  }

  return (
    <StyleCategoryContainer>
      <div className='categoryPageContainer'>
        <div className='categorySection'>
          <h3 className='heading'>Explore Catagories</h3>
          <p className='subHeading'>Browse topics</p>

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
                      <img src={category?.image} className='categoryImage' />
                    </div>
                    <div className='labelContainer'>
                      <span className='label'>{category?.name}</span>
                    </div>
                  </StyleCategoryCard>
                )
              })}
          </div>
        </div>

        <div className='topicSection'>
          <div>
            <h3 className='heading'>Choose topics</h3>
            <p className='subHeading'>
              Tip: Choosing the topics in which you can share invalue-able
              information and experience will bring a sense of expertise.
            </p>
          </div>
          <div className='topicSectionContainer'>
            <div className='subCategorySection'>
              {subCategoryList &&
                subCategoryList.map((subCategory, index) => {
                  return (
                    <StyleSubcategoryTopicItem
                      key={subCategory?._id}
                      selected={subCategory?._id === activeSubCategory?._id}
                      onClick={() => {
                        handleSubCategoryClick(subCategory)
                      }}
                      border={index !== subCategoryList.length - 1}
                    >
                      <p className='label'>{subCategory?.name}</p>

                      <img src={RightArrow} />
                    </StyleSubcategoryTopicItem>
                  )
                })}
            </div>
            <div className='topicSection'>
              {activeSubCategory &&
                activeSubCategory?.topics &&
                activeSubCategory?.topics.map((topic, index) => {
                  return (
                    <StyleSubcategoryTopicItem
                      key={topic?._id}
                      isFindSayge={!isFindSayge}
                      selected={
                        Array.isArray(activeTopic) &&
                        activeTopic.includes(topic?._id)
                      }
                      border={index !== subCategoryList.length - 1}
                      onClick={() => {
                        handleTopicSelection(topic?._id)
                      }}
                    >
                      <p className='label'>{topic?.name}</p>

                      {isFindSayge ? <img src={RightArrow} /> : null}
                    </StyleSubcategoryTopicItem>
                  )
                })}
            </div>
          </div>
        </div>
      </div>

      {isFindSayge && Array.isArray(activeTopic) && activeTopic.length > 0 ? (
        <div className='findASaygeButtonContainer'>
          <FindSaygeButtonStyle onClick={handleFindSayge}>
            <img src={SearchImage} />
            Find A SAYge
          </FindSaygeButtonStyle>
        </div>
      ) : null}
    </StyleCategoryContainer>
  )
}

export default Category
