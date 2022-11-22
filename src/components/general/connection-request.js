import React from 'react'
import {
  AcceptButtonStyle,
  ConnectionRequestStyle,
  DeclineButtonStyle
} from '../../style-component/connection-request'
import { isEmptyArray } from '../../utils/funcs'
import useHttp from '../../hooks/use-http'
import CONSTANT from '../../utils/constants'

const ConnectionRequest = ({ detail, getDetail }) => {
  console.log(detail)
  const requestApi = useHttp()

  const responseHandler = (resp) => {
    console.log(resp)
    if (resp) {
      getDetail()
    }
  }

  const handleAcceptDecline = (optionId, connectionId, status) => {
    console.log(optionId, connectionId)
    const payload = {
      connection_id: connectionId,
      option_id: optionId,
      status: 'accepted'
    }
    requestApi.sendRequest(
      CONSTANT.API.confirmAvailability,
      responseHandler,
      payload
    )
  }

  return (
    <ConnectionRequestStyle>
      {!isEmptyArray(detail)
        ? detail.map((conn, index) => {
            return (
              <>
                <div className='connectionRequest' key={conn?._id}>
                  <div className='connectionNameContainer'>
                    <img
                      className='connectionImage'
                      src={conn?.user?.profile_image}
                    />

                    <p className='connectionName'>{conn?.user?.name}</p>
                  </div>
                  {!isEmptyArray(conn?.options) ? (
                    <div className='availabilityContainer'>
                      {conn?.options.map((avail) => {
                        return (
                          <div key={avail?._id} className='availability'>
                            <div>
                              <p className='availabilityDay'>{avail?.day}</p>{' '}
                              <span className='availabilityTime'>
                                {avail?.time}
                              </span>
                              <p className='availabilityTimezone'>
                                ({conn?.timezone})
                              </p>
                            </div>

                            <div className='connectionAction'>
                              <DeclineButtonStyle
                                onClick={() =>
                                  handleAcceptDecline(
                                    avail?._id,
                                    conn?._id,
                                    'cancelled'
                                  )
                                }
                              >
                                Decline
                              </DeclineButtonStyle>
                              <AcceptButtonStyle
                                onClick={() =>
                                  handleAcceptDecline(
                                    avail?._id,
                                    conn?._id,
                                    'accepted'
                                  )
                                }
                              >
                                Accept
                              </AcceptButtonStyle>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : null}
                </div>
              </>
            )
          })
        : null}
    </ConnectionRequestStyle>
  )
}

export default ConnectionRequest
