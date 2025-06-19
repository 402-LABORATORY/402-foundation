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
        return prev + 0.2; // 더 부드러운 애니메이션 (0.2%씩 증가)
      });
    }, 10); // 더 부드러운 업데이트 (10ms마다, 총 5초)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full relative overflow-hidden">
      {/* Background Images with Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
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
          <div className="absolute inset-0 bg-black/40" />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-main-900/80 via-main-800/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-20">
          <div className="max-w-3xl text-white">
            <motion.h1 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-7xl font-bold mb-6 leading-tight"
            >
              {title}
            </motion.h1>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl mb-8 font-medium"
            >
              {subtitle}
            </motion.h2>
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-xl whitespace-pre-line leading-relaxed opacity-90"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-20 right-20 z-20">
        <div className="flex items-center space-x-4">
          {/* Slide indicators */}
          <div className="flex space-x-3">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImageIndex(index);
                  setProgress(0);
                }}
                className={`group relative transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'scale-110' 
                    : 'hover:scale-105'
                }`}
              >
                <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white shadow-lg shadow-white/30' 
                    : 'bg-white/60 group-hover:bg-white/90 group-hover:shadow-md group-hover:shadow-white/20'
                }`} />
                {/* Ripple effect on hover */}
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-300" />
                {/* Active indicator ring */}
                {index === currentImageIndex && (
                  <div className="absolute inset-0 rounded-full border-2 border-white/60 scale-125 animate-pulse" />
                )}
              </button>
            ))}
          </div>
          
          {/* Progress bar */}
          <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
          
          {/* Current/Total indicator */}
          <div className="text-white/80 text-sm font-medium">
            {currentImageIndex + 1} / {backgroundImages.length}
          </div>
        </div>
      </div>

      {/* Decorative element (optional - can be removed if not needed) */}
      <div className="absolute bottom-20 right-20 opacity-30">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative"
        >
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 bg-white rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full opacity-40 animate-pulse animation-delay-300"></div>
            <div className="absolute inset-4 bg-white rounded-full opacity-60"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 