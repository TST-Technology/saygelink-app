import styled from 'styled-components'
import { DashboardHeaderHeight, devices } from '../../utils/constants'
import theme from '../../utils/variables'
import { Button, InputStyle } from '../general'

export const ChatInputHeight = '127px'

const LEFT_WIDTH = 'min(370px, 40%)'

export const MessageContainerStyle = styled.div`
  background: ${theme.lightTheme.quillGrey};
  height: calc(100vh - ${DashboardHeaderHeight});

  .messageContainer {
    background: ${theme.lightTheme.desertStorm};
    display: flex;
    margin: 20px auto 40px auto;
    width: 85%;
    height: calc(100% - 60px);
    border-radius: 8.33333px;

    @media ${devices.tablet} {
      width: 90%;
    }

    .leftSection {
      background: ${theme.lightTheme.seashell};
      width: ${LEFT_WIDTH};
      height: 100%;
      border-right: 3px solid rgba(204, 204, 204, 0.25);
      display: flex;
      flex-direction: column;
      border-radius: 8.33333px;

      .membersHeadingContainer {
        display: flex;
        align-items: center;
        height: ${DashboardHeaderHeight};
        min-height: ${DashboardHeaderHeight};
        border-bottom: 0.833333px solid rgba(38, 38, 38, 0.2);

        .membersHeading {
          color: ${theme.lightTheme.primary.textcolor};
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          margin-left: 20px;
          margin-bottom: 0;
        }
      }

      .membersChatListing {
        position: relative;
        padding: 10px;
        height: calc(100% - ${DashboardHeaderHeight});
        overflow-y: auto;

        .searchImage {
          position: absolute;
          left: 20px;
          top: 21px;
        }
      }
    }

    .rightSection {
      background: ${theme.lightTheme.seashell};

      height: 100%;
      display: flex;
      flex-direction: column;
      border-radius: 8.33333px;

      .activeChatNameContainer {
        display: flex;
        justify-content: space-between;
        position: relative;
        gap: 20px;
        padding: 0 30px;
        height: ${DashboardHeaderHeight};
        min-height: ${DashboardHeaderHeight};
        border-bottom: 0.833333px solid rgba(38, 38, 38, 0.2);

        .leftContainer,
        .rightContainer {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nameContainer {
          display: flex;
          justify-content: center;
          flex-direction: column;
          gap: 0px;

          .nameText {
            margin: 0;
            margin-top: 10px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 15px;
            line-height: 22px;
            color: ${theme.lightTheme.primary.textcolor};
          }

          .roleText {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 500;
            font-size: 10px;
            line-height: 15px;
            color: rgba(38, 38, 38, 0.4);
          }
        }

        .rightContainer {
          gap: 10px;

          p {
            font-family: 'Poppins';
            font-style: normal;
            cursor: pointer;
            font-weight: 600;
            font-size: 11.6667px;
            line-height: 17px;
            padding: 10px 7px;
            margin: 0;
            background: rgba(246, 46, 95, 0.1);
            border-radius: 10.8333px;
            color: ${theme.lightTheme.secondary.color};
          }
        }

        .profileImage {
          height: 33.3px;
          width: 33.3px;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .chatContainer {
        height: calc(100% - ${DashboardHeaderHeight});

        .chatMessagesContainer {
          display: flex;
          flex-direction: column;
          padding: 30px;
          height: calc(100% - ${ChatInputHeight});
          overflow-y: auto;

          .chatDateText {
            text-align: center;
            margin: 30px;
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 17px;
            color: ${theme.lightTheme.secondary.font};
          }
        }

        .chatInputContainer {
          position: relative;
          padding: 20px 30px 60px;
          height: ${ChatInputHeight};
        }
      }
    }

    .rightSectionContainer {
      background: #f0f0f0;
      width: calc(100% - ${LEFT_WIDTH});
    }
  }
`

export const SearchInputStyle = styled.input`
  ${InputStyle}
  padding: 2px 18px 2px 40px;
  background-color: rgba(38, 38, 38, 0.06);
  color: rgba(38, 38, 38, 0.4);
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 13.3333px;
  line-height: 20px;
  width: 100%;
  border-radius: 14.1667px;
  margin-bottom: 20px;

  &::placeholder {
    color: rgba(38, 38, 38, 0.4);
  }
`

export const UserChatStyle = styled.div`
  background: ${(props) =>
    props.selected ? theme.lightTheme.aquaSqueeze : 'transparent'};
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  position: relative;
  border-radius: 14.1667px;
  gap: 20px;
  padding-left: 20px;
  height: 60px;

  .leftContainer,
  .rightContainer {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .unreadMessage {
    background: #f62e5f;
    border-radius: 33.3333px;
    width: 8.33px;
    height: 8.33px;
    margin-right: 20px;
  }

  .activeUser {
    position: absolute;
    width: 7.78px;
    height: 7.78px;
    background: #07d71c;
    border: 0.833333px solid #ffffff;
    top: 37px;
    left: 46px;
  }

  .profileImage {
    height: 33.3px;
    width: 33.3px;
    border-radius: 50%;
    object-fit: cover;
  }

  .nameContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 0px;

    .nameText {
      margin: 0;
      margin-top: 10px;
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 22px;
      color: ${theme.lightTheme.primary.textcolor};
    }

    .roleText {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 500;
      font-size: 10px;
      line-height: 15px;
      color: rgba(38, 38, 38, 0.4);
    }
  }
`

export const MessageStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.sent ? 'end' : 'start')};

  .messageText {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 12.5px;
    line-height: 19px;
    color: ${theme.lightTheme.primary.textcolor};
    background: ${(props) =>
      props.sent ? theme.lightTheme.black : 'rgba(38, 38, 38, 0.05)'};
    border-radius: 6.66667px;
    padding: 10px 15px;
    margin-bottom: 8px;
    max-width: 70%;
  }

  .messageHelperText {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 8.33333px;
    line-height: 12px;
    margin-bottom: 10px;
    color: rgba(38, 38, 38, 0.2);
  }
`

export const MessageInputStyle = styled.input`
  ${InputStyle}
  padding: 32px 18px;
  background-color: rgba(38, 38, 38, 0.06);
  color: rgba(38, 38, 38, 0.4);
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 22px;
  width: 100%;
  border-radius: 14.1667px;

  &::placeholder {
    color: rgba(38, 38, 38, 0.4);
  }
`

export const SendButtonStyle = styled.button`
  ${Button}
  margin: 0;
  background: ${theme.lightTheme.secondary.color};
  color: ${theme.lightTheme.black};
  border-radius: 10.8333px;
  font-weight: 500;
  font-size: 18.3333px;
  line-height: 27px;
  padding: 8px 25px;
  font-family: 'Poppins';
  position: absolute;
  right: 50px;
  top: 31px;
`
