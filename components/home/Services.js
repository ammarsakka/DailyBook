import React from 'react'

const services = [
    {
        icon: 'flaticon-accounting-1',
        title: 'Accounting',
        text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
    },
    {
        icon: 'flaticon-tax',
        title: 'Tax, Compliance & Payroll',
        text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
    },
    {
        icon: 'flaticon-loan',
        title: 'Financial Services',
        text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
    },
    {
        icon: 'flaticon-budget',
        title: 'Growth & Funding Access',
        text: 'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic.'
    }
]

export const Services = () => {
    return (
        <div className='max-w-6xl mx-auto'>
            <div className='flex gap-8 my-10'>
                {
                    services.map((item, index) => (
                        <div key={index} className='flex flex-col relative'>
                            <div className='mx-auto !w-20 !h-20'>
                                <span className={`${item.icon} text-7xl text-gray-500`}></span>
                            </div>
                            <div className='mt-4'>
                                <h2 className='tracking-wider font-semibold text-lg text-center'>
                                    {item.title}
                                </h2>
                                <p className='text-gray-500 my-4 text-justify'>
                                    {item.text}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
