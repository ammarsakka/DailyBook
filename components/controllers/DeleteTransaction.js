import axios from 'axios'
import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import URL_API from '../api/Url'
import { WarningModule } from '../modules/WarningModule'

export const DeleteTransaction = ({ isModule, setModule, details, reload, company }) => {
    const handleSubmit = () => {
        axios.post(
            URL_API,
            { id: details[0]?.transaction_id, play: 'deletetransaction', database: company },
            { headers: { "content-type": "application/json" } }
        ).then((result) => {
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
                        Delete transaction No.{details[0]?.transaction_id}. {details[0]?.transaction_description}?
                    </p>
                    <p className='text-base text-center'>
                        This cannot be undone
                    </p>
                </div>
            </div>
        </WarningModule>
    )
}
