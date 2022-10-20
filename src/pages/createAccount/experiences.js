import React, { useEffect } from 'react'
import useHttp from '../../hooks/use-http'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleMarginTop2
} from '../../style-component/createAccount/create-account'
import { DarkGrayLable } from '../../style-component/general'
import CONSTANT from '../../utils/constants'

const Experiences = () => {
  const categoryApi = useHttp()

  const [categories, setCategories] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

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

  return (
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
          Select topics you have insight on through your lived experiences and
          would be willing to share.
        </StepperSubtitle>
      </StyleMarginTop2>
    </>
  )
}

export default Experiences
