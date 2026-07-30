import React from 'react'
import Hero from '../components/Home/Hero'
import AppPromoBanner from '../components/Home/AppPromoBanner'
import ProductCard from '../components/Home/Productcard'
import Features from '../components/Home/Features'
import Newsletter from '../components/Home/Newsletter'
import PopularProducts from '../components/Home/PopularProducts'
import HomeCategories from '../components/Home/HomeCategories'
function Home() {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-12 ' >
        <Hero />
        <Features />
        <HomeCategories />
        <PopularProducts />
        <AppPromoBanner/>
        <Newsletter />
    </div>
    

  )
}

export default Home