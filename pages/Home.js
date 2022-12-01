import React from 'react'
import { Footer } from '../components/footer/Footer'
import { Header } from '../components/header/Header'
import { About } from '../components/home/About'
import { Experience } from '../components/home/Experience'
import { Hero } from '../components/home/Hero'
import { Services } from '../components/home/Services'
import { Testimonies } from '../components/home/Testimonies'

export const Home = () => {
    return (
        <div className=''>
            <Header />
            <Hero />
            <About />
            <Services />
            <Experience />
            <Testimonies />
            <Footer />
        </div>
    )
}
