import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Module } from '../modules/Module'
import axios from 'axios'
import URL_API from '../api/Url'

export const NewUser = ({ isModule, setModule, reload }) => {
    const [error, setError] = useState(null)
    const [showPassword, setShowPassword] = useState(false)

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    const handleSubmit = () => {
        if (fullname && username && email) {
            axios.post(
                URL_API,
                {
                    fullname: fullname,
                    username: username,
                    email: email,
                    play: 'newuser'
                },
                {
                    headers: { "content-type": "application/json" }
                }
            ).then((result) => {
                if (result.data[0]?.status) {
                    reload()
                    setModule(false)
                } else {
                    setError(result.data[0]?.message)
                }
            })
        } else {
            setError('all fields are required')
        }
    }

    useEffect(() => {
        setFullname('')
        setUsername('')
        setEmail('')
        setError(null)
        setShowPassword(false)
    }, [isModule])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <TextField label='Full Name' value={fullname} onChange={e => setFullname(e.target.value)} />
                <TextField label='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} type='email' />
            </div>
        </Module>
    )
}
