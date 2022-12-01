import { LoadingButton } from '@mui/lab'
import { Avatar, Button, Divider } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { DisplayModule } from '../modules/DisplayModule'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import URL_API from '../api/Url'
import moment from 'moment'

const currency = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})

export const ViewTransaction = ({ isModule, setModule, details, handleEditList }) => {
    const [loading, setLoading] = useState(false)

    const handleEdit = () => {
        setLoading(true)
        setTimeout(() => {
            handleEditList({ id: details[0]?.transaction_id, action: 'edit' })
            setLoading(false)
            setModule(false)
        }, 500)
    }

    const columns = [
        { field: 'id', headerName: 'Id', hide: true, sortable: false },
        {
            field: 'credit', headerName: 'Credit', flex: 0.5, sortable: false, renderCell: e => {
                return <div className='capitalize'>{e.formattedValue}</div>
            }
        },
        {
            field: 'debit', headerName: 'Debit', flex: 0.5, sortable: false, renderCell: e => {
                return <div className='capitalize'>{e.formattedValue}</div>
            }
        },
        { field: 'description', headerName: 'Description', flex: 1, sortable: false },
        {
            field: 'amount', headerName: 'Amount', flex: 0.3, type: 'number', sortable: false, renderCell: e => {
                return currency.format(e.formattedValue)
            }
        }
    ]

    const rows = () => {
        const row = []
        details.map((data) => {
            data.transactions.map((transaction) => {
                row.push({
                    id: transaction.transaction_details_id,
                    credit: transaction.Transaction_type === 'credit' ? transaction.account_sub_name : '',
                    debit: transaction.Transaction_type === 'debit' ? transaction.account_sub_name : '',
                    description: transaction.Transaction_name,
                    amount: transaction.Transaction_amount
                })
            })
        })
        return row
    }

    return (
        <DisplayModule isModule={isModule} setModule={setModule} mx>
            <div>
                <div className='flex justify-end items-center gap-4 m-2'>
                    <LoadingButton variant='contained' onClick={handleEdit} loading={loading} className='flex items-center gap-2'>
                        <EditIcon fontSize='small' />
                        edit
                    </LoadingButton>
                    <Button variant='contained' color='inherit' onClick={() => { setModule(false) }} className='flex items-center gap-2'>
                        <CloseIcon fontSize='small' />
                        close
                    </Button>
                </div>
                <Divider className='!m-2 !py-2' />
                <div className='flex flex-col gap-2 m-2 p-2 bg-slate-100 rounded'>
                    <div className='flex flex-col gap-2'>
                        {
                            details &&
                            details.map((item, index) => (
                                <div key={index}>
                                    <div>
                                        <p className='tracking-wide font-bold text-xl'>
                                            Transaction NO.{item.transaction_id}
                                        </p>
                                    </div>
                                    <div className='pt-2 pb-8 flex justify-between items-center text-lg'>
                                        <p>
                                            {item.transaction_description}
                                        </p>
                                        <p>
                                            {moment(item.created_at).format('MM/DD/Y')}
                                        </p>
                                    </div>
                                    {
                                        item.user_info.map((user, i) => (
                                            <div key={i} className='flex gap-2'>
                                                <Avatar sx={{width: '45px', height: '45px'}}>{user.full_name.charAt(0).toUpperCase()}</Avatar>
                                                <div>
                                                    <p className='capitalize font-semibold'>{user.full_name}</p>
                                                    <p className='text-sm text-gray-600'>{user.username}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                    <Divider />
                    <div className='h-full w-full min-h-full max-h-[500px]'>
                        <DataGrid
                            sx={{ height: '100%' }}
                            pageSize={10}
                            autoHeight
                            disableSelectionOnClick
                            autoPageSize
                            density='comfortable'
                            columns={columns}
                            rows={rows()}
                            disableColumnMenu
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'credit', sort: 'asc' }]
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </DisplayModule>
    )
}
