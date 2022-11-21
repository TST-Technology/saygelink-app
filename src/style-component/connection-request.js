import styled from 'styled-components'
import { FlexAlignCenter } from './general'

export const ConnectionRequestStyle = styled.div`
  padding: 10px 20px 30px;
  height: 400px;
  width: 500px;
  overflow-y: auto;

  .connectionRequest {
    margin-top: 20px;

    .connectionNameContainer {
      ${FlexAlignCenter};
      gap: 20px;

      .connectionImage {
        height: 45px;
        width: 45px;
        border-radius: 50%;
        object-fit: cover;
      }

      .connectionName {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #262626;
      }
    }

    .availabilityContainer {
      .availability {
        .availabilityDay {
        }

        .availabilityTime {
        }

        .availabilityTimezone {
        }
      }
    }
  }
`
