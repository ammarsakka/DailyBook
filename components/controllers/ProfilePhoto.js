import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Module } from '../modules/Module'
import axios from 'axios'

export const ProfilePhoto = ({ user, isModule, setModule, reload }) => {
    const [error, setError] = useState('')

    const [file, setFile] = useState(null)
    const [image, setImage] = useState(null)

    const handleSubmit = () => {
        if (file) {
            const formData = new FormData()

            formData.append('file', file)
            formData.append('image', image)
            formData.append('id', user.user_id)
            formData.append('name', user.full_name)

            axios.post(
                'http://localhost:8000/profilePhoto.php',
                formData
            ).then((result) => {
                if (result.data[0].status === 200) {
                    reload()
                    setModule(false)
                } else {
                    setError(result.data[0].message)
                }
            })
        }
    }

    useEffect(() => {
        setImage(user.avatar)
    }, [user, isModule])

    return (
        <Module isModule={isModule} setModule={setModule} error={error} setError={setError} handleSubmit={handleSubmit}>
            <div className='flex justify-center items-center'>
                <IconButton component='label'>
                    <input type={'file'} hidden accept="image/*" onChange={e => setFile(e.target.files[0])} />
                    <Avatar
                        sx={{ width: '300px', height: '300px' }}
                        src={file ? URL.createObjectURL(file) : image && `/images/users/${image}`}
                    />
                </IconButton>
            </div>
        </Module>
    )
}
