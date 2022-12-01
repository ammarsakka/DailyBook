import React from 'react'
import { WarningModule } from '../modules/WarningModule'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import axios from 'axios'
import URL_API from '../api/Url'

export const DeleteCompany = ({ isModule, setModule, details, reload }) => {
    const handleSubmit = () => {
        axios.post(
            URL_API,
            { id: details[0]?.company_id, play: 'deletecompany', database: details[0]?.database_name },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
            // console.log(result.data)
            reload()
            setModule(false)
        })
    }

    return (
        <WarningModule isModule={isModule} setModule={setModule} handleSubmit={handleSubmit} name={'delete'}>
            <div className='w-full flex flex-col justify-center items-center'>
                <AiOutlineInfoCircle size={100} className='!fill-red-700' />
                <div className='my-4'>
                    <p className='capitalize font-semibold text-2xl tracking-wide my-2 text-center'>
                        Delete {details[0]?.company_name}?
                    </p>
                    <p className='text-base text-center'>
                        This cannot be undone
                    </p>
                </div>
            </div>
        </WarningModule>
    )
}
