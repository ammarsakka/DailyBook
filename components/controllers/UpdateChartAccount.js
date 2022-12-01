import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import URL_API from '../api/Url'
import { Module } from '../modules/Module'

export const UpdateChartAccount = ({ isModule, setModule, database, charts, reload, details }) => {
    const [error, setError] = useState('')

    const [chart, setChart] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = () => {
        if (chart && name) {
            axios.post(
                URL_API,
                { database: database, play: 'updatechartaccount', chart: chart, name: name, id: details[0]?.account_sub_id },
                { headers: { "content-type": "application/json" } }
            ).then((result) => {
                if (result.data[0].status === 200) {
                    reload()
                    setModule(false)
                }
            })
        } else {
            setError('all fields are required')
        }
    }

    useEffect(() => {
        setName(details[0]?.account_sub_name)
        setChart(details[0]?.account_id)
    }, [isModule, details])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <FormControl className='w-full'>
                    <InputLabel htmlFor="grouped-select">Chart of Account</InputLabel>
                    <Select
                        id="grouped-select"
                        label="Chart of Account"
                        value={chart}
                        onChange={e => setChart(e.target.value)}
                    >
                        {
                            charts &&
                            charts.map((item, index) => (
                                <MenuItem
                                    value={item.account_id}
                                    key={index}
                                    className='capitalize'
                                >
                                    {item.account_name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <TextField label='Account Name' value={name} onChange={e => { setName(e.target.value) }} />
            </div>
        </Module>
    )
}
