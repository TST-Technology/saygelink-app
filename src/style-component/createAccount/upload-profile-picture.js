import styled from 'styled-components'
import theme from '../../utils/variables'

export const StyleProfilePhoto = styled.div`
  border: 3px dashed ${theme.lightTheme.primary.color};
  background: rgba(171, 233, 222, 0.2);
  display: flex;
  border-radius: 14px;
  height: 120px;
  padding: 1rem 2rem;
  width: fit-content;
  margin-top: 3rem;
  min-width: 400px;

  .profileImage {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .imageContainer {
    img {
      width: 89px;
      height: 89px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .textContainer {
    display: flex;
    align-items: center;
    gap: 2rem;

    .text {
      color: ${theme.lightTheme.secondary.font};
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 0;
    }

    .removeIcon {
      cursor: pointer;
    }
  }
`

export const StyleAttachmentContainer = styled.div`
  margin-top: 7rem;
`

export const StylePdfAttachment = styled.div`
  border: 3px dashed ${theme.lightTheme.primary.color};
  background: rgba(171, 233, 222, 0.2);
  display: flex;
  border-radius: 14px;
  height: 90px;
  padding: 1rem 2rem;
  width: fit-content;
  margin-top: 3rem;
  min-width: 300px;

  .pdfFile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .imageContainer {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .textContainer {
    display: flex;
    align-items: center;
    gap: 2rem;

    .text {
      color: ${theme.lightTheme.mediumGrey};
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 0;
    }

    .removeIcon {
      cursor: pointer;
    }
  }
`
