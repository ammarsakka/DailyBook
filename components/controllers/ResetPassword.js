import axios from 'axios'
import React from 'react'
import URL_API from '../api/Url'
import { WarningModule } from '../modules/WarningModule'

export const ResetPassword = ({ isModule, setModule, reload, details }) => {
    const handleSubmit = () => {
        axios.post(
            URL_API,
            {
                id: details[0]?.user_id,
                fullname: details[0]?.full_name,
                email: details[0]?.email,
                play: 'resetpassword'
            },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            reload()
            setModule(false)
        })
    }

    return (
        <WarningModule isModule={isModule} setModule={setModule} name={'reset'} handleSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
                <p className='text-center capitalize text-2xl font-semibold tracking-wide'>
                    reset password {details[0]?.full_name}?
                </p>
                <p className='text-center text-red-600 font-medium text-base'>
                    This action will auto generate new password for user and notify user with new password by email based on the security policy.
                </p>
            </div>
        </WarningModule>
    )
}
