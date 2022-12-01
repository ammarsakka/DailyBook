import { Button, Divider, TextField } from '@mui/material'
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import URL_API from '../api/Url'
import { Module } from '../modules/Module'
import { NewRowTransaction } from './transations/NewRowTransaction'

const handleTransations = (details) => {
    let array = []
    details.map(data => {
        data.transactions.map((item) => {
            array.push({
                id: item.transaction_details_id,
                transactionId: item.transaction_id,
                transaction: item.account_sub_id,
                description: item.Transaction_name,
                type: item.Transaction_type,
                amount: item.Transaction_amount
            })
        })
    })

    return array
}

export const UpdateTransaction = ({ isModule, setModule, details, reload, company }) => {
    const stop = useRef(false)
    const empty = useRef(true)
    const [error, setError] = useState('')
    const [chart, setChart] = useState([])
    const [description, setDescription] = useState('')
    const [transactions, setTransactions] = useState([
        {
            id: 1,
            transactionId: '',
            transaction: '',
            description: '',
            type: '',
            amount: ''
        },
        {
            id: 2,
            transactionId: '',
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
                    play: 'updatetransaction',
                    id: details[0]?.transaction_id,
                    description: description,
                    transactions: transactions,
                    database: company
                },
                { headers: { "content-type": "application/json" } }
            ).then((result) => {
                if (result.data[0]?.status === 200) {
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

    const handleChart = useCallback(() => {
        axios.post(
            URL_API,
            { play: 'getchart', database: company },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setChart(result.data)
        })
    }, [])

    useEffect(handleChart, [isModule])

    useMemo(() => {
        if (!stop.current) {
            setDescription(details[0]?.transaction_description)
            setTransactions(handleTransations(details))
            stop.current = true
        } else {
            stop.current = false
        }
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
