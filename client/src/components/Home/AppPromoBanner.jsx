import {assets, appPromoBannerData } from '../../assets/assets'
const AppPromoBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 my-14 bg-green-950 rounded-2xl">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 xl:px-">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-serif sm:text-4xl text-white mb-3">
                    {appPromoBannerData.title}
                </h2>
                <p className="text-white/70 mb-6 max-w-md">
                    {appPromoBannerData.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    {/* زر App Store */}
                    <button className='group flex items-center gap-3 px-6 py-3 bg-white text-app-green font-semibold rounded-2xl shadow-lg shadow-app-green/10 hover:shadow-xl hover:shadow-app-green/20 hover:-translate-y-1 transition-all duration-300'>
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <div className="text-left">
                            <span className="text-[10px] leading-none block text-app-text-light/70">Download on the</span>
                            <span className="text-sm font-semibold block text-app-text-dark">App Store</span>
                        </div>
                    </button>

                    {/* زر Google Play */}
                    <button className='group flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 hover:-translate-y-1 transition-all duration-300'>
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zM14.5 12.707l-3.207 3.207L15.765 20l2.531-1.266L14.5 12.707zM15.765 4l-2.531 1.266L11.293 8.5 14.5 11.707 20 6.266 17.469 5 15.765 4z"/>
                        </svg>
                        <div className="text-left">
                            <span className="text-[10px] leading-none block text-white/70">GET IT ON</span>
                            <span className="text-sm font-semibold block text-white">Google Play</span>
                        </div>
                    </button>
                </div>
            </div>
            {/* right side */}
        <img src={assets.delivery_truck} alt="Delivery Truck" className="max-w-60 sm:max-w-120 xl:pr-10" />

        </div>
        
    </section>
  )
}

export default AppPromoBanner

