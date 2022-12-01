import { FormControl, TextField, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL_API from '../api/Url'
import { Module } from '../modules/Module'

export const UpdateUser = ({ isModule, setModule, reload, details }) => {
    const [error, setError] = useState(null)

    const [fullname, setFullname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const handleSubmit = () => {
        if (fullname && username && email && role) {
            axios.post(
                URL_API,
                {
                    id: details[0]?.user_id,
                    fullname: fullname,
                    username: username,
                    email: email,
                    role: role,
                    play: 'updateuser'
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
        setFullname(details[0]?.full_name)
        setUsername(details[0]?.username)
        setEmail(details[0]?.email)
        setRole(details[0]?.role)
        setError(null)
    }, [details])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <TextField label='Full Name' value={fullname} onChange={e => setFullname(e.target.value)} />
                <TextField label='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <TextField label='Email' value={email} onChange={e => setEmail(e.target.value)} type='email' />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Age"
                        onChange={e => setRole(e.target.value)}
                    >
                        <MenuItem value={'admin'}>Admin</MenuItem>
                        <MenuItem value={'manager'}>Manager</MenuItem>
                        <MenuItem value={'accountant'}>Accountant</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </Module>
    )
}
