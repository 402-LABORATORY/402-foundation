import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
  
  const resourceCards: ResourceCard[] = [
    {
      id: 1,
      title: '경영정보 공시',
      image: '/hero/hero-bg-1.png',
      href: '/resources?tab=management'
    },
    {
      id: 2, 
      title: '연차보고서',
      image: '/hero/hero-bg-1.png',
      href: '/resources?tab=annual'
    },
    {
      id: 3,
      title: '연구 보고서', 
      image: '/hero/hero-bg-1.png',
      href: '/resources?tab=research'
    },
    {
      id: 4,
      title: '기타 자료',
      image: '/hero/hero-bg-1.png',
      isLarge: true,
      href: '/resources?tab=other'
    }
  ];

  return (
    <div className="container mx-auto px-8 py-16 min-h-screen flex items-center">
      <div className="flex gap-12 w-full">
        {/* 왼쪽 제목 섹션 */}
        <div className="w-[400px] flex flex-col justify-center">
          <div>
            <h2 className="text-5xl font-bold mb-8 text-gray-800">{title}</h2>
          </div>
        </div>

        {/* 오른쪽 카드 그리드 */}
        <div className="flex-1">
          <div className="space-y-4 h-[600px]">
            {/* 1행: 3개 카드 */}
            <div className="grid grid-cols-3 gap-4">
              {resourceCards.slice(0, 3).map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => router.push(card.href)}
                  className="relative rounded-lg overflow-hidden cursor-pointer group"
                  style={{ height: '400px' }}
                >
                  <div 
                    className={`w-full h-full group-hover:scale-125 transition-transform duration-[2000ms] ${
                      index === 0 ? 'bg-blue-400' : 
                      index === 1 ? 'bg-green-400' : 
                      'bg-purple-400'
                    }`}
                    style={{ 
                      backgroundImage: `url('/hero/hero-bg-1.png')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h3 className="text-white text-xl font-semibold flex items-center gap-2">
                        {card.title}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* 2행: 1개 큰 카드 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              onClick={() => router.push(resourceCards[3].href)}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              style={{ height: '200px' }}
            >
              <div 
                className="w-full h-full bg-orange-400 group-hover:scale-125 transition-transform duration-[2000ms]"
                style={{ 
                  backgroundImage: `url('/hero/hero-bg-1.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-semibold flex items-center gap-2">
                    {resourceCards[3].title}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 