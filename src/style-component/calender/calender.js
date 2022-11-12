import styled from 'styled-components'
import Calendar from 'react-calendar'
import { DashboardHeaderHeight } from '../../utils/constants'
import theme from '../../utils/variables'
import {
  Button,
  FlexAlignCenter,
  FlexCenter,
  FlexJustifySpaceBetween
} from '../general'

const CALENDER_LEFT_WIDTH = '350px'
const CALENDER_PREVIEW_HEADER = '95px'
const CALENDER_EVENT_LEFT = '200px'

export const CalenderContainerStyle = styled.div`
  background: ${theme.lightTheme.quillGrey};
  height: calc(100vh - ${DashboardHeaderHeight});

  .calenderPageContainer {
    display: flex;
    gap: 20px;
    width: 85%;
    margin: 20px auto 40px auto;
    height: calc(100% - 60px);

    .calenderLeft {
      width: ${CALENDER_LEFT_WIDTH};
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

        .calenderPreviewHeaderSectionContainer {
          ${FlexJustifySpaceBetween}
          width: 85%;
          margin: 0 auto;

          .calenderPreviewHeaderSection {
            ${FlexAlignCenter}
            gap: 10px;
            background: ${theme.lightTheme.iceCold};
            height: 45px;
            padding: 0 12px;
            border-radius: 11.6667px;

            p {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 500;
              font-size: 16.6667px;
              line-height: 25px;
              color: ${theme.lightTheme.secondary.font};
              margin: 0;
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
                font-family: 'Poppins';
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

                .calenderPreviewEventCardLeft {
                  display: flex;
                  gap: 20px;

                  .calenderPreviewEventImageContainer {
                  }

                  .calenderPreviewEventTitleContainer {
                    h3 {
                      font-family: 'Poppins';
                      font-style: normal;
                      font-weight: 500;
                      font-size: 15px;
                      line-height: 22px;
                      color: #000000;
                    }

                    p {
                      font-family: 'Poppins';
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 17px;
                      color: #696f79;
                      margin-bottom: 0;
                    }

                    a {
                      font-family: 'Poppins';
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
                }
              }
            }
          }
        }
      }
    }
  }
`

export const CalenderEventButtonStyle = styled.button`
  ${Button}
  margin: 0;
  box-shadow: none;
  heigh: fit-content;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000000;
`

export const ReactCalenderStyle = styled(Calendar)`
  padding: 15px;
  background: ${theme.lightTheme.black};
  border-radius: 13.3333px;
  border: none;
  font-family: Poppins;

  //   Start:: Calender Header Style

  .react-calendar__navigation {
    margin-top: 8px;
    gap: 10px;
    height: 30px;
  }

  .react-calendar__navigation__prev2-button,
  .react-calendar__navigation__next2-button {
    display: none;
  }

  .react-calendar__navigation__next-button,
  .react-calendar__navigation__prev-button {
    order: 1;
    font-size: 1.6rem;
    background: ${theme.lightTheme.darkSkyBlue};
    color: ${theme.lightTheme.black};
    border-radius: 6.66667px;
    min-width: 30px;
  }

  .react-calendar__navigation__prev-button {
    margin-left: auto;
  }

  .react-calendar__navigation__label {
    order: 0;
    flex-grow: 0 !important;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 30px;
    color: ${theme.lightTheme.primary.textcolor};
  }
  //   End:: Calender Header Style

  // Start:: Calender Body Style

  .react-calendar__viewContainer {
    background: rgba(17, 134, 239, 0.1);
    border-radius: 11.6667px;
    padding: 10px;
    font-size: 12px;

    abbr[title] {
      text-decoration: none;
      font-family: 'Lato';
      font-style: normal;
      font-weight: 500;
      font-size: 8px;
      line-height: 8px;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      color: ${theme.lightTheme.white};
    }

    .react-calendar__month-view {
      .react-calendar__month-view__days__day,
      .react-calendar__month-view__days__day--weekend {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 14px;
        color: ${theme.lightTheme.white};

        abbr {
          height: 25px;
          width: 25px;
        }
      }

      .react-calender__tile {
        abbr {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 14px;
        }
      }

      .react-calendar__tile:enabled:hover {
        background-color: transparent;

        abbr {
          background: ${theme.lightTheme.quillGrey};
          padding: 8px;
          border-radius: 50%;
        }
      }

      .react-calendar__tile--now {
        background: transparent;

        abbr {
          background: ${theme.lightTheme.primary.color};
          padding: 8px;
          border-radius: 50%;
        }
      }

      .react-calendar__tile--active {
        background: transparent;

        abbr {
          color: ${theme.lightTheme.black};
          background: ${theme.lightTheme.darkSkyBlue};
          padding: 8px;
          border-radius: 50%;
        }
      }

      .react-calendar__month-view__days__day--neighboringMonth {
        color: ${theme.lightTheme.boulder};
      }
    }

    .react-calendar__year-view {
      .react-calendar__tile--now {
        background: ${theme.lightTheme.primary.color};
      }
    }
  }
  // End:: Calender Body Style
`
