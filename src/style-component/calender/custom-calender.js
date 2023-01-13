import styled from 'styled-components'
import theme from '../../utils/variables'
import Calendar from 'react-calendar'
import { devices } from '../../utils/constants'
import { FlexCenter } from '../general'

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

    @media ${devices.laptop} {
      font-size: 18px;
    }
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
        height: 25px;
        width: 25px;
        padding: 3px;

        abbr {
          height: 25px;
          display: block;
          ${FlexCenter};
          padding: 3px;
          width: 25px;
          border-radius: 50%;
        }
      }

      .react-calendar__tile {
        padding: 0;
      }

      .react-calender__tile {
        padding: 0;

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
          /* padding: 8px; */
          border-radius: 50%;

          @media ${devices.laptop} {
            padding: 5px;
          }
        }
      }

      .react-calendar__tile--now {
        background: transparent;

        abbr {
          background: ${theme.lightTheme.primary.color};
          /* padding: 8px; */
          border-radius: 50%;

          /* @media ${devices.laptop} {
            padding: 5px;
          } */
        }
      }

      .react-calendar__tile--active {
        background: transparent;

        abbr {
          color: ${theme.lightTheme.black};
          background: ${theme.lightTheme.darkSkyBlue};
          /* padding: 8px; */
          border-radius: 50%;

          /* @media ${devices.laptop} {
            padding: 5px;
          } */
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
