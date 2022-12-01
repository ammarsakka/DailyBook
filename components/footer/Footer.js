import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import moment from 'moment'

export const Footer = () => {
    const [year, setYear] = useState(null)

    useEffect(() => {
        setYear(moment().format('Y'))
    }, [])

    return (
        <div>
            <div className='bg-gray-800 p-4'>
                <div className='m-4 text-white'>
                    <p className='text-2xl tracking-wider uppercase font-semibold'>
                        About us
                    </p>
                    <p className='mt-4 mb-8 text-gray-300 text-xl max-w-lg'>
                        DailyBooks is a small bookkeeping company that helps you with your daily financial activities.
                    </p>
                </div>
                <Divider variant='middle' className='bg-white' />
                <div className='m-4'>
                    <p className='text-white tracking-wider'>
                        Copyright © {year}, All rights reserved DailyBooks | Powered by Sakka Ammar.
                    </p>
                </div>
            </div>
        </div>
    )
}
