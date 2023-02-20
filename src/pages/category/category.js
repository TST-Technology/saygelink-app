import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import CONSTANT, { DashboardHeaderHeight, ROUTES } from "../../utils/constants";
import RightArrow from "../../assets/images/RightArrow.svg";
import SearchImage from "../../assets/images/search-white.svg";
import DefaultCategoryImage from "../../assets/images/defaultCategoryImage.svg";
import { FindSaygeButtonStyle } from "../../style-component/dashboard/dashboard";
import {
  StyleCategoryCard,
  StyleCategoryContainer,
  StyleSubcategoryTopicItem
} from "../../style-component/category/category";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/general/loader";

const Category = ({ isFindSayge }) => {
  const categoryApi = useHttp();
  const subCategoryApi = useHttp();
  const experienceApi = useHttp();
  const { categoryId } = useParams();
  const subApi = useHttp();

  const [categories, setCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      handleCategoryClick(categoryId);
    }
  }, [categoryId]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    categoryApi.sendRequest(CONSTANT.API.getCategories, handleCategoryResponse);
  };

  const handleCategoryResponse = (resp) => {
    if (resp?.categories) {
      setCategories(resp?.categories);
      if (!categoryId && resp?.categories && resp?.categories[0]) {
        handleCategoryClick(resp?.categories[0]?._id);
      }
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    const url = JSON.parse(JSON.stringify(CONSTANT.API.getSubcategories));

    url.endpoint = url.endpoint.replace(":categoryId", categoryId);

    setSubCategoryList(null);
    setActiveSubCategory(null);
    subCategoryApi.sendRequest(url, handleSubcategoryResponse);
  };

  const handleSubcategoryResponse = (resp) => {
    if (
      resp?.subcategoriesWithTopics &&
      Array.isArray(resp?.subcategoriesWithTopics)
    ) {
      setSubCategoryList(resp?.subcategoriesWithTopics);
    }
  };

  const handleSubCategoryClick = (subCategory) => {
    setActiveSubCategory(subCategory);
    if (!isFindSayge) {
      setActiveTopic(() => {
        return subCategory.topics
          .filter((topic) => {
            return topic.hasExperience;
          })
          .map((row) => row._id);
      });
    }
  };

  const removeSaygeApiCall = (topicId) => {
    if (topicId && !isFindSayge) {
      const url = {
        ...CONSTANT.API.removeSayge,
        endpoint: CONSTANT.API.removeSayge.endpoint.replace(":saygeId", topicId)
      };
      experienceApi.sendRequest(url);
    }
  };

  const baASaygeApiCall = (topicIds) => {
    if (topicIds && !isFindSayge) {
      const url = {
        ...CONSTANT.API.beASayge
      };
      const payload = {
        experience: topicIds
      };
      experienceApi.sendRequest(url, () => {}, payload);
    }
  };

  const handleTopicSelection = (topicId) => {
    if (topicId) {
      if (activeTopic && Array.isArray(activeTopic) && !isFindSayge) {
        if (activeTopic.includes(topicId)) {
          setActiveTopic((prevValue) => {
            return prevValue.filter((row) => row !== topicId);
          });
          removeSaygeApiCall(topicId);
        } else {
          setActiveTopic((prevValue) => {
            const tempTopicIds = [...prevValue, topicId];
            baASaygeApiCall([topicId]);
            return [...tempTopicIds];
          });
        }
      } else {
        const tempTopicIds = [topicId];
        setActiveTopic([...tempTopicIds]);
        if (topicId) navigate(ROUTES.HEALTHCARE.replace(":topicId", topicId));
      }
    }
  };

  const handleFindSayge = () => {
    if (activeTopic) {
      const topicId = activeTopic[0];
      if (topicId) navigate(ROUTES.HEALTHCARE.replace(":topicId", topicId));
    }
  };

  return (
    <StyleCategoryContainer>
      {categoryApi.isLoading ? (
        <Loader height={`calc(100vh - ${DashboardHeaderHeight})`} />
      ) : (
        <div className='categoryPageContainer'>
          <div className='categorySection'>
            <h3 className='heading'>Explore Catagories</h3>
            <p className='subHeading'>Browse topics</p>

            <div className='categoryContainer'>
              {categories &&
                categories.map((category) => {
                  return (
                    <StyleCategoryCard
                      selected={category?._id === activeCategory}
                      key={category?._id}
                      onClick={() => handleCategoryClick(category?._id)}
                    >
                      <div className='imageContainer'>
                        <img
                          src={
                            category?.image
                              ? category?.image
                              : DefaultCategoryImage
                          }
                          className='categoryImage'
                        />
                      </div>
                      <div className='labelContainer'>
                        <span className='label'>{category?.name}</span>
                      </div>
                    </StyleCategoryCard>
                  );
                })}
            </div>
          </div>

          <div className='topicSection'>
            <div>
              <h3 className='newHeading'>
                {isFindSayge ? "Find a SAYge" : "Be a SAYge"}
              </h3>
              <p className='newSubHeading'>
                {isFindSayge
                  ? "Members have signed up to share their insight and are waiting to chat with you. Select a topic to get started!"
                  : "Select topics you have insight on through your experiences and you would be willing to chat with a matched member about!"}
              </p>
            </div>
            <div className='topicSectionContainer'>
              <div className='subCategorySection'>
                {subCategoryApi.isLoading ? (
                  <Loader height='100%' />
                ) : (
                  <>
                    {subCategoryList &&
                      subCategoryList.map((subCategory, index) => {
                        return (
                          <StyleSubcategoryTopicItem
                            key={subCategory?._id}
                            selected={
                              subCategory?._id === activeSubCategory?._id
                            }
                            onClick={() => {
                              handleSubCategoryClick(subCategory);
                            }}
                            border={index !== subCategoryList.length - 1}
                          >
                            <p className='label'>{subCategory?.name}</p>

                            <img src={RightArrow} />
                          </StyleSubcategoryTopicItem>
                        );
                      })}
                  </>
                )}
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
                          handleTopicSelection(topic?._id);
                        }}
                      >
                        <p className='label'>{topic?.name}</p>
                      </StyleSubcategoryTopicItem>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {isFindSayge && Array.isArray(activeTopic) && activeTopic.length > 0 ? (
        <div className='findASaygeButtonContainer'>
          <FindSaygeButtonStyle onClick={handleFindSayge}>
            <img src={SearchImage} />
            Find A SAYge
          </FindSaygeButtonStyle>
        </div>
      ) : null} */}
    </StyleCategoryContainer>
  );
};

export default Category;
