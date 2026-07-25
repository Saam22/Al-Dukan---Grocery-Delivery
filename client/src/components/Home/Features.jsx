import React from 'react'
import { heroSectionData } from '../../assets/assets'
import { motion } from "framer-motion"

const iconBgColors = [
  "bg-emerald-100 text-emerald-600",
  "bg-orange-100 text-orange-500",
  "bg-blue-100 text-blue-600",
  "bg-purple-100 text-purple-600",
]

function Features() {
  return (
    <section className='bg-white py-5 border border-app-border/80 rounded-xl shadow-sm'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {heroSectionData.hero_features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className='group flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-app-cream transition-all duration-300'
              >
                <div className={`size-11 rounded-xl flex-center shrink-0 transition-colors duration-300 ${iconBgColors[index]}`}>
                  <Icon className='size-5' />
                </div>
                <div>
                  <p className='text-sm font-semibold text-app-green group-hover:text-app-green-light transition-colors'>
                    {feature.title}
                  </p>
                  <p className='text-xs text-app-text-light'>{feature.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Features