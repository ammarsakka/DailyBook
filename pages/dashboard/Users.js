import React, { useCallback, useEffect, useState } from 'react'
import { Controller } from '../../components/header/Controller'
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import axios from 'axios'
import URL_API from '../../components/api/Url'
import { Avatar, Button } from '@mui/material'
import { MdOutlineAdd } from 'react-icons/md'
import { NewUser } from '../../components/controllers/NewUser'
import moment from 'moment'
import { UpdateUser } from '../../components/controllers/UpdateUser'
import { EditButtonList } from '../../components/controllers/admin/EditButtonList'
import { DeleteUser } from '../../components/controllers/DeleteUser'
import { DeactivateUser } from '../../components/controllers/DeactivateUser'
import { ActivateUser } from '../../components/controllers/ActivateUser'
import { ResetPassword } from '../../components/controllers/ResetPassword'

const page = 'users'

export const Users = ({ user, reloadUser }) => {
    const [isAdd, setAdd] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [isDelete, setDelete] = useState(false)
    const [isPassword, setPassword] = useState(false)
    const [isDeactivate, setDeactivate] = useState(false)
    const [isActivate, setActivate] = useState(false)

    const [users, setUsers] = useState([])
    const [details, setDetails] = useState([])

    const handleUsers = useCallback(() => {
        axios.post(
            URL_API,
            { play: 'getusers', user: user?.user_id },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            setUsers(result.data)
        })
    }, [])

    useEffect(handleUsers, [])

    const reload = () => {
        handleUsers()
    }

    const handleEditList = ({ id, action }) => {
        setDetails(users.filter(item => item.user_id === id))

        switch (action) {
            case 'edit':
                setEdit(true)
                break
            case 'delete':
                setDelete(true)
                break
            case 'password':
                setPassword(true)
                break
            case 'deactivate':
                setDeactivate(true)
                break
            case 'activate':
                setActivate(true)
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
                            add new user
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
            field: 'avatar', headerName: 'Avatar', flex: 0, renderCell: e => {
                return <Avatar src={`/images/users/${e.formattedValue}`} >{e.row.full_name.charAt(0).toUpperCase()}</Avatar>
            }
        },
        {
            field: 'full_name', headerName: 'Name', flex: 0.5, renderCell: e => {
                return <div className='capitalize'>{e.formattedValue}</div>
            }
        },
        { field: 'email', headerName: 'Email', flex: 0.7 },
        {
            field: 'created', headerName: 'Created', flex: 0.2, renderCell: e => {
                return <div>{moment(e.formattedValue).format('Y-MM-DD')}</div>
            }
        },
        {
            field: 'role', headerName: 'Role', flex: 0.3, renderCell: e => {
                return <div className='capitalize'>{e.formattedValue}</div>
            }
        },
        {
            field: 'user_status', headerName: 'Status', flex: 0.2, renderCell: e => {
                return (
                    <div
                        className={
                            `py-1 px-2 w-full rounded-full border-2 text-center
                            ${e.formattedValue === 'active' ?
                                'border-green-600 text-green-600'
                                :
                                e.formattedValue === 'inactive' ?
                                    'border-orange-500 text-orange-500'
                                    :
                                    'border-red-500 text-red-500'
                            }`
                        }
                    >
                        {e.formattedValue}
                    </div>
                )
            }
        },
        user.role === 'admin' ?
            {
                field: 'action', headerName: 'Action', flex: 0, renderCell: e => {
                    return <EditButtonList details={e.row} handleEditList={handleEditList} />
                }
            }: { hide: true }
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
                    users &&
                    users.map((item) => {
                        return {
                            id: item.user_id,
                            avatar: item.avatar,
                            full_name: item.full_name,
                            email: item.email,
                            created: item.created_at,
                            role: item.role,
                            user_status: item.user_status
                        }
                    })
                }
                components={{
                    Toolbar: CustomToolbar
                }}
            />
            <NewUser isModule={isAdd} setModule={setAdd} reload={reload} />
            <UpdateUser isModule={isEdit} setModule={setEdit} reload={reload} details={details} />
            <DeleteUser isModule={isDelete} setModule={setDelete} reload={reload} details={details} />
            <DeactivateUser isModule={isDeactivate} setModule={setDeactivate} reload={reload} details={details} />
            <ActivateUser isModule={isActivate} setModule={setActivate} reload={reload} details={details} />
            <ResetPassword isModule={isPassword} setModule={setPassword} reload={reload} details={details} />
        </Controller>
    )
}
