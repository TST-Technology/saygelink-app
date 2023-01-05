import styled from 'styled-components'
import { devices } from '../../utils/constants'
import { Button, FlexAlignCenter, FlexJustifySpaceBetween } from '../general'

export const EventDetailStyle = styled.div`
  .eventImage {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
  }

  .titleContainer {
    ${FlexAlignCenter};
    margin-top: 40px;
    gap: 20px;

    .eventTitle {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 600;
      font-size: 25px;
      line-height: 38px;
      color: #5c5353;
      margin-bottom: 0;
    }

    .memberCount {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #939393;
    }
  }

  .eventDetailText {
  }

  .eventDetailParticipantContainer {
    margin-top: 50px;
    display: flex;
    gap: 20px;

    @media ${devices.tablet} {
     flex-direction: column-reverse;
    }

    .eventDetailPostContainer {
      width: 70%;
      border-right: 1px solid #d4d4d4;

      @media ${devices.tablet} {
        width: 100%;
        border-right:none;
      }
    }

    .eventParticipantsDetail {
      width: 30%;
      @media ${devices.tablet} {
          width: 100%;
      }

      .participantsLisContainer {
        padding-right: 20px;

        @media ${devices.tablet} {
          display: flex;
          width: 100%;
          overflow-y: scroll;
          gap: 20px;
        }

        .participantCard {
          background: #ffffff;
          box-shadow: 0px 6.23214px 46.7411px rgba(21, 34, 72, 0.06);
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          @media ${devices.tablet} {
            width: 275px;
            height: 260px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .participantHeader {
            ${FlexJustifySpaceBetween};
            gap: 20px;
            width: 100%;

            .participantImage {
              height: 80px;
              width: 80px;
              border-radius: 50%;
              object-fit: cover;
            }
          }

          .participantName {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 600;
            font-size: 20px;
            line-height: 30px;
            color: #5c5353;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .participantExperience {
            font-family: 'Poppins';
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 18px;
            color: #5c5353;
          }
        }
      }
    }
  }
`

export const StyleViewButton = styled.button`
  ${Button}
  width: 100%;
  margin: 0;
  box-shadow: none;
  border: 1.16098px solid #abe9dc;
  background: #1186ef;
  border-radius: 9px;
  color: #ffffff;
`
