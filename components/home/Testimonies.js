import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"

// import required modules
import { Pagination } from 'swiper'
import { Avatar } from '@mui/material'

const testimonies = [
    {
        avatar: 'person_1.jpg',
        name: 'Roger Scott',
        role: 'Marketing Manager',
        testimonies: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
    },
    {
        avatar: 'person_2.jpg',
        name: 'Roger Scott',
        role: 'Marketing Manager',
        testimonies: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
    },
    {
        avatar: 'person_3.jpg',
        name: 'Roger Scott',
        role: 'Marketing Manager',
        testimonies: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
    },
    {
        avatar: 'person_4.jpg',
        name: 'Roger Scott',
        role: 'Marketing Manager',
        testimonies: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
    }
]

export const Testimonies = () => {
    return (
        <div>
            <div className='relative h-[600px]'>
                <div className='flex justify-center items-center pt-[7rem] pb-[14rem] bg-teal-200'>
                    <div>
                        <p className='uppercase text-center text-lg font-semibold tracking-widest'>
                            Testimonies
                        </p>
                        <p className='text-3xl font-bold my-4 tracking-wider'>
                            Happy Clients & Feedbacks
                        </p>
                    </div>
                </div>
                <div className='absolute top-[15rem] left-0 w-full'>
                    <Swiper
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        modules={[Pagination]}
                        className='w-full max-w-6xl h-[300px]'
                        spaceBetween={30}
                        slidesPerView={3}
                        grabCursor={true}
                    >
                        {
                            testimonies.map((item, index) => (
                                <SwiperSlide key={index} className='bg-white p-4 shadow-lg rounded h-[250px]'>
                                    <div>
                                        <div>
                                            <p className='text-lg text-gray-500 tracking-wide'>
                                                {item.testimonies}
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-4 mt-8'>
                                            <Avatar src={`/images/${item.avatar}`} className='!w-14 !h-14'></Avatar>
                                            <div>
                                                <p className='text-lg font-semibold'>
                                                    {item.name}
                                                </p>
                                                <p>
                                                    {item.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </div>
    )
}
