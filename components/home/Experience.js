import React from 'react'

export const Experience = () => {
    const experience = [
        {
            number: '50',
            text: 'Years of Experienced'
        },
        {
            number: '8,500',
            text: 'Cases Completed'
        },
        {
            number: '20',
            text: 'Awards Won'
        },
        {
            number: '50',
            text: 'Expert Consultant'
        }
    ]

    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex justify-between gap-8 my-10'>
                {
                    experience.map((item, index) => (
                        <div className='' key={index}>
                            <p className='text-center text-5xl text-secondary font-bold'>
                                {item.number}
                            </p>
                            <p className='text-center text-lg uppercase tracking-wider mt-2'>
                                {item.text}
                            </p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
