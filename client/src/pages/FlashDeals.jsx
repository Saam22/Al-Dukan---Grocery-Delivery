import { useState, useEffect } from 'react'
import { dummyProducts } from '../assets/assets'
import { Zap } from 'lucide-react'
import ProductCard from '../components/Home/Productcard'
import Loading from '../components/Loading'

const FlashDeals = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(dummyProducts.filter((product) => product.discount > 0))
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <div className='min-h-screen bg-app-cream'>
      {/* banner */}
      <div className='bg-linear-to-r from-app-orange to-app-orange-dark text-white py-12'>
        <div className='max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto text-center'>
          <div className='flex items-center justify-center gap-3 mb-2'>
            <Zap className='w-7 h-7 fill-white' />
            <h1 className='text-3xl font-bold'>Flash Deals</h1>
            <Zap className='w-7 h-7 fill-white' />
          </div>
          <p className='text-sm text-white/80'>
            Limited-time offers on your organic products. Grab the best deals before they are gone!
          </p>
        </div>
      </div>
      <div className='max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto py-8'>
        {loading ? (
          <div className='text-center py-20'>
            <p className='text-lg font-semibold text-app-green mb-2'>Loading deals...</p>
          </div>
        ) : error ? (
          <div className='text-center py-20'>
            <p className='text-lg font-semibold text-app-green mb-2'>Error loading deals</p>
          </div>
        ) : products.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-lg font-semibold text-app-green mb-2'>No deals available right now</p>
            <p className='text-sm text-app-text-light'>Check back soon for new offers!</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
            {products.map((product) => product.stock > 0 && (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FlashDeals