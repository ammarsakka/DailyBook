import { Button } from '@mui/material'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import axios from 'axios'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { MdOutlineAdd } from 'react-icons/md'
import URL_API from '../../components/api/Url'
import { DeleteCompany } from '../../components/controllers/DeleteCompany'
import { EditButtonList } from '../../components/controllers/manager/EditButtonList'
import { NewCompany } from '../../components/controllers/NewCompany'
import { UpdateCompany } from '../../components/controllers/UpdateCompany'
import { Controller } from '../../components/header/Controller'

const page = 'companies'

export const Companies = ({ user, reloadUser }) => {
    const [companies, setCompanies] = useState([])
    const [isAdd, setAdd] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const [details, setDetails] = useState([])

    const handleCompanies = useCallback(() => {
        axios.post(
            URL_API,
            { play: 'getcompanies' },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setCompanies(result.data)
        })
    }, [])

    useEffect(handleCompanies, [])

    const reload = () => {
        handleCompanies()
    }

    const handleEditList = ({ id, action }) => {
        setDetails(companies.filter(item => item.company_id === id))

        switch (action) {
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
                            add new company
                        </Button>
                        <GridToolbarQuickFilter />
                    </div>
                </div>
            </GridToolbarContainer>
        )
    }

    const columns = [
        { field: 'id', hide: true },
        {
            field: 'name', headerName: 'Name', flex: 1, renderCell: e => {
                return <div className='capitalize'>{e.formattedValue}</div>
            }
        },
        {
            field: 'created', headerName: 'Created', flex: 0.5, renderCell: e => {
                return <div>{moment(e.formattedValue).format('Y-MM-DD')}</div>
            }
        },
        {
            field: 'action', headerName: 'Action', flex: 0, renderCell: e => {
                return <EditButtonList details={e} handleEditList={handleEditList} />
            }
        }
    ]

    return (
        <Controller page={page} user={user} reload={reload} reloadUser={reloadUser}>
            <DataGrid
                sx={{ height: '100%' }}
                pageSize={10}
                disableSelectionOnClick
                autoPageSize
                density='comfortable'
                columns={columns}
                rows={
                    companies &&
                    companies.map((item) => {
                        return {
                            id: item.company_id,
                            name: item.company_name,
                            created: item.created_at,
                        }
                    })
                }
                components={{
                    Toolbar: CustomToolbar
                }}
            />
            <NewCompany isModule={isAdd} setModule={setAdd} reload={reload} />
            <UpdateCompany isModule={isEdit} setModule={setEdit} reload={reload} details={details} />
            <DeleteCompany isModule={isDelete} setModule={setDelete} reload={reload} details={details} />
        </Controller>
    )
}
