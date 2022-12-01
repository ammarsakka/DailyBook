import { Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'

export const Module = (props) => {
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
    props.setError(null)
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
      <div className={`z-50 bg-white w-full ${props.mx ? 'max-w-5xl' : 'max-w-lg'} rounded shadow`}>
        <div className='p-4'>
          <div className='pt-2 pb-4 flex justify-between items-center gap-4'>
            <div className='w-full'>
              {
                props.error &&
                (
                  <p className='bg-red-400 p-2 rounded text-white capitalize tracking-wide'>
                    {props.error}
                  </p>
                )
              }
            </div>
            <div className='flex items-center gap-2'>
              <LoadingButton
                loading={loading}
                variant='contained'
                onClick={handleSubmit}
                className='flex items-center gap-2'
              >
                <SaveIcon fontSize='small' />
                save
              </LoadingButton>
              <Button
                variant='contained'
                color='inherit'
                onClick={handleClose}
                className='flex items-center gap-2'
              >
                <CloseIcon fontSize='small' />
                cancel
              </Button>
            </div>
          </div>
          <Divider variant='fullWidth' />
          <div className='pt-4 pb-2'>
            {props.children}
          </div>
        </div>
      </div>
    </div >
  )
}
