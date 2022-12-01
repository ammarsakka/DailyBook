import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ReportPDF } from '../../pages/dashboard/ReportPDF'
import URL_API from '../api/Url'
import { Module } from '../modules/Module'

export const NewReport = ({ isModule, setModule, database, charts, user }) => {
    const [error, setError] = useState('')

    const [isPDF, setPDF] = useState(false)
    const [report, setReport] = useState([])

    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [chart, setChart] = useState('')

    const [min, setMin] = useState('')

    const handleSubmit = () => {
        if (from && to && chart) {
            axios.post(
                URL_API,
                {
                    from: from,
                    to: to,
                    chart: chart,
                    database: database,
                    play: 'report'
                },
                { headers: { "content-type": "application/json" } }
            ).then((result) => {
                // console.log(result.data)
                setReport(result.data)
                setPDF(true)
            })
        } else {
            setError('all fields are required')
        }
    }

    useEffect(() => {
        setTo('')
        setMin(from)
    }, [from])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2 items-center'>
                    <TextField
                        type={'date'}
                        className='w-full'
                        label='Date From'
                        InputLabelProps={{ shrink: true }}
                        value={from || ''}
                        onChange={e => { setFrom(e.target.value) }}
                    />
                    <TextField
                        type={'date'}
                        className='w-full'
                        label='Date To'
                        InputLabelProps={{ shrink: true }}
                        value={to || ''}
                        onChange={e => { setTo(e.target.value) }}
                        inputProps={{ min: min }}
                    />
                </div>
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
                            charts.map((item) => (
                                item.sub.map((sub, index) => (
                                    <MenuItem
                                        value={sub.account_sub_id}
                                        key={index}
                                        className='capitalize'
                                    >
                                        {sub.account_sub_name}
                                    </MenuItem>
                                ))
                            ))
                        }
                    </Select>
                </FormControl>
            </div>
            <ReportPDF isModule={isPDF} setModule={setPDF} details={report} chart={chart} charts={charts} period={[from, to]} user={user} />
        </Module>
    )
}
