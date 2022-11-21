import React from 'react'
import { ConnectionRequestStyle } from '../../style-component/connection-request'
import { isEmptyArray } from '../../utils/funcs'

const ConnectionRequest = ({ detail }) => {
  console.log(detail)
  return (
    <ConnectionRequestStyle>
      {!isEmptyArray(detail)
        ? detail.map((conn, index) => {
            return (
              <div className='connectionRequest' key={conn?._id}>
                <div className='connectionNameContainer'>
                  <img
                    className='connectionImage'
                    src={conn?.user?.profile_image}
                  />

                  <p className='connectionName'>{conn?.user?.name}</p>
                </div>
                {!isEmptyArray(conn?.user?.availability) ? (
                  <div className='availabilityContainer'>
                    {conn?.user?.availability.map((avail) => {
                      return (
                        <div key={avail?._id} className='availability'>
                          <div>
                            <p className='availabilityDay'>{avail?.day}</p>{' '}
                            <span className='availabilityTime'>
                              {avail?.start_time} - {avail?.end_time}
                            </span>
                          </div>

                          <p className='availabilityTimezone'>
                            {avail?.timezone}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            )
          })
        : null}
    </ConnectionRequestStyle>
  )
}

export default ConnectionRequest
