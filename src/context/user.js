import { createContext } from 'react'

export const UserContext = createContext({
  user: null,
  setUser: (val) => {},
  profileDetail: null,
  setProfileDetail: null
})
