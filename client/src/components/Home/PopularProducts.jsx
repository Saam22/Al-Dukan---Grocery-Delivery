import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { dummyProducts } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from 'lucide-react'
import ProductCard from './Productcard'
const PopularProducts = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      setProducts(dummyProducts.slice(0, 10));
    }, []);
  return (
    <section className='pb-16'>
      <div className='w-full'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8'>
          <div>
            <h2 className='text-xl sm:text-2xl font-semibold'>Popular Products</h2>
            <p className='text-sm text-app-text-light mt-1'>Top-rated products this season</p>
          </div>
          <Link to="/products" className='text-sm font-semibold text-app-green hover:text-app-orange-dark flex items-center gap-1 transition-colors shrink-0'>
              View All Products <ArrowRightIcon className="size-4"/>
          </Link>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 xl:gap-6'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default PopularProducts
