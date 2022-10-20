import styled from 'styled-components'
import theme from '../../utils/variables'

export const StyledExperienceContainer = styled.div`
  display: flex;
  gap: 2rem;

  .categoryContainer {
    display: flex;
    flex-wrap: wrap;
    width: 33%;
    gap: 2rem;

    .categoryCard {
      display: flex;
      flex-direction: column;
      box-shadow: 0px 5.50327px 5.50327px rgba(0, 0, 0, 0.25);
      border-radius: 11px;
      width: 175px;

      .imageContainer {
        border-radius: 11.0065px 11.0065px 0px 0px;

        img {
          object-fit: cover;
          border-radius: 11.0065px 11.0065px 0px 0px;
          height: 125px;
          width: 175px;
        }
      }

      .labelContainer {
        text-align: center;
        border-radius: 0px 0px 11.0065px 11.0065px;
        margin: 10px;

        .label {
          color: ${theme.lightTheme.secondary.font};
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
        }
      }
    }
  }
`
