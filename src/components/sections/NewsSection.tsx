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
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-800">{title}</h2>
            <button 
              onClick={() => router.push('/news')}
              className="group relative inline-flex items-center justify-center px-6 h-[52px] font-medium tracking-wide text-blue-500 transition duration-300 ease-in-out border-2 border-blue-500 rounded-full overflow-hidden"
            >
              <span className="absolute inset-0 bg-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              <span className="relative group-hover:text-white flex items-center gap-2">
                소식활동 바로가기 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
        </motion.div>

        {/* 오른쪽 뉴스 리스트 */}
        <div 
          className="flex-1 space-y-8 relative cursor-none"
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
          
          {newsItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-main-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <span className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${item.categoryColor}`}>
                  {item.category}
                </span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="text-xs text-gray-400">
                    {item.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* 하단 배너 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl p-8 text-white relative overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">402공익재단</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">
                자산형성 지원사업<br />
                신청 홈페이지 바로가기
              </h3>
            </div>
            
            {/* 장식 요소들 */}
            <div className="absolute top-4 right-8 w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
            <div className="absolute bottom-4 right-16 w-8 h-8 bg-white rounded-full opacity-30"></div>
            <div className="absolute top-1/2 right-4 w-12 h-12 bg-yellow-300 rounded-full opacity-40"></div>
            
            {/* 사람 아이콘 (간단한 원형으로 표현) */}
            <div className="absolute bottom-4 right-8 w-16 h-16 bg-white rounded-full opacity-80 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 