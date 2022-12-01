import { Button } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import URL_API from '../../components/api/Url'
import { EditButtonTransaction } from '../../components/controllers/transations/EditButtonTransaction'
import { NewTransaction } from '../../components/controllers/NewTransaction'
import { Controller } from '../../components/header/Controller'
import { UpdateTransaction } from '../../components/controllers/UpdateTransaction'
import { ViewTransaction } from '../../components/controllers/ViewTransaction'
import { DeleteTransaction } from '../../components/controllers/DeleteTransaction'

export const CompanyBookkeeping = ({ user, company, reloadUser }) => {
    const page = company[0]?.company_name
    const pageName = 'bookkeeping'
    const pageToken = company[0]?.company_id
    const [loading, setLoading] = useState(true)

    const [isAdd, setAdd] = useState(false)
    const [isView, setView] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)

    const [details, setDetails] = useState([])
    const [transactions, setTransactions] = useState([])

    const handleTransation = useCallback((database) => {
        setLoading(true)
        setTransactions([])
        axios.post(
            URL_API,
            { play: 'gettransactions', database: database },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setTransactions(result.data)
            setLoading(false)
            // console.log(result.data)
        })
    }, [])

    useEffect(() => {
        handleTransation(company[0]?.database_name)
    }, [company])

    const reload = () => {
        handleTransation(company[0]?.database_name)
    }

    const handleEditList = ({ id, action }) => {
        setDetails(transactions.filter(item => item.transaction_id === id))

        switch (action) {
            case 'view':
                setView(true)
                break
            case 'edit':
                setEdit(true)
                break
            case 'delete':
                setDelete(true)
                break
        }
    }

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer>
                <div className='w-full m-2 flex justify-between'>
                    <div className='flex items-end gap-4'>
                        <Button
                            variant='contained'
                            className='flex gap-2'
                            onClick={() => { setAdd(true) }}
                        >
                            <MdOutlineAdd size={17} />
                            add new transaction
                        </Button>
                        <GridToolbarQuickFilter />
                    </div>
                </div>
            </GridToolbarContainer>
        )
    }

    const columns = [
        { field: 'id', headerName: 'Id', flex: 0 },
        { field: 'transaction', headerName: 'Transaction', flex: 1 },
        { field: 'createdBy', headerName: 'Created By', flex: 0.2 },
        {
            field: 'createdAt', headerName: 'Created At', flex: 0, renderCell: e => {
                return moment(e.formattedValue).format('MM-DD-Y')
            }
        },
        {
            field: 'action', headerName: 'Action', flex: 0.2, renderCell: e => {
                return (
                    <EditButtonTransaction details={e} handleEditList={handleEditList} user={user} />
                )
            }
        }
    ]

    return (
        <Controller page={page} user={user} reload={reload} pageName={pageName} pageToken={pageToken} reloadUser={reloadUser}>
            <DataGrid
                sx={{ height: '100%', width: '100%' }}
                pageSize={10}
                disableSelectionOnClick
                autoPageSize
                density='comfortable'
                columns={columns}
                loading={loading}
                rows={
                    transactions &&
                    transactions.map((item) => {
                        return {
                            id: item.transaction_id,
                            transaction: item.transaction_description,
                            createdBy: item.user_info[0]?.username,
                            createdAt: item.created_at,
                        }
                    })
                }
                components={{
                    Toolbar: CustomToolbar
                }}
            />
            <NewTransaction isModule={isAdd} setModule={setAdd} user={user} company={company[0]?.database_name} reload={reload} />
            <UpdateTransaction isModule={isEdit} setModule={setEdit} company={company[0]?.database_name} reload={reload} details={details} />
            <ViewTransaction isModule={isView} setModule={setView} details={details} handleEditList={handleEditList} company={company[0]?.database_name} />
            <DeleteTransaction isModule={isDelete} setModule={setDelete} details={details} reload={reload} company={company[0]?.database_name} />
        </Controller>
    )
}
