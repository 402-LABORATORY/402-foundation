import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface VisitSectionProps {
  title: string;
}

type ContentType = 'photo' | 'video' | 'news';

export default function VisitSection({ title }: VisitSectionProps) {
  const router = useRouter();
  const [contentType, setContentType] = useState<ContentType>('photo');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getContentImage = () => {
    switch (contentType) {
      case 'photo':
        return '/hero/hero-bg-1.png';
      case 'video':
        return '/hero/hero-bg-2.png';
      case 'news':
        return '/hero/hero-bg-3.png';
      default:
        return '/hero/hero-bg-1.png';
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
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-800">{title}</h2>
            <button 
              onClick={() => router.push('/news?tab=activities')}
              className="group relative inline-flex items-center justify-center px-4 h-[52px] font-medium tracking-wide text-blue-500 transition duration-300 ease-in-out border-2 border-blue-500 rounded-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="relative group-hover:text-white">재단 활동 더보기</span>
            </button>
          </div>
        </motion.div>

        {/* 중앙 컨텐츠 섹션 */}
        <div 
          className="w-[920px] relative"
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
                scale: 1
              }}
              transition={{ duration: 0.2 }}
            >
              view
            </motion.div>
          )}
          <div className="relative w-[920px] h-[540px] rounded-lg overflow-hidden cursor-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={contentType}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={getContentImage()}
                  alt={`${contentType} content`}
                  fill
                  className="object-cover"
                  sizes="920px"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 오른쪽 버튼 섹션 */}
        <div className="w-[200px] flex flex-col justify-center gap-16">
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setContentType('photo')}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                contentType === 'photo' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <span className="text-2xl"> </span>
            </button>
            <span className="text-sm font-medium">사진 컨텐츠</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setContentType('video')}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                contentType === 'video' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <span className="text-2xl"> </span>
            </button>
            <span className="text-sm font-medium">비디오 컨텐츠</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => setContentType('news')}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                contentType === 'news' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <span className="text-2xl"> </span>
            </button>
            <span className="text-sm font-medium">뉴스 컨텐츠</span>
          </div>
        </div>
      </div>
    </div>
  );
} 