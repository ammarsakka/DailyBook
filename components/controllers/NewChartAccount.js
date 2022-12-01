import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import URL_API from '../api/Url'
import { Module } from '../modules/Module'

export const NewChartAccount = ({ isModule, setModule, database, charts, reload }) => {
    const [error, setError] = useState('')

    const [chart, setChart] = useState('')
    const [name, setName] = useState('')

    const handleSubmit = () => {
        if (chart && name) {
            axios.post(
                URL_API,
                { database: database, play: 'newchartaccount', chart: chart, name: name },
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
