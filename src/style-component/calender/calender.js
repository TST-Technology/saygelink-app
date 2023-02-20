import styled from "styled-components";
import { DashboardHeaderHeight, devices } from "../../utils/constants";
import theme from "../../utils/variables";
import {
  Button,
  FlexAlignCenter,
  FlexCenter,
  FlexJustifySpaceBetween
} from "../general";

const CALENDER_LEFT_WIDTH = "min(320px, 30%)";
const CALENDER_PREVIEW_HEADER = "75px";
const CALENDER_EVENT_LEFT = "min(200px, 20%)";

export const CalenderContainerStyle = styled.div`
  background: ${theme.lightTheme.quillGrey};
  height: calc(100vh - ${DashboardHeaderHeight});

  .calenderPageContainer {
    display: flex;
    gap: 20px;
    width: 85%;
    margin: 20px auto 40px auto;
    height: calc(100% - 60px);

    @media ${devices.laptop} {
      width: 90%;
    }

    @media ${devices.tablet} {
      width: 95%;
    }

    .calenderLeft {
      width: ${CALENDER_LEFT_WIDTH};
      @media ${devices.tablet} {
        width: min(320px, 40%);
      }

      .noteCalender {
        font-size: 16px;
      }
    }

    .calenderRight {
      width: calc(100vw - ${CALENDER_LEFT_WIDTH});
      display: flex;
      flex-direction: column;

      .calenderPreviewHeader {
        height: ${CALENDER_PREVIEW_HEADER};
        background: ${theme.lightTheme.primary.color};
        border-radius: 13px 13px 0px 0px;
        ${FlexAlignCenter}
        width: 100%;

        @media ${devices.tablet} {
          height: 70px;
        }

        .calenderPreviewHeaderSectionContainer {
          ${FlexJustifySpaceBetween}
          width: 85%;
          margin: 0 auto;

          @media ${devices.tablet} {
            width: 90%;
          }

          .calenderPreviewHeaderSection {
            ${FlexAlignCenter}
            gap: 10px;
            background: ${theme.lightTheme.iceCold};
            height: 45px;
            padding: 0 12px;
            border-radius: 11.6667px;

            img {
              cursor: pointer;
              @media ${devices.tablet} {
                width: 20px;
              }
            }

            p {
              font-family: "Poppins";
              font-style: normal;
              font-weight: 500;
              font-size: 16.6667px;
              line-height: 25px;
              color: ${theme.lightTheme.secondary.font};
              margin: 0;
              @media ${devices.tablet} {
                font-size: 14.6667px;
              }
            }
          }
        }
      }

      .calenderPreviewBody {
        height: calc(100% - ${CALENDER_PREVIEW_HEADER});
        background: ${theme.lightTheme.desertStorm};
        border-radius: 0px 0px 13px 13px;
        padding: 20px 20px 35px;

        .calenderPreviewEventsContainer {
          background: ${theme.lightTheme.black};
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          overflow-y: auto;

          .calenderPreviewEventSection {
            ${FlexAlignCenter}
            height: fit-content;
            width: 100%;

            .calenderPreviewEventsLeft {
              ${FlexCenter}
              height: 100%;
              width: ${CALENDER_EVENT_LEFT};
              border-right: 3.33333px solid rgba(38, 38, 38, 0.08);

              p {
                margin-bottom: 0;
                font-family: "Poppins";
                font-style: normal;
                font-weight: 500;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: 0.03em;
                color: #262626;
              }
            }

            .calenderPreviewEventsRight {
              height: 100%;
              width: calc(100% - ${CALENDER_EVENT_LEFT});
              padding: 10px 20px;
              margin-top: 10px;

              .calenderPreviewEventCard {
                ${FlexJustifySpaceBetween}
                padding: 10px 20px;
                background: rgba(38, 38, 38, 0.04);
                border-radius: 13.3333px;

                @media ${devices.laptop} {
                  flex-wrap: wrap;
                  gap: 20px;
                  padding-bottom: 20px;
                }

                .calenderPreviewEventCardLeft {
                  display: flex;
                  gap: 20px;

                  .calenderPreviewEventImageContainer {
                    .calenderImage {
                      height: 40px;
                      width: 40px;
                      object-fit: cover;
                      border-radius: 50%;
                      cursor: pointer;
                    }
                  }

                  .calenderPreviewEventTitleContainer {
                    h3 {
                      font-family: "Poppins";
                      font-style: normal;
                      font-weight: 500;
                      font-size: 15px;
                      line-height: 22px;
                      color: #000000;
                    }

                    p {
                      font-family: "Poppins";
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 17px;
                      color: #696f79;
                      margin-bottom: 0;
                    }

                    a {
                      font-family: "Poppins";
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 17px;
                      text-decoration-line: underline;
                      color: #696f79;
                    }
                  }
                }
                .calenderPreviewEventCardRight {
                  ${FlexAlignCenter}
                  gap: 20px;

                  .width-fixed {
                    width: 130px;
                  }

                  .meetingButton {
                    margin: 0;
                    box-shadow: none;
                    heigh: fit-content;
                    font-family: "Poppins";
                    font-style: normal;
                    font-weight: 400;
                    font-size: 12px;
                    line-height: 17px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: #000000;
                    padding: 10px;
                    text-decoration: none;
                    background: ${theme.lightTheme.primary.color};
                    border-radius: 6px;
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CalenderEventButtonStyle = styled.button`
  ${Button}
  margin: 0;
  box-shadow: none;
  heigh: fit-content;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000000;
`;
