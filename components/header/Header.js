import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import LoginIcon from '@mui/icons-material/Login'

export const Header = () => {
    return (
        <div className='p-4 absolute w-full z-50'>
            <div className='px-16 flex justify-between'>
                <div className='flex items-center gap-1'>
                    <div className='w-20 h-20'>
                        <img src='/android-chrome-512x512.png' className='object-contain w-full h-full' />
                    </div>
                    <p className='text-white tracking-wider text-3xl font-semibold'>
                        DailyBooks
                    </p>
                </div>
                <div className='flex items-center gap-1'>
                    <div className=' flex items-center gap-2'>
                        <Link to={'/'}>
                            <Button className='!text-white !tracking-wider !text-lg !capitalize !flex !items-center !gap-1'>
                                <HomeIcon fontSize='small' />
                                home
                            </Button>
                        </Link>
                        <Link to={'/sign-in'}>
                            <Button className='!text-white !tracking-wider !text-lg !capitalize !flex !items-center !gap-1'>
                                <LoginIcon fontSize='small' />
                                sign in
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
