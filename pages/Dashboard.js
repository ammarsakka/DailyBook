import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Home } from './dashboard/Home'
import { CgSpinner } from 'react-icons/cg'
import axios from 'axios'
import UserProfile from '../components/auth/UserProfile'
import URL_API from '../components/api/Url'
import { Users } from './dashboard/Users'
import { Companies } from './dashboard/Companies'

export const Dashboard = () => {
    const params = useParams().page
    const { getUser } = UserProfile()
    const [user, setUser] = useState([])

    const navigate = useNavigate()


    const handleUser = useCallback(() => {
        if (getUser.length !== 0) {
            axios.post(
                URL_API,
                {
                    username: getUser[0]?.username,
                    fullname: getUser[0]?.fullname,
                    play: 'access'
                },
                { headers: { "content-type": "application/json" } }
            ).then((result) => {
                setUser(result.data)
            })
        } else {
            navigate('/sign-in')
        }
    }, [])

    useEffect(handleUser, [])

    const reloadUser = () => {
        handleUser()
    }

    if (user.length !== 0) {
        switch (params) {
            case 'dashboard':
                return <Home user={user} reloadUser={reloadUser} />
            case 'users':
                if (user?.role === 'manager' || user?.role === 'admin') {
                    return <Users user={user} reloadUser={reloadUser} />
                } else {
                    navigate('/dashboard')
                }
            case 'companies':
                if (user?.role === 'manager') {
                    return <Companies user={user} reloadUser={reloadUser} />
                } else {
                    navigate('/dashboard')
                }
            default:
                return <Home user={user} reloadUser={reloadUser} />
        }
    } else {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <CgSpinner size={75} className='animate-spin' />
            </div>
        )
    }
}
