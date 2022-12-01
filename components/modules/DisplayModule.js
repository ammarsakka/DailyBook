import React from 'react'

export const DisplayModule = (props) => {
    props.isModule ?
        document.body.style.overflow = 'hidden'
        :
        document.body.style.overflow = 'auto'

    const handleClose = () => {
        props.setModule(false)
    }

    return (
        <div className={
            `fixed top-0 left-0 z-[100000] w-full h-full justify-center items-center ${props.isModule ? 'flex' : 'hidden'}`
        }>
            <div className='absolute top-0 left-0 w-full h-full bg-black/[.5] backdrop-blur-sm' onClick={handleClose}></div>
            <div className={`z-50 bg-white w-full ${props.mx ? 'max-w-5xl' : 'max-w-lg'} rounded shadow`}>
                <div className='p-4'>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
