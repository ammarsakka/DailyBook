import React from 'react'

const list = [
    {
        icon: 'flaticon-wealth',
        title: 'Market Analysis',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia'
    },
    {
        icon: 'flaticon-accountant',
        title: 'Accounting Advisor',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia'
    },
    {
        icon: 'flaticon-teamwork',
        title: 'General Consultancy',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia'
    },
    {
        icon: 'flaticon-accounting',
        title: 'Structured Assestment',
        text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia'
    }
]

export const About = () => {
    return (
        <div className='max-w-6xl mx-auto my-2'>
            <div className='flex items-center'>
                <div className='w-[550px] h-[700px]'>
                    <img src='/images/about.jpg' className='w-full h-full object-cover' />
                </div>
                <div className='p-4 px-8 max-w-xl'>
                    <p className='text-secondary uppercase font-semibold tracking-wider'>
                        Welcome to DailyBooks
                    </p>
                    <p className='text-4xl'>
                        We Are the Best Accounting Agency
                    </p>
                    <ul className='my-10'>
                        {
                            list.map((item, index) => (
                                <li key={index} className='flex items-center gap-6 my-6'>
                                    <div className='p-6 !w-20 !h-20 bg-secondary flex items-center justify-center rounded-full text-white'>
                                        <span className={`${item.icon} text-4xl`}></span>
                                    </div>
                                    <div>
                                        <p className='font-semibold text-xl mb-2 tracking-wider'>{item.title}</p>
                                        <p className='text-gray-600 tracking-wider'>{item.text}</p>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
