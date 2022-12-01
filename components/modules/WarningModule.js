import { Button } from '@mui/material'
import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'

export const WarningModule = (props) => {
    const [loading, setLoading] = useState(false)

    props.isModule ?
        document.body.style.overflow = 'hidden'
        :
        document.body.style.overflow = 'auto'

    const handleClose = () => {
        props.setModule(false)
    }

    const handleSubmit = () => {
        setLoading(true)
        setTimeout(() => {
            props.handleSubmit()
            setLoading(false)
        }, 1000)
    }

    return (
        <div
            className={
                `
        fixed top-0 left-0 z-[100000] w-full h-full justify-center items-center
        ${props.isModule ? 'flex' : 'hidden'}
        `
            }
        >
            <div className='absolute top-0 left-0 w-full h-full bg-black/[.5] backdrop-blur-sm' onClick={handleClose}></div>
            <div className='z-50 bg-white w-full max-w-lg rounded shadow'>
                <div className='p-4'>
                    <div className='pt-4 pb-2'>
                        {props.children}
                    </div>
                    <div className='pt-2 pb-4 w-full'>
                        <div className='flex items-center gap-2 w-full'>
                            <LoadingButton
                                loading={loading}
                                variant='contained'
                                onClick={handleSubmit}
                                color='error'
                                className='w-full'
                            >
                                {props.name}
                            </LoadingButton>
                            <Button
                                variant='contained'
                                color='inherit'
                                onClick={handleClose}
                                className='w-full'
                            >
                                cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
