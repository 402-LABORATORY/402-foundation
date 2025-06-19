import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

const backgroundImages = [
  '/hero/hero-bg-1.png',
  '/hero/hero-bg-2.png',
  '/hero/hero-bg-3.png'
];

export default function HeroSection({ title, subtitle, description }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentImageIndex(current => (current + 1) % backgroundImages.length);
          return 0;
        }
        return prev + 0.1; // 더 부드러운 애니메이션 (0.1%씩 증가)
      });
    }, 10); // 더 부드러운 업데이트 (10ms마다, 총 10초)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full relative overflow-hidden">
      {/* Background Images with Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={backgroundImages[currentImageIndex]}
            alt={`Hero background ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority={currentImageIndex === 0}
          />
          {/* Dark overlay for text readability */}
          <motion.div 
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
          {/* Gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-main-900/80 via-main-800/60 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <motion.div className="relative h-full flex items-center">
        <div className="container mx-auto px-20">
          <div className="max-w-3xl text-white">
            <motion.h1 
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.2, 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-7xl font-bold mb-6 leading-tight"
            >
              {title.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + index * 0.05,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.h2 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.6, 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-3xl mb-8 font-medium"
            >
              {subtitle}
            </motion.h2>
            <motion.p 
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: 0.8, 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="text-xl whitespace-pre-line leading-relaxed opacity-90"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="absolute bottom-12 left-20 right-20 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="flex items-center space-x-4">
          {/* Slide indicators */}
          <div className="flex space-x-3">
            {backgroundImages.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setProgress(0);
                }}
                className={`group relative transition-all duration-500 ${
                  index === currentImageIndex 
                    ? 'scale-110' 
                    : 'hover:scale-105'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div 
                  className={`w-4 h-4 rounded-full transition-all duration-500 ${
                    index === currentImageIndex 
                      ? 'bg-white shadow-lg shadow-white/30' 
                      : 'bg-white/60 group-hover:bg-white/90 group-hover:shadow-md group-hover:shadow-white/20'
                  }`}
                  animate={index === currentImageIndex ? {
                    boxShadow: ['0 0 0 0 rgba(255,255,255,0.7)', '0 0 0 10px rgba(255,255,255,0)']
                  } : {}}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500" />
                {/* Active indicator ring */}
                {index === currentImageIndex && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-white/60"
                    animate={{ scale: [1.25, 1.5, 1.25] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-white to-white/80 rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          
          {/* Current/Total indicator */}
          <motion.div 
            className="text-white/80 text-sm font-medium"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentImageIndex + 1} / {backgroundImages.length}
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative element (optional - can be removed if not needed) */}
      <div className="absolute bottom-20 right-20 opacity-30">
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 0.3, rotate: 0 }}
          transition={{ delay: 1.2, duration: 1, ease: "backOut" }}
          className="relative"
        >
          <motion.div 
            className="w-32 h-32 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
            <motion.div 
              className="absolute inset-2 bg-white rounded-full opacity-40"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="absolute inset-4 bg-white rounded-full opacity-60"></div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 