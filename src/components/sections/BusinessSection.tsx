import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo, useMotionValue } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Card {
  title: string;
  bgColor: string;
  image?: string;
}

interface BusinessSectionProps {
  title: string;
  subtitle: string;
  cards: Card[];
}

const CARD_WIDTH = 320;
const CARD_GAP = 24;

export default function BusinessSection({ title, subtitle, cards }: BusinessSectionProps) {
  const router = useRouter();
  const [x, setX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const dragX = useMotionValue(0);

  useEffect(() => {
    // 클라이언트에서만 실행
    const updateConstraints = () => {
      const totalWidth = cards.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
      const sliderWidth = window.innerWidth - 700;
      const minX = Math.min(0, -(totalWidth - sliderWidth + 100));
      setConstraints({ left: minX, right: 0 });
    };
    
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [cards.length]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const newX = x + info.offset.x;
    
    // 경계 체크
    if (newX > constraints.right) {
      setX(constraints.right);
    } else if (newX < constraints.left) {
      setX(constraints.left);
    } else {
      setX(newX);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    
    const newX = x + info.offset.x;
    if (newX > constraints.right || newX < constraints.left) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    setMousePosition({
      x: e.clientX + scrollLeft - rect.left,
      y: e.clientY + scrollTop - rect.top
    });
  };

  return (
    <div className="h-full relative">
      <div className="h-full flex items-center">
        {/* Slider Container - Full Width, Behind Left Content */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[480px]">
          {/* Masking Container */}
          <div className="absolute left-[700px] right-0 h-full overflow-hidden">
            <div 
              className="relative h-full" 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <AnimatePresence>
                {isHovering && (
                  <motion.div
                    className="absolute pointer-events-none z-50"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(128, 128, 128, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 1)',
                      transform: 'translate(-50%, -50%)',
                      left: mousePosition.x,
                      top: mousePosition.y
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      scale: isDragging ? 0.9 : 1,
                      rotate: isDragging ? [0, -10, 10, 0] : 0
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isDragging ? 'dragging' : 'drag'}
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                className="flex cursor-none active:cursor-none gap-6 absolute"
                drag="x"
                dragConstraints={{
                  left: constraints.left,
                  right: constraints.right
                }}
                dragElastic={0.05}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                style={{ x: dragX, left: -700 }}
                whileDrag={{ scale: 0.98 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                {cards.map((card, index) => (
                  <motion.div
                    key={`${card.title}-${index}`}
                    className={`w-80 h-[480px] rounded-2xl flex-shrink-0 relative overflow-hidden ${!card.image ? card.bgColor : ''}`}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1
                    }}
                    transition={{
                      delay: index * 0.15,
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.3 }
                    }}
                    style={card.image ? {
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    } : {}}
                  >
                    {/* Overlay for better text readability */}
                    {card.image && (
                      <motion.div 
                        className="absolute inset-0 bg-black/40"
                        whileHover={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Card Content */}
                    <motion.div 
                      className="w-full h-full p-8 flex flex-col items-center justify-center text-white text-center relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Background Pattern */}
                      <motion.div 
                        className="absolute inset-0 opacity-10"
                        initial={{ scale: 1.5, rotate: 45 }}
                        whileHover={{ scale: 2, rotate: 90 }}
                        transition={{ duration: 0.8 }}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                      </motion.div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <motion.h3 
                          className="text-3xl font-bold mb-6"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {card.title}
                        </motion.h3>
                        <motion.div 
                          className="w-20 h-1 bg-white/50 mx-auto rounded-full"
                          whileHover={{ 
                            width: 120,
                            backgroundColor: 'rgba(255,255,255,0.8)'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Left Content - Fixed Position Above Slider */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] pl-40 pr-12 z-10">
          {/* Background gradient matching section background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100 to-transparent"></div>
          <div className="relative z-10">
          <motion.h1 
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 0.2, 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-5xl font-bold mb-8 text-gray-800"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              delay: 0.4, 
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-lg text-gray-600 whitespace-pre-line max-w-lg mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.6, 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/business')}
            className="group relative px-8 py-4 border-2 border-main-500 rounded-full text-main-600 font-semibold overflow-hidden transition-all duration-500 hover:text-white"
          >
            <motion.span 
              className="absolute inset-0 bg-main-500"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{ originX: 0 }}
            />
            <span className="relative flex items-center gap-2">
              주요 사업 바로가기
              <motion.svg 
                className="w-5 h-5"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
} 