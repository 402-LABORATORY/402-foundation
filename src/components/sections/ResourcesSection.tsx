import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ResourcesSectionProps {
  title: string;
}

interface ResourceCard {
  id: number;
  title: string;
  image: string;
  isLarge?: boolean;
  href: string;
}

export default function ResourcesSection({ title }: ResourcesSectionProps) {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const resourceCards: ResourceCard[] = [
    {
      id: 1,
      title: '경영정보 공시',
      image: '/bg-reports/001.png',
      href: '/resources?tab=management'
    },
    {
      id: 2, 
      title: '연차보고서',
      image: '/bg-reports/002.png',
      href: '/resources?tab=annual'
    },
    {
      id: 3,
      title: '연구 보고서', 
      image: '/bg-reports/003.png',
      href: '/resources?tab=research'
    },
    {
      id: 4,
      title: '기타 자료',
      image: '',
      isLarge: true,
      href: '/resources?tab=other'
    }
  ];

  return (
    <div className="container mx-auto px-8 py-16 min-h-screen flex items-center">
      <div className="flex gap-12 w-full">
        {/* 왼쪽 제목 섹션 */}
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
          </div>
        </motion.div>

        {/* 오른쪽 카드 그리드 */}
        <motion.div 
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="space-y-4 h-[600px]">
            {/* 1행: 3개 카드 */}
            <div className="grid grid-cols-3 gap-4">
              {resourceCards.slice(0, 3).map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  transition={{ 
                    delay: 0.3 + index * 0.15, 
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  onClick={() => router.push(card.href)}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="relative rounded-lg overflow-hidden cursor-pointer group perspective-1000"
                  style={{ height: '400px' }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div 
                    className="w-full h-full"
                    style={{ 
                      backgroundImage: `url('${card.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    animate={{
                      scale: hoveredCard === card.id ? 1.15 : 1
                    }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                  {/* 가독성을 위한 오버레이 */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"
                    animate={{
                      opacity: hoveredCard === card.id ? 0.8 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      className="text-center"
                      animate={{
                        scale: hoveredCard === card.id ? 1.1 : 1,
                        y: hoveredCard === card.id ? -5 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-white text-xl font-semibold flex items-center gap-2 drop-shadow-lg">
                        {card.title}
                        <motion.svg 
                          className="w-5 h-5"
                          animate={{ 
                            x: hoveredCard === card.id ? [0, 5, 0] : 0
                          }}
                          transition={{ duration: 0.5, repeat: hoveredCard === card.id ? Infinity : 0 }}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </h3>
                    </motion.div>
                  </div>
                  {/* 호버 시 테두리 효과 */}
                  <motion.div
                    className="absolute inset-0 border-2 border-white/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredCard === card.id ? 1 : 0,
                      scale: hoveredCard === card.id ? 1 : 0.95
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* 2행: 1개 큰 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.7, 
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              onClick={() => router.push(resourceCards[3].href)}
              onMouseEnter={() => setHoveredCard(4)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              style={{ height: '200px' }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="w-full h-full bg-gradient-to-br from-main-400 via-main-500 to-main-600"
                animate={{
                  backgroundPosition: hoveredCard === 4 ? '100% 100%' : '0% 0%'
                }}
                transition={{ duration: 2 }}
                style={{ backgroundSize: '200% 200%' }}
              />
              {/* 패턴 오버레이 */}
              <motion.div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
                animate={{
                  backgroundPosition: hoveredCard === 4 ? '20px 20px' : '0px 0px'
                }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  className="text-center"
                  animate={{
                    scale: hoveredCard === 4 ? 1.1 : 1,
                    y: hoveredCard === 4 ? -5 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-white text-2xl font-semibold flex items-center gap-2 drop-shadow-lg">
                    {resourceCards[3].title}
                    <motion.svg 
                      className="w-6 h-6"
                      animate={{ 
                        x: hoveredCard === 4 ? [0, 5, 0] : 0,
                        rotate: hoveredCard === 4 ? [0, 15, 0] : 0
                      }}
                      transition={{ duration: 0.5, repeat: hoveredCard === 4 ? Infinity : 0 }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </h3>
                </motion.div>
              </div>
              {/* 호버 시 빛나는 효과 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                animate={{ 
                  x: hoveredCard === 4 ? '100%' : '-100%'
                }}
                transition={{ duration: 0.8 }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 