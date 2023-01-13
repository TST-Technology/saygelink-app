import React from 'react'
import {
  AcceptButtonStyle,
  ConnectionRequestStyle,
  DeclineButtonStyle
} from '../../style-component/connection-request'
import { isEmptyArray, notify } from '../../utils/funcs'
import useHttp from '../../hooks/use-http'
import CONSTANT from '../../utils/constants'
import ImageRole from './image-role'
import Loader from './loader'

const ConnectionRequest = ({ detail, getDetail }) => {
  console.log(detail)
  const requestApi = useHttp()

  const responseHandler = (resp) => {
    console.log(resp)
    if (resp) {
      getDetail()
      notify.success(
        'Confirmed! You can view your call in the Calendar section.'
      )
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
      <>
        {requestApi.isLoading ? (
          <Loader height={'350px'} />
        ) : (
          <>
            {!isEmptyArray(detail) ? (
              detail.map((conn, index) => {
                return (
                  <>
                    <div className='connectionRequest' key={conn?._id}>
                      <div className='connectionNameContainer'>
                        <ImageRole
                          className='connectionImage'
                          src={conn?.user?.profile_image}
                          role={conn?.user?.qualification}
                        />

                        <p className='connectionName'>{conn?.user?.name}</p>
                      </div>
                      {!isEmptyArray(conn?.options) ? (
                        <div className='availabilityContainer'>
                          {conn?.options.map((avail) => {
                            return (
                              <div key={avail?._id} className='availability'>
                                <div>
                                  <p className='availabilityDay'>
                                    {avail?.day}
                                  </p>{' '}
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
                                    disabled={requestApi.isLoading}
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
                                    disabled={requestApi.isLoading}
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
            ) : (
              <p className='mt-2 text-center'>No Connection Requests.</p>
            )}
          </>
        )}
      </>
    </ConnectionRequestStyle>
  )
}

export default ConnectionRequest
