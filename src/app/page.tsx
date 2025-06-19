'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import SectionNavigation from '@/components/layout/SectionNavigation';
import Footer from '@/components/layout/Footer';
import { 
  HeroSection, 
  BusinessSection, 
  NewsSection, 
  ResourcesSection, 
  VisitSection 
} from '@/components/sections';

interface Card {
  title: string;
  bgColor: string;
  image?: string;
}

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cards?: Card[];
  bgGradient: string;
}

const sections: Section[] = [
  {
    id: 'hero',
    title: '행복한 대한민국',
    subtitle: '402공익재단이 함께 하겠습니다',
    description: '일자리 창출 및 청년실업 해소, 직업계층 지원 등\n사회공헌 사업을 통해 국민 경제 발전에 기여합니다',
    bgGradient: 'from-main-400 via-main-500 to-main-600'
  },
  {
    id: 'business',
    title: '주요 사업',
    subtitle: '402공익재단이 조성한 기금으로\n국내외 금융 및 사회위기계층 지원을 위한\n공익사업과 사업을 수행하여\n지속가능한 사회를 만드는 데 기여합니다.',
    cards: [
      { title: '청년 일자리', bgColor: 'bg-gradient-to-br from-orange-400 to-pink-500', image: '/bg-project/001.png' },
      { title: '지역사회공익 사업', bgColor: 'bg-gradient-to-br from-red-400 to-pink-500', image: '/bg-project/002.png' },
      { title: '환경 사업', bgColor: 'bg-gradient-to-br from-green-400 to-teal-500', image: '/bg-project/003.png' },
      { title: '기타', bgColor: 'bg-gradient-to-br from-blue-400 to-indigo-500', image: '/bg-project/004.png' },
      { title: '금융 지원', bgColor: 'bg-gradient-to-br from-purple-400 to-pink-500', image: '/bg-project/005.png' },
      { title: '교육 사업', bgColor: 'bg-gradient-to-br from-yellow-400 to-orange-500', image: '/bg-project/006.png' },
      { title: '문화 사업', bgColor: 'bg-gradient-to-br from-cyan-400 to-blue-500', image: '/bg-project/007.png' },
      { title: '연구 개발', bgColor: 'bg-gradient-to-br from-emerald-400 to-teal-500', image: '/bg-project/008.png' }
    ],
    bgGradient: 'from-gray-100 to-gray-200'
  },
  {
    id: 'visit',
    title: '재단 활동',
    bgGradient: 'bg-main-50'
  },
  {
    id: 'news',
    title: '소식 활동',
    bgGradient: 'bg-main-50'
  },
  {
    id: 'resources',
    title: '자료실',
    bgGradient: 'bg-main-50'
  }
];

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [footerHeight, setFooterHeight] = useState(120); // 기본값
  const footerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef<number>(0);

  // 더 여유로운 애니메이션 설정
  const ANIMATION_DURATION = 1000; // 600ms에서 1000ms로 증가
  const SCROLL_COOLDOWN = 1200; // 스크롤 쿨다운 추가

  // Footer 높이 측정
  useEffect(() => {
    const measureFooterHeight = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        setFooterHeight(height);
      }
    };

    // 초기 측정
    measureFooterHeight();
    
    // 윈도우 리사이즈 시 재측정
    window.addEventListener('resize', measureFooterHeight);
    
    return () => {
      window.removeEventListener('resize', measureFooterHeight);
    };
  }, [showFooter]); // showFooter가 변경될 때도 재측정
  
  // 배경 전환을 위한 애니메이션 variants
  const backgroundVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  // 콘텐츠 애니메이션 variants
  const contentVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '30%' : '-30%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      y: direction > 0 ? '-30%' : '30%',
      opacity: 0,
      scale: 0.95,
    }),
  };

  // 통합된 페이지 전환 함수 - 스크롤 쿨다운 추가
  const paginate = useCallback((newDirection: number) => {
    const now = Date.now();
    if (isScrolling || (now - lastScrollTime.current) < SCROLL_COOLDOWN) return;
    
    lastScrollTime.current = now;
    const lastSectionIndex = sections.length - 1;
    
    setIsScrolling(true);
    
    if (newDirection === 1) {
      // 아래로 스크롤
      if (currentSection < lastSectionIndex) {
        // 일반 섹션 → 다음 섹션
        setDirection(newDirection);
        setCurrentSection(currentSection + 1);
        setShowFooter(false);
      } else if (currentSection === lastSectionIndex && !showFooter) {
        // 마지막 섹션 → Footer 표시 (섹션은 그대로)
        setShowFooter(true);
      }
    } else {
      // 위로 스크롤  
      if (currentSection === lastSectionIndex && showFooter) {
        // Footer 표시 중 → Footer 숨김 (섹션은 그대로)
        setShowFooter(false);
      } else if (currentSection > 0) {
        // 일반 섹션 → 이전 섹션
        setDirection(newDirection);
        setCurrentSection(currentSection - 1);
        setShowFooter(false);
      }
    }
    
    setTimeout(() => setIsScrolling(false), ANIMATION_DURATION);
  }, [currentSection, isScrolling, showFooter, ANIMATION_DURATION, SCROLL_COOLDOWN]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // 스크롤 감도 조정 - 작은 움직임은 무시
      if (Math.abs(e.deltaY) < 30) return;
      const direction = e.deltaY > 0 ? 1 : -1;
      paginate(direction);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        paginate(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        paginate(-1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSection, isScrolling, showFooter, paginate]);

  const goToSection = (index: number) => {
    if (isScrolling || index === currentSection) return;
    const safeIndex = Math.max(0, Math.min(index, sections.length - 1));
    const direction = safeIndex > currentSection ? 1 : -1;
    
    setIsScrolling(true);
    setDirection(direction);
    setCurrentSection(safeIndex);
    setShowFooter(false); // 네비게이션 클릭으로는 Footer로 직접 이동 안함
    setTimeout(() => setIsScrolling(false), ANIMATION_DURATION);
  };

  return (
    <div className="h-screen relative overflow-x-hidden bg-gray-100">
      <Header />
      
      {/* 배경 레이어 - 항상 존재하며 crossfade */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={`bg-${currentSection}`}
            variants={backgroundVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              duration: ANIMATION_DURATION / 1000 * 1.5, // 배경은 더 천천히
              ease: "easeInOut"
            }}
            className={`absolute inset-0 bg-gradient-to-br ${sections[currentSection]?.bgGradient || 'from-gray-100 to-gray-200'}`}
          />
        </AnimatePresence>
      </div>

      {/* 콘텐츠 레이어 */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={`content-${currentSection}`}
          custom={direction}
          variants={contentVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            type: "tween", 
            duration: ANIMATION_DURATION / 1000, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="h-full w-full absolute inset-0 z-[1]"
        >
          <motion.div
            animate={{
              y: showFooter ? -footerHeight : 0
            }}
            transition={{
              type: "tween",
              duration: ANIMATION_DURATION / 1000,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="h-full w-full"
          >
            {currentSection === 0 && (
              <HeroSection 
                title={sections[0].title}
                subtitle={sections[0].subtitle!}
                description={sections[0].description!}
              />
            )}

            {(currentSection === 1) && (
              <BusinessSection 
                title={sections[1].title}
                subtitle={sections[1].subtitle!}
                cards={sections[1].cards!}
              />
            )}

            {(currentSection === 2) && (
              <VisitSection title={sections[2].title} />
            )}

            {(currentSection === 3) && (
              <NewsSection title={sections[3].title} />
            )}

            {(currentSection === 4) && (
              <ResourcesSection title={sections[4].title} />
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Section Navigation - 모든 요소보다 위에 위치 */}
      <SectionNavigation 
        sections={sections}
        currentSection={currentSection}
        onSectionClick={goToSection}
      />

      {/* Footer */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            ref={footerRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ 
              type: "tween", 
              duration: ANIMATION_DURATION / 1000, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
