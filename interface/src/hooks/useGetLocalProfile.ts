import { useContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import Web3AuthContext from '../pages/Web3AuthContext'

const initialState = {
  profileLink: '/',
  noProfileLink: '/',
}

/**
 * Note - this will only work if the app is on the same domain
 */
const useGetLocalProfile = () => {
  const [profile, setProfile] = useState(initialState)
  const { account } = useContext(Web3AuthContext)

  useEffect(() => {
    if (account) {
      try {
        const localData = Cookies.get(`profile_${account}`)

        if (localData) {
          const localProfile = JSON.parse(localData)

          setProfile((prevProfile) => ({
            ...prevProfile,
            username: localProfile.username,
            image: localProfile.avatar,
          }))
        }
      } catch (error) {
        setProfile(initialState)
      }
    } else {
      setProfile(initialState)
    }
  }, [account, setProfile])

  return profile
}

export default useGetLocalProfile
