import React, { useContext, useState } from 'react'
import {
  StepperSubtitle,
  StepperSubtitleBold,
  StyleCreateAccountBodyContainer,
  StyleNextButton,
  StyleNextButtonContainer
} from '../../style-component/createAccount/create-account'
import {
  StyleAttachmentContainer,
  StylePdfAttachment,
  StyleProfilePhoto
} from '../../style-component/createAccount/upload-profile-picture'
import { DarkGrayLable } from '../../style-component/general'
import { CreateAccountContext } from './create-account'
import ImagePreview from '../../assets/images/image-preview.svg'
import Attachment from '../../assets/images/attachment.svg'
import CloseIcon from '../../assets/images/CrossIcon.svg'
import { notify } from '../../utils/funcs'
import useHttp from '../../hooks/use-http'
import CONSTANT from '../../utils/constants'

const UploadProfilePicture = () => {
  const { formData, setStep, setFormData, step } =
    useContext(CreateAccountContext)

  const fileApi = useHttp()

  const [profileImage, setProfileImage] = useState(null)
  const [profilePreviewImage, setProfilePreviewImage] = useState(null)
  const ACCEPT_IMAGE_TYPE = 'image/png, image/jpeg, image/jpg'
  const ACCEPT_FILE_TYPE = 'application/pdf'
  const [pdfFile, setPdfFile] = useState(null)

  const handleImageChange = (event) => {
    console.log(event)
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      setProfileImage(file)
      setProfilePreviewImage(URL.createObjectURL(file))
    }
  }

  const handlePdfChange = (event) => {
    console.log(event)
    const file = event.target.files[0]
    console.log(file)
    if (file) {
      setPdfFile(file)
    }
  }

  const handleNextButtonClick = (e) => {
    e.preventDefault()
    if (profileImage) {
      const formData = new FormData()
      formData.append('image', profileImage)

      fileApi.sendRequest(
        CONSTANT.API.uploadUserProfilePicture,
        handleUploadProfileResponse,
        formData
      )
    } else {
      notify.error('Please upload your profile picture.')
    }
  }

  const handleUploadProfileResponse = (resp) => {
    console.log(resp)
    if (resp) {
      if (pdfFile) {
        const formData = new FormData()
        formData.append('file', profileImage)
        fileApi.sendRequest(
          CONSTANT.API.uploadUserFile,
          handleUserFileResponse,
          formData
        )
      } else {
        setStep((prevValue) => prevValue + 1)
      }
    }
  }

  const handleUserFileResponse = (resp) => {
    if (resp) {
      setStep((prevValue) => prevValue + 1)
    }
  }
  const removePdfFile = (e) => {
    e.preventDefault()
    setPdfFile(null)
  }

  const removeImageFile = (e) => {
    e.preventDefault()
    setProfileImage(null)
    setProfilePreviewImage(null)
  }

  return (
    <>
      <StyleCreateAccountBodyContainer>
        <DarkGrayLable>Now upload your profile picture.</DarkGrayLable>
        <StepperSubtitle>
          Having a real photo enhances a sense of trust within the network. It
          doesn’t have to be perfect!
        </StepperSubtitle>

        <StyleProfilePhoto>
          <label htmlFor='profileImage' className='profileImage'>
            <input
              name='profileImage'
              type='file'
              id='profileImage'
              hidden
              onChange={handleImageChange}
              accept={ACCEPT_IMAGE_TYPE}
            />

            <div className='imageContainer'>
              <img
                src={profilePreviewImage ? profilePreviewImage : ImagePreview}
              />
            </div>

            <div className='textContainer'>
              <p className='text'>
                {profileImage ? profileImage?.name : 'Add photo'}
              </p>
              {profileImage ? (
                <a className='removeIcon' onClick={(e) => removeImageFile(e)}>
                  <img src={CloseIcon} />
                </a>
              ) : null}
            </div>
          </label>
        </StyleProfilePhoto>

        <StyleAttachmentContainer>
          <DarkGrayLable>Upload attachment (optional).</DarkGrayLable>

          <StepperSubtitle>
            <StepperSubtitleBold>Tip: </StepperSubtitleBold>
            PDF format only
          </StepperSubtitle>

          <StylePdfAttachment>
            <label htmlFor='pdfFile' className='pdfFile'>
              <input
                name='pdfFile'
                type='file'
                id='pdfFile'
                hidden
                onChange={handlePdfChange}
                accept={ACCEPT_FILE_TYPE}
              />

              <div className='imageContainer'>
                <img src={Attachment} />
              </div>

              <div className='textContainer'>
                <p className='text'>{pdfFile ? pdfFile?.name : 'Add file'}</p>
                {pdfFile ? (
                  <a className='removeIcon' onClick={(e) => removePdfFile(e)}>
                    <img src={CloseIcon} />
                  </a>
                ) : null}
              </div>
            </label>
          </StylePdfAttachment>
        </StyleAttachmentContainer>
      </StyleCreateAccountBodyContainer>
      <StyleNextButtonContainer>
        <StyleNextButton
          onClick={(e) => {
            handleNextButtonClick(e)
          }}
          disabled={fileApi.isLoading}
        >
          {fileApi.isLoading ? 'Loading...' : `Next`}
        </StyleNextButton>
      </StyleNextButtonContainer>
    </>
  )
}

export default UploadProfilePicture
