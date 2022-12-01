import { FormControl, IconButton, InputLabel, ListSubheader, MenuItem, Select, TextField } from '@mui/material'
import React, { useMemo, useRef, useState } from 'react'
import { MdOutlineRemoveCircle } from 'react-icons/md'

export const NewRowTransaction = ({ transactions, transaction, handleRemoveRow, setTransactions, chart, empty }) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [amount, setAmount] = useState('')

    const handleTransations = (name, description, type, amount) => {
        setTransactions(items => {
            const itemIndex = items.findIndex(item => item.id === transaction.id)
            return [
                ...items.slice(0, itemIndex),
                {
                    ...items[itemIndex],
                    transaction: name,
                    description: description,
                    type: type,
                    amount: amount
                },
                ...items.slice(itemIndex + 1)
            ]
        })
    }

    useMemo(() => {
        handleTransations(name, description, type, amount)
    }, [name, description, type, amount])

    if (name && description && type && amount) {
        empty.current = false
    } else {
        empty.current = true
    }

    const getChartMenu = () => {
        const details = []
        chart.map((chr) => {
            details.push(<ListSubheader key={chr.account_name}>{chr.account_name}</ListSubheader>)
            chr.sub.map((item) => {
                details.push(
                    <MenuItem
                        value={item.account_sub_id}
                        key={item.account_sub_id}
                        className='capitalize'
                    >
                        {item.account_sub_name}
                    </MenuItem>
                )
            })
        })
        return (details)
    }
    
    useMemo(() => {
        setName(transaction.transaction)
        setDescription(transaction.description)
        setType(transaction.type)
        setAmount(transaction.amount)
    }, [transaction])

    return (
        <div className='flex items-center gap-2 w-full'>
            <FormControl className='w-[20%]'>
                <InputLabel htmlFor="grouped-select">Transaction</InputLabel>
                <Select
                    id="grouped-select"
                    label="Transaction"
                    value={name}
                    onChange={e => setName(e.target.value)}
                >
                    {getChartMenu()}
                </Select>
            </FormControl>
            <TextField
                label='Description'
                className='w-1/2'
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <FormControl className='w-[15%]'>
                <InputLabel id="demo-simple-select-label">D/C</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label='D/C'
                    value={type}
                    onChange={e => setType(e.target.value)}
                >
                    <MenuItem value={'debit'}>Debit</MenuItem>
                    <MenuItem value={'credit'}>Credit</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label='Amount'
                type={'number'}
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            {
                transactions.length > 2 &&
                <IconButton
                    color='error'
                    onClick={() => handleRemoveRow(transaction.id)}
                >
                    <MdOutlineRemoveCircle className='text-lg' />
                </IconButton>
            }
        </div>
    )
}
