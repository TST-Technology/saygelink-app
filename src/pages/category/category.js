import React from 'react'
import { StyleCategoryContainer } from '../../style-component/category/category'

const Category = () => {
  return (
    <StyleCategoryContainer>
      <div className='categoryPageContainer'>
        <div className='categorySection'>
          <h3 className='heading'>Explore Catagories</h3>
          <p className='subHeading'>Browse topics</p>
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
            <div className='subCategorySection'></div>
            <div className='topicSection'></div>
          </div>
        </div>
      </div>
    </StyleCategoryContainer>
  )
}

export default Category
