import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface NewsSectionProps {
  title: string;
}

interface NewsItem {
  id: number;
  category: string;
  title: string;
  description: string;
  date: string;
  categoryColor: string;
}

export default function NewsSection({ title }: NewsSectionProps) {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const newsItems: NewsItem[] = [
    {
      id: 1,
      category: '공지',
      title: '<너, 나, 우리 WeTube 프로젝트> 시민투표 참여하기',
      description: '미디어 비평구성원 노동자들이 함께하는 공익영상 공모전 <너, 나, 우리 WeTube 프로젝트>. 작품상 선정을 위해 공모지원작 총 23편이 시열하게 경쟁하고 있습니다. 최종 수상작은 시민투표(50%)와 전문가 심사(50%)로...',
      date: '2025-02-03',
      categoryColor: 'bg-blue-500'
    },
    {
      id: 2,
      category: '언론기사',
      title: '402공익재단 금융 취약계층에 생필품 지원',
      description: '이전 기사보다큰 기사보기 2025-05-30 금융산업공익재단 금융 취약계층에 생필품 지원 바로가기 복사하기 본문 글씨 글자 본문 글씨 기우기 스크롤 아동 상대 바  금융산업공익재단(이사장 주필)과 신용회복위원회(위원장 이채연...',
      date: '2025-05-30',
      categoryColor: 'bg-green-500'
    }
  ];

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
      <div className="flex gap-12 w-full">
        {/* 왼쪽 섹션 */}
        <motion.div 
          className="w-[400px] flex flex-col justify-center"
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
              onClick={() => router.push('/news')}
              className="group relative inline-flex items-center justify-center px-6 h-[52px] font-medium tracking-wide text-blue-500 transition duration-500 ease-in-out border-2 border-blue-500 rounded-full overflow-hidden"
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
                소식활동 바로가기 
                <motion.svg 
                  className="w-4 h-4"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* 오른쪽 뉴스 리스트 */}
        <div 
          className="flex-1 space-y-8 relative cursor-none"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setHoveredItem(null);
          }}
        >
          {isHovering && (
            <motion.div
              className="absolute pointer-events-none z-50"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                backgroundColor: hoveredItem !== null ? 'rgba(59, 130, 246, 0.8)' : 'rgba(128, 128, 128, 0.8)',
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
                scale: hoveredItem !== null ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.8, repeat: hoveredItem !== null ? Infinity : 0 }}
            >
              {hoveredItem !== null ? 'read' : 'view'}
            </motion.div>
          )}
          
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
              className="bg-main-200 p-6 rounded-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <motion.span 
                  className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${item.categoryColor}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.category}
                </motion.span>
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl font-semibold text-gray-800 mb-2 leading-tight"
                    animate={{ opacity: hoveredItem === item.id ? 1 : 0.9 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm text-gray-600 mb-3 line-clamp-3"
                    animate={{ opacity: hoveredItem === item.id ? 0.9 : 0.7 }}
                  >
                    {item.description}
                  </motion.p>
                  <motion.div 
                    className="text-xs text-gray-400"
                    animate={{ opacity: hoveredItem === item.id ? 0.8 : 0.6 }}
                  >
                    {item.date}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* 하단 배너 */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: 0.5, 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2)'
            }}
            className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-8 text-white relative overflow-hidden transition-all duration-300"
          >
            <div className="relative z-10">
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <motion.div 
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </motion.div>
                <span className="text-sm font-medium">402공익재단</span>
              </motion.div>
              <motion.h3 
                className="text-2xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                자산형성 지원사업<br />
                신청 홈페이지 바로가기
              </motion.h3>
            </div>
            
            {/* 장식 요소들 */}
            <motion.div 
              className="absolute top-4 right-8 w-16 h-16 bg-yellow-400 rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-4 right-16 w-8 h-8 bg-white rounded-full opacity-30"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="absolute top-1/2 right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-40"
              animate={{ 
                x: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
            />
            
            {/* 사람 아이콘 (간단한 원형으로 표현) */}
            <motion.div 
              className="absolute bottom-4 right-8 w-16 h-16 bg-white rounded-full opacity-80 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 