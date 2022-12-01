import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL_API from '../api/Url'
import { Module } from '../modules/Module'

export const ChangePassword = ({ isModule, setModule, user }) => {
    const [error, setError] = useState('')
    const [current, setCurret] = useState('')
    const [password, setPassword] = useState('')

    const [showCurrent, setShowCurrent] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {
        if (current && password) {
            axios.post(
                URL_API,
                { play: 'changepassword', user: user.user_id, current: current, password: password },
                { headers: { "content-type": "application/json" } }
            ).then((result) => {
                if (result.data[0]?.status === 200) {
                    setModule(false)
                } else {
                    setError(result.data[0])
                }
            })
        } else {
            setError('all fields are required')
        }
    }

    useEffect(() => {
        setCurret('')
        setPassword('')
    }, [isModule])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <FormControl variant="outlined" className='w-full'>
                    <InputLabel htmlFor="outlined-adornment-current">Current Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-current"
                        type={showCurrent ? 'text' : 'password'}
                        value={current}
                        onChange={e => setCurret(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowCurrent(!showCurrent)}
                                    edge="end"
                                >
                                    {showCurrent ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Current Password"
                    />
                </FormControl>
                <FormControl variant="outlined" className='w-full'>
                    <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                    <OutlinedInput
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
                        label="New Password"
                    />
                </FormControl>
            </div>
        </Module>
    )
}
