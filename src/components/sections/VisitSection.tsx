import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface VisitSectionProps {
  title: string;
}

type ContentType = 'youth' | 'community' | 'scholarship';

export default function VisitSection({ title }: VisitSectionProps) {
  const router = useRouter();
  const [contentType, setContentType] = useState<ContentType>('youth');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getContentImage = () => {
    switch (contentType) {
      case 'youth':
        return '/bg-subpro/bg-subpro-1.png';
      case 'community':
        return '/bg-subpro/bg-subpro-2.png';
      case 'scholarship':
        return '/bg-subpro/bg-subpro-3.png';
      default:
        return '/bg-subpro/bg-subpro-1.png';
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
    <div className="container mx-auto px-8 py-16 min-h-screen flex items-center">
      <div className="flex gap-8">
        {/* 왼쪽 섹션 */}
        <motion.div 
          className="w-[300px] flex flex-col justify-center"
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          <div>
            <motion.h2 
              className="text-5xl font-bold mb-8 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              {title}
            </motion.h2>
            <motion.button 
              onClick={() => router.push('/news?tab=activities')}
              className="group relative inline-flex items-center justify-center px-4 h-[52px] font-medium tracking-wide text-blue-500 transition duration-500 ease-in-out border-2 border-blue-500 rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="absolute inset-0 bg-blue-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />
              <span className="relative group-hover:text-white flex items-center gap-2">
                <motion.svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="transition-colors"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
                재단 활동 더보기
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* 중앙 컨텐츠 섹션 */}
        <motion.div 
          className="w-[920px] relative"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute pointer-events-none z-50"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(59, 130, 246, 0.8)',
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
                  scale: [1, 1.1, 1],
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ 
                  scale: { duration: 0.8, repeat: Infinity },
                  opacity: { duration: 0.2 }
                }}
              >
                view
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div 
            className="relative w-[920px] h-[540px] rounded-lg overflow-hidden cursor-none"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={contentType}
                initial={{ opacity: 0, scale: 1.1, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                transition={{ 
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="absolute inset-0"
              >
                <Image
                  src={getContentImage()}
                  alt={`${contentType} content`}
                  fill
                  className="object-cover"
                  sizes="920px"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* 오른쪽 버튼 섹션 */}
        <motion.div 
          className="w-[200px] flex flex-col justify-center gap-16"
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setContentType('youth')}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                contentType === 'youth' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={contentType === 'youth' ? {
                boxShadow: ['0 10px 25px -5px rgba(59, 130, 246, 0.5)', '0 10px 25px -5px rgba(59, 130, 246, 0.3)', '0 10px 25px -5px rgba(59, 130, 246, 0.5)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <motion.span 
              className="text-sm font-medium"
              animate={{ opacity: contentType === 'youth' ? 1 : 0.7 }}
            >
              청년 소모임 지원
            </motion.span>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setContentType('community')}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                contentType === 'community' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={contentType === 'community' ? {
                boxShadow: ['0 10px 25px -5px rgba(59, 130, 246, 0.5)', '0 10px 25px -5px rgba(59, 130, 246, 0.3)', '0 10px 25px -5px rgba(59, 130, 246, 0.5)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69365 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69365 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7563 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77751 22.3095 7.0621 22.0329 6.39464C21.7563 5.72718 21.351 5.12075 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <motion.span 
              className="text-sm font-medium"
              animate={{ opacity: contentType === 'community' ? 1 : 0.7 }}
            >
              지역마을 봉사
            </motion.span>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              onClick={() => setContentType('scholarship')}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                contentType === 'scholarship' 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={contentType === 'scholarship' ? {
                boxShadow: ['0 10px 25px -5px rgba(59, 130, 246, 0.5)', '0 10px 25px -5px rgba(59, 130, 246, 0.3)', '0 10px 25px -5px rgba(59, 130, 246, 0.5)']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 10V16M22 10L12 5L2 10L12 15L22 10ZM6 12V17C6 17 6 19 12 19C18 19 18 17 18 17V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <motion.span 
              className="text-sm font-medium"
              animate={{ opacity: contentType === 'scholarship' ? 1 : 0.7 }}
            >
              장학기금 운영
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 