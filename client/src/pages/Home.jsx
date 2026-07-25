import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Home/Features'
function Home() {
  return (
    <div className='min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 py-12 ' >
        <Hero />
        <Features />
    </div>
    

  )
}

export default Home