import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/pagination"

// import required modules
import { EffectFade, Pagination, Autoplay } from 'swiper'

const images = [
    {
        img: 'bg_1.jpg',
        title: 'We Business Grow',
        text: 'We Help You Businesses Innovate and Grow'
    },
    {
        img: 'bg_2.jpg',
        title: 'We Support Business',
        text: 'The Best Business Support'
    },
    {
        img: 'bg_3.jpg',
        title: 'We Give Advice',
        text: 'Expert Financial Advice'
    },
]

export const Hero = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                autoplay={{
                    delay: 5000
                }}
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                modules={[EffectFade, Pagination, Autoplay]}
                className='w-full h-[700px]'
                loop={true}
            >
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index} className='w-full h-full relative'>
                            <img src={`/images/${image.img}`} className='w-full h-full object-cover object-center z-0' />
                            <span className='w-full h-full absolute top-0 left-0 bg-black opacity-40 block z-10'></span>
                            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20'>
                                <h2 className='text-center text-3xl text-secondary font-semibold tracking-wider uppercase mb-4'>
                                    {image.title}
                                </h2>
                                <p className='text-white text-6xl font-semibold tracking-wider text-center'>
                                    {image.text}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
