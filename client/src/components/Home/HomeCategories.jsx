import { Link } from 'react-router-dom'
import React from 'react'
import { categoriesData } from '../../assets/assets'

function HomeCategories() {
    
  return (
    <section className='py-16'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            {/* العنوان */}
            <div className='mb-8'>
                <h2 className='text-2xl sm:text-3xl font-semibold text-app-text-dark'>Browse Categories</h2>
                <p className='text-sm text-app-text-light mt-1'>Find exactly what you need using our categories</p>
            </div>
            
            {/* السكرول الأفقي */}
            <div className='relative'>
                <div className='flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar'>
                    {categoriesData.map((cat) => (
                        <Link 
                            key={cat.slug} 
                            to={`/products?category=${cat.slug}`}
                            onClick={() => window.scrollTo(0, 0)} 
                            className='group flex flex-col items-center gap-3 p-2 min-w-[80px] sm:min-w-[100px] flex-shrink-0 transition-all duration-300 hover:-translate-y-1'
                        >
                            {/* صورة الكاتيجوري */}
                            <div className='w-20 h-20 sm:w-28 sm:h-28 rounded-full 
                            overflow-hidden bg-orange-100 border-2 border-transparent 
                            group-hover:border-orange-300 group-hover:shadow-lg 
                            group-hover:shadow-orange-200/50 transition-all duration-300'>
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    className='w-full h-full object-cover transition-all duration-300 group-hover:scale-110' 
                                />
                            </div>
                            
                            {/* اسم الكاتيجوري */}
                            <span className='text-sm sm:text-base font-medium text-app-text-dark text-center group-hover:text-orange-500 transition-colors duration-300'>
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>

        {/* إضافة CSS لإخفاء شريط التمرير */}
        <style>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
    </section>
  )
}

export default HomeCategories;