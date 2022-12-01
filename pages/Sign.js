import { FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Switch, TextField } from '@mui/material'
import React, { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import axios from 'axios'
import URL_API from '../components/api/Url'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import UserProfile from '../components/auth/UserProfile'

export const Sign = () => {
    const { getUser, setUser } = UserProfile()
    const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['username', 'password'])
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)

    const [username, setUsername] = useState(cookies.username || '')
    const [password, setPassword] = useState(cookies.password || '')
    const [remember, setRemember] = useState(cookies.username ? true : false)

    const [error, setError] = useState([])
    const [errorUsername, setErrorUsername] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault()
        setLoading(true)
        setError([])
        setErrorUsername(false)
        setErrorPassword(false)
        setTimeout(() => {
            if (username && password) {
                axios.post(
                    URL_API,
                    {
                        username: username,
                        password: password,
                        play: 'signin'
                    },
                    {
                        headers: { 'content-type': 'application/json' }
                    }
                ).then((result) => {
                    if (result.data[0]?.status) {
                        if (remember) {
                            setCookie('username', username, { path: '/' })
                            setCookie('password', password, { path: '/' })
                        } else {
                            removeCookie('username')
                            removeCookie('password')
                        }
                        setUser([{ username: result.data[0]?.username, fullname: result.data[0]?.user_name }])
                        navigate('/dashboard/home')
                    } else {
                        setError(result.data)
                    }
                    // console.log(result.data)
                })
            } else {
                setError([{ message: 'all fields are required' }])
                setErrorUsername(username ? false : true)
                setErrorPassword(password ? false : true)
            }
            setLoading(false)
        }, 2000)
    }

    return (
        <CookiesProvider>
            <div className='min-h-screen flex justify-center items-center bg-slate-300'>
                <div className='w-full flex justify-center items-center'>
                    <div className='bg-white p-8 w-full min-h-screen flex flex-col justify-center items-center gap-6 relative z-0'>
                        <div className='w-52 z-10'>
                            <img src='/android-chrome-512x512.png' alt='DailyBooks Logo' className='w-full h-full object-contain drop-shadow-lg' />
                        </div>
                        <div className='z-10'>
                            <h1 className='text-4xl font-bold tracking-wider drop-shadow-lg'>DailyBooks</h1>
                        </div>
                        <div className='absolute top-0 left-0 w-full h-full z-0'>
                            <span className='absolute top-0 left-0 w-full h-full bg-white/20 backdrop-blur-sm z-10' />
                            <img src='/images/image_4.jpg' className='w-full h-full object-cover z-0' />
                        </div>
                    </div>
                    <div className='bg-white p-8 shadow-1l w-full min-h-screen flex justify-center items-center z-10'>
                        <form onSubmit={handleSubmit} className='w-full max-w-lg'>
                            <div className='flex flex-col gap-4'>
                                {
                                    error &&
                                    error.map((item, index) => (
                                        <div key={index} className='bg-red-400 p-4 w-full rounded mb-4'>
                                            <p className='text-center text-white tracking-wider font-semibold capitalize'>
                                                {item.message}
                                            </p>
                                        </div>
                                    ))
                                }
                                <TextField
                                    error={errorUsername}
                                    label='Username'
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                />
                                <FormControl variant="outlined">
                                    <InputLabel error={errorPassword} htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        error={errorPassword}
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={remember || false}
                                            onChange={e => setRemember(e.target.checked)}
                                        />
                                    }
                                    label='Remember me'
                                    className='select-none'
                                />
                                <LoadingButton
                                    variant='contained'
                                    size='large'
                                    className='!font-semibold'
                                    type='submit'
                                    loading={isLoading}
                                >
                                    sign in
                                </LoadingButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </CookiesProvider>
    )
}
