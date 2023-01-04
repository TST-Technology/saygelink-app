import styled from 'styled-components'
import theme from '../../utils/variables'
import { FlexAlignCenter, FlexJustifyCenter } from '../general'

export const BottomFixedStyle = styled.div`
  position: fixed;
  bottom: 0;
  right: 30px;
  height: 64px;
  min-width: 420px;
  background: ${theme.lightTheme.black};
  box-shadow: 0px -3px 14px rgba(52, 52, 52, 0.15);
  border-radius: 10px 10px 0px 0px;
  ${FlexAlignCenter};

  ${(props) => {
    if (props.isOpen) {
      return {
        minHeight: 'calc(100% - 300px)',
        maxHeight: 'calc(100% - 500px)',
        overflowY: 'auto',
        height: 'auto',
        alignItems: 'flex-start'
      }
    }
  }}

  .collapsedMenu {
    padding: 0 20px;
    ${FlexAlignCenter};
    justify-content: space-between;
    width: 100%;
  }

  .nameContainer {
    ${FlexAlignCenter};
    gap: 20px;

    .profileFloaterImage {
      height: 33px;
      width: 33px;
      object-fit: cover;
      border-radius: 50%;
    }

    p {
      margin: 0;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 15.8482px;
      line-height: 24px;
      color: ${theme.lightTheme.primary.textcolor};
    }
  }

  .buttonContainer {
    display: flex;
    gap: 20px;

    .arrow {
      transform: rotate(-90deg);
      cursor: pointer;
    }

    .count {
      ${FlexJustifyCenter};
      align-items: center;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      background: ${theme.lightTheme.radicalRed};
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 15.8482px;
      line-height: 24px;
      color: ${theme.lightTheme.black};
    }
  }

  .arrowDown {
    transform: rotate(90deg);
    cursor: pointer;
    margin-right: 20px;
  }
`
