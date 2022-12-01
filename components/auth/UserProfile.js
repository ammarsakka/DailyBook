import { useCookies } from 'react-cookie'

const UserProfile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const user = []

    const getUser = () => {
        return cookies.token || user
    }

    const setUser = (data) => {
        setCookie('token', JSON.stringify(data))
    }

    return {
        getUser: getUser(),
        setUser: setUser
    }
}

export default UserProfile