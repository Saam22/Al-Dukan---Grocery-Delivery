import React from 'react'
import { heroSectionData } from "../assets/assets"
import { ArrowRightIcon, LeafIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Hero() {
  const { hero_image, description, hero_features } = heroSectionData;

  return (
    <section className='relative overflow-hidden min-h-[600px] lg:min-h-[620px] mb-12 rounded-3xl flex items-center'>
      {/* Background Image */}
      <img
        src={hero_image}
        alt="Hero Image"
        className='absolute inset-0 object-cover w-full h-full scale-110 transition-transform duration-[2s]'
      />

      {/* Gradient Overlay */}
      <div className='absolute inset-0 bg-linear-to-r from-app-green via-app-green/65 to-transparent' />

      {/* Animated Content */}
      <motion.div
        className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-20 w-full'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className='max-w-xl xl:pl-10'>
          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className='inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-orange-300 bg-orange-300/10 rounded-full mb-5'
          >
            <LeafIcon className="size-3" />
            Farm-Fresh & Organic
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className='font-serif text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5'
          >
            Nourish your home with{' '}
            <span className='text-orange-300'>Earth's finest</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className='text-base text-white/70 leading-relaxed mb-8 max-w-md'
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              to="/products"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-app-green rounded-full shadow-lg shadow-app-green/25 hover:bg-app-green/90 hover:shadow-xl hover:shadow-app-green/30 hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
            >
              Shop Now
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-app-green bg-white border-2 border-app-green/20 rounded-full hover:border-app-orange hover:bg-app-orange hover:text-white hover:shadow-lg hover:shadow-app-orange/2 transition-all duration-200 w-full sm:w-auto"
            >
              Browse Categories
            </Link>
          </motion.div>

          {/* Feature Strip */}
          {/* <motion.div
            variants={itemVariants}
            className="hidden sm:flex items-center gap-6 mt-12 pt-8 border-t border-white/10"
          >
            {hero_features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="flex items-center gap-2.5 group">
                  <span className="flex items-center justify-center size-9 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                    <Icon className="size-4 text-orange-300" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                    <p className="text-xs text-white/50">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div> */}
        </div>
      </motion.div>
    </section>
  )
}

export default Hero