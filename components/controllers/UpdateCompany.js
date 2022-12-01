import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Module } from '../modules/Module'
import axios from 'axios'
import URL_API from '../api/Url'

export const UpdateCompany = ({ isModule, setModule, reload, details }) => {
    const [error, setError] = useState(null)
    const [name, setName] = useState('')

    const handleSubmit = () => {
        if (name) {
            axios.post(
                URL_API,
                { name: name, id: details[0].company_id, play: 'updatecompany' },
                { headers: { "content-type": "application/json" } }
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
        setName(details[0]?.company_name)
        setError(null)
    }, [isModule])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <TextField label='Company Name' value={name} onChange={e => setName(e.target.value)} />
            </div>
        </Module>
    )
}
