import { Avatar } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import URL_API from '../../components/api/Url'
import { Controller } from '../../components/header/Controller'

const page = 'dashboard'

export const Home = ({ user, reloadUser }) => {
    const [users, setUsers] = useState([])
    const [companies, setCompanies] = useState([])

    const handleCompanies = useCallback(() => {
        axios.post(
            URL_API,
            { play: 'getcompanies' },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setCompanies(result.data)
        })
    }, [])

    useEffect(handleCompanies, [])

    const handleUsers = useCallback(() => {
        axios.post(
            URL_API,
            { play: 'getusers', user: user?.user_id },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setUsers(result.data)
        })
    }, [])

    useEffect(handleUsers, [])

    const reload = () => {
        handleCompanies()
        handleUsers()
    }

    return (
        <Controller page={page} user={user} reload={reload} reloadUser={reloadUser}>
            <div>
                <div
                    className='flex items-center p-4 bg-gradient-to-r from-orange-500 via-purple-500 to-purple-800 rounded'
                >
                    <div className='w-full'>
                        <div className='p-2'>
                            <p className='text-white text-2xl font-bold capitalize tracking-widest'>welcome back!</p>
                        </div>
                        <div className='flex items-center justify-between p-2'>
                            <div className='flex items-center gap-4'>
                                <Avatar
                                    sx={{ width: '75px', height: '75px' }}
                                    className='shadow-md'
                                    src={`/images/users/${user.avatar}?${Date.now()}`}
                                >
                                    {user.full_name.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>
                                    <p className='text-white text-xl capitalize tracking-wider font-semibold'>
                                        {user.full_name}
                                    </p>
                                    <p className='text-gray-300 text-base capitalize tracking-wider'>
                                        {user.role}
                                    </p>
                                </div>
                            </div>
                            <div className='flex items-center gap-2'>
                                {
                                    user.role !== 'accountant' &&
                                    <div className='bg-black/20 p-4 rounded flex flex-col gap-2 w-[150px]'>
                                        <p className='text-white capitalize tracking-wider font-medium text-lg'>
                                            users
                                        </p>
                                        <p className='text-white text-xl'>
                                            {users.length}
                                        </p>
                                    </div>
                                }
                                <div className='bg-black/20 p-4 rounded flex flex-col gap-2 w-[150px]'>
                                    <p className='text-white capitalize tracking-wider font-medium text-lg'>
                                        companies
                                    </p>
                                    <p className='text-white text-xl'>
                                        {companies.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Controller>
    )
}
