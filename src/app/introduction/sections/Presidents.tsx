'use client';

import { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

export default function Presidents() {
  // 역대 이사장 더미 데이터
  const previousPresidents = [
    {
      id: 1,
      period: "제3기 이사장",
      name: "홍길동",
      position: "대표이사장",
      term: "2022.10.22 ~ 2024.10.21",
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 2,
      period: "제2기 공동이사장",
      name: "홍길동",
      position: "대표이사장",
      term: "2021.10.22 ~ 2022.10.21",
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 3,
      period: "제2기 공동이사장",
      name: "홍길동",
      position: "대표이사장",
      term: "2021.01.07 ~ 2021.10.21",
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 4,
      period: "제1~2기 공동이사장",
      name: "홍길동",
      position: "대표이사장",
      term: "2019.10.22 ~ 2020.11.30",
      image: "/images/hero/hero-bg-1.jpg"
    }
  ];

  // 슬라이더 상태
  const [x, setX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const CARD_WIDTH = 288; // max-w-72 equivalent
  const CARD_GAP = 32;
  const VISIBLE_CARDS = 3;

  const maxX = 0;
  const totalWidth = previousPresidents.length * (CARD_WIDTH + CARD_GAP) + (CARD_GAP * 2);
  const sliderWidth = VISIBLE_CARDS * (CARD_WIDTH + CARD_GAP);
  const minX = -(totalWidth - sliderWidth + CARD_GAP);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const newX = x + info.offset.x;
    
    if (newX > maxX) {
      setX(maxX);
    } else if (newX < minX) {
      setX(minX);
    } else {
      setX(newX);
    }
  };

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isDragging) return;
    
    const newX = x + info.offset.x;
    if (newX > maxX || newX < minX) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 p-8 md:p-12 pb-0"
      >
        역대 이사장
      </motion.h2>
      
      {/* Main Content */}
      <div className="p-8 md:p-12 pt-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Left: President Photo */}
          <div className="flex-shrink-0">
            <div className="rounded-3xl p-8 relative overflow-hidden">
              <img 
                src="/images/hero/hero-bg-1.jpg"
                              alt="제4기 이사장 홍길동"
              className="w-64 h-80 md:w-72 md:h-96 rounded-2xl object-cover shadow-lg relative z-10"
            />
          </div>
        </div>
          
        {/* Right: President Info */}
        <div className="flex-1 text-center md:text-left">
          <div className=" text-gray-800 px-4 py-2 rounded-lg inline-block mb-4">
            <span className="text-lg font-medium">제4기 이사장</span>
          </div>
          
          <h3 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">홍길동</h3>
            
            <div className=" text-gray-800 px-4 py-2 rounded-lg inline-block mb-8">
              <span className="text-lg">2024년 10월 22일 ~</span>
            </div>
            
            <div className="w-16 h-1 mb-8 mx-auto md:mx-0"></div>
            
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-2xl">
              402공익재단은 금융노사가 공동으로 기금을 출연하고<br className="hidden md:block" />
              공동으로 재단을 운영하는 유일한 노사 파트너십 사회공헌 재단입니다.
            </p>
          </div>
        </div>
      </div>

      {/* Previous Presidents Slider */}
      <div className="p-8 md:p-12 pt-0">
        <div 
          className="relative overflow-hidden"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isHovering && (
            <div
              className="fixed pointer-events-none select-none"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600',
                color: 'white',
                transform: 'translate(-50%, -50%)',
                left: mousePosition.x,
                top: mousePosition.y,
                zIndex: 9999,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '2px solid white'
              }}
            >
              DRAG
            </div>
          )}
          
          <motion.div
            className="flex cursor-grab active:cursor-grabbing gap-8"
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
            {previousPresidents.map((president, index) => (
              <motion.div
                key={president.id}
                className="rounded-xl p-6 text-center flex-shrink-0"
                style={{ width: CARD_WIDTH }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0
                }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5
                }}
              >
                <div className="mb-4">
                  <img 
                    src={president.image}
                    alt={`${president.period} ${president.name}`}
                    className="w-full h-56 rounded-lg object-cover shadow-md pointer-events-none select-none"
                    draggable={false}
                  />
                </div>
                <div className="text-blue-600 text-sm font-medium mb-2">{president.period}</div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">{president.name}</h4>
                <div className="text-gray-600 text-sm mb-2">{president.position}</div>
                <div className="text-gray-500 text-xs">{president.term}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
} 