import { Button, Divider, TextField } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { Module } from '../modules/Module'
import { NewRowTransaction } from './transations/NewRowTransaction'
import axios from 'axios'
import URL_API from '../api/Url'

export const NewTransaction = ({ isModule, setModule, user, company, reload }) => {
    const empty = useRef(true)
    const [error, setError] = useState('')
    const [chart, setChart] = useState([])
    const [description, setDescription] = useState('')
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            transaction: '',
            description: '',
            type: '',
            amount: ''
        },
        {
            id: 2,
            transaction: '',
            description: '',
            type: '',
            amount: ''
        }
    ])

    const handleSubmit = () => {
        if (!empty.current && description) {
            axios.post(
                URL_API,
                {
                    play: 'newtransaction',
                    description: description,
                    transactions: transactions,
                    company: company,
                    user: user.user_id
                },
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

    const handleNewRow = () => {
        setTransactions([...transactions, {
            id: transactions.find((item, index) => index === (transactions.length - 1)).id + 1,
            transaction: '',
            description: '',
            type: '',
            amount: ''
        }])
    }

    const handleRemoveRow = (id) => {
        setTransactions(transactions.filter(item => item.id !== id))
    }

    const handleChart = useCallback((database) => {
        axios.post(
            URL_API,
            { play: 'getchart', database: database },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setChart(result.data)
        })
    }, [])

    useEffect(() => { handleChart(company) }, [isModule, company])

    useEffect(() => {
        setDescription('')
        setTransactions([
            {
                id: 1,
                transaction: '',
                description: '',
                type: '',
                amount: ''
            },
            {
                id: 2,
                transaction: '',
                description: '',
                type: '',
                amount: ''
            }
        ])
    }, [isModule])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit} mx>
            <div className='flex flex-col gap-4'>
                <TextField label='Transaction Description' value={description} onChange={e => { setDescription(e.target.value) }} />
                <div className='bg-gray-200 p-2 rounded flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                        <Button variant='contained' className='flex items-center gap-2' onClick={handleNewRow}>
                            <MdAdd className='text-lg' />
                            <span>add new row</span>
                        </Button>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <p className='font-semibold'>{transactions.length}</p>
                            <p className='capitalize tracking-wider'>rows</p>
                        </div>
                    </div>
                    <Divider />
                    <div className='max-h-[500px] overflow-y-scroll scroll flex flex-col gap-2 pt-2'>
                        {
                            transactions &&
                            transactions.map((transaction) => (
                                <NewRowTransaction
                                    transactions={transactions}
                                    transaction={transaction}
                                    handleRemoveRow={handleRemoveRow}
                                    setTransactions={setTransactions}
                                    chart={chart}
                                    key={transaction.id}
                                    empty={empty}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Module>
    )
}
