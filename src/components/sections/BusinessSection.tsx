import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
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
const VISIBLE_CARDS = 3; // 한 번에 보여질 카드 수

export default function BusinessSection({ title, subtitle, cards }: BusinessSectionProps) {
  const router = useRouter();
  const [x, setX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const maxX = 0;
  // 총 width에서 슬라이더 width를 뺀 값이 minX
  const totalWidth = cards.length * (CARD_WIDTH + CARD_GAP) - CARD_GAP;
  const sliderWidth = VISIBLE_CARDS * (CARD_WIDTH + CARD_GAP) + 200; // 오른쪽 여백 추가
  const minX = -(totalWidth - sliderWidth);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    const newX = x + info.offset.x;
    
    // 경계 체크
    if (newX > maxX) {
      setX(maxX);
    } else if (newX < minX) {
      setX(minX);
    } else {
      setX(newX);
    }
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (!isDragging) return;
    
    const newX = x + info.offset.x;
    if (newX > maxX || newX < minX) {
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
        {/* Left Content - Fixed Position */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] pl-80 pr-12 z-10">
          <motion.h1 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-5xl font-bold mb-8 text-gray-800"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 whitespace-pre-line max-w-lg mb-8"
          >
            {subtitle}
          </motion.p>
          <motion.button 
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            onClick={() => router.push('/business')}
            className="group relative px-8 py-4 border-2 border-main-500 rounded-full text-main-600 font-semibold overflow-hidden transition-all duration-300 hover:text-white"
          >
            <span className="absolute inset-0 bg-main-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative flex items-center gap-2">
              주요 사업 바로가기
              <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </motion.button>
        </div>
        
        {/* Slider Container - Full Width */}
        <div className="w-full ml-[600px] relative z-20">
          <div 
            className="relative overflow-visible" 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
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
                animate={{
                  scale: isDragging ? 0.9 : 1
                }}
                transition={{ duration: 0.2 }}
              >
                drag
              </motion.div>
            )}
            <motion.div
              className="flex cursor-none active:cursor-none gap-6"
              drag="x"
              dragConstraints={{
                left: minX,
                right: maxX
              }}
              dragElastic={0.1}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              style={{ x }}
              whileDrag={{ scale: 0.98 }}
            >
              {cards.map((card, index) => (
                <motion.div
                  key={`${card.title}-${index}`}
                  className={`w-80 h-[480px] rounded-2xl flex-shrink-0 relative overflow-hidden ${!card.image ? card.bgColor : ''}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5
                  }}
                  style={card.image ? {
                    backgroundImage: `url(${card.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  } : {}}
                >
                  {/* Overlay for better text readability */}
                  {card.image && (
                    <div className="absolute inset-0 bg-black/40"></div>
                  )}
                  
                  {/* Card Content */}
                  <div className="w-full h-full p-8 flex flex-col items-center justify-center text-white text-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-6">{card.title}</h3>
                      <div className="w-20 h-1 bg-white/50 mx-auto rounded-full"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 