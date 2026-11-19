import React from 'react'
import Hero from '../components/Home/Hero'
import AppPromoBanner from '../components/Home/AppPromoBanner'
import Features from '../components/Home/Features'
import Cartsidebar from '../components/Home/Cartsidebar'
import Newsletter from '../components/Home/Newsletter'
import PopularProducts from '../components/Home/PopularProducts'
import HomeCategories from '../components/Home/HomeCategories'
function Home() {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-x-hidden' >
        <Hero />
        <Features />
        <HomeCategories />
        <PopularProducts />
        <AppPromoBanner/>
        <Newsletter />
        <Cartsidebar />
    </div>
    

  )
}

export default Home