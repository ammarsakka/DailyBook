import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import URL_API from '../components/api/Url'
import UserProfile from '../components/auth/UserProfile'
import { ChartAccount } from './dashboard/ChartAccount'
import { CompanyBookkeeping } from './dashboard/CompanyBookkeeping'
import { CompanyHome } from './dashboard/CompanyHome'

export const Company = () => {
    const { getUser } = UserProfile()
    const [user, setUser] = useState([])
    const [comapny, setCompany] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const handleCompany = () => {
            axios.post(
                URL_API,
                { play: 'getcompanies' },
                { headers: { "content-type": "application/json" } }
            ).then((result) => {
                setCompany(result.data)
            })
        }

        handleCompany()
    }, [params?.companyToken])


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

    if (!params) navigate('/dashboard')

    if (params.page === 'companies') {
        if (!params.companyToken) navigate('/dashboard')

        if (user.length !== 0) {
            if (user.role === 'manager' || user.role === 'accountant') {
                switch (params.companyPage) {
                    case 'home':
                        return <CompanyHome user={user} company={comapny.filter(item => item.company_id === params?.companyToken)} reloadUser={reloadUser} />
                    case 'bookkeeping':
                        return <CompanyBookkeeping user={user} company={comapny.filter(item => item.company_id === params?.companyToken)} reloadUser={reloadUser} />
                    case 'chartofaccount':
                        return <ChartAccount user={user} company={comapny.filter(item => item.company_id === params?.companyToken)} reloadUser={reloadUser} />
                }
            } else {
                navigate('/dashboard')
            }
        }
    } else {
        navigate('/dashboard')
    }
}
