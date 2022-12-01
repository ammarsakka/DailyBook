import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import UserProfile from '../components/auth/UserProfile'

export const SignOut = () => {
    const navigate = useNavigate()
    const { getUser, setUser } = UserProfile()

    useEffect(() => {
        if (getUser.lenght !== 0) {
            setUser([])
            navigate('/')
        } else {
            navigate('/')
        }
    }, [getUser])
}
