import { Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'
import { EditButton } from './EditButton'

export const DataTable = ({ sub, user, handleEditList }) => {

    const columns = [
        { field: 'id', headerName: 'Id', hide: true },
        {
            field: 'name', headerName: 'Name', flex: 1, renderCell: e => {
                return <div className='capitalize'>{e.formattedValue}</div>
            }
        },
        {
            field: 'action', headerName: 'Action', hide: user?.role === 'accountant', renderCell: ({ id }) => {
                return <EditButton details={id} handleEditList={handleEditList} user={user} />
            }
        }
    ]

    return (
        <div className='h-full max-h-[400px]'>
            <DataGrid
                sx={{ height: '100%', width: '100%' }}
                columns={columns}
                rows={
                    sub.map((item) => {
                        return { id: item.account_sub_id, name: item.account_sub_name }
                    })
                }
                pageSize={10}
                disableColumnMenu
                disableSelectionOnClick
                autoPageSize
                autoHeight
                density='compact'
            />
        </div>
    )
}
