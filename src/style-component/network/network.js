import styled from 'styled-components'
import { Button } from '../general'

export const StyleNetworkContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: white;

  .networkContainer {
    display: flex;
    height: calc(100vh - 70px);
    padding: 30px;
    gap: 30px;

    .leftSideNetwork {
      width: 300px;

      .tabsContainer {
        width: 250px;
        margin: 0 auto;
      }
    }

    .rightSideNetwork {
      width: calc(100vw - 300px);

      .connectionContainer {
        background: #f8f8f8;
        border-radius: 10px;
        height: 100%;
        padding: 20px;
        width: 90%;
        margin: 0 auto;
        height: 100%;
        overflow-y: scroll;

        .connectionHeading {
          font-family: 'Poppins';
          font-style: normal;
          font-weight: 600;
          font-size: 20px;
          line-height: 30px;
          color: #000000;
        }

        .connectionCardContainer {
          display: grid;
          grid-template-columns: auto auto;
          gap: 20px;

          .connectionCard {
            padding: 20px 20px 30px;
            background: #ffffff;
            border-radius: 8.33333px;

            .connectionHeader {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .connectionLeft {
                display: flex;
                align-items: center;
                gap: 20px;

                img {
                  height: 55px;
                  width: 55px;
                  object-fit: cover;
                }

                .nameContainer {
                  display: flex;
                  flex-direction: column;

                  h3 {
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 600;
                    font-size: 15px;
                    line-height: 22px;
                    color: #5c5353;
                  }

                  span {
                    font-family: 'Poppins';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 10px;
                    line-height: 15px;
                    color: #5c5353;
                  }
                }
              }
            }

            .connectionDescription {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 18px;
              color: #696f79;
              margin-top: 15px;
            }
          }
        }
      }
    }
  }
`

export const StyleConnectButton = styled.button`
  ${Button}
  margin: 0;
  color: #f3f3f3;
  padding: 5px 25px;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-size: 10.1507px;
  line-height: 15px;
  box-shadow: none;
  background: #1186ef;
  border: 0.833333px solid #1186ef;
  border-radius: 5px;
`
