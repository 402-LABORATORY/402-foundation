'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);

  const menuItems = [
    {
      name: '재단 소개',
      href: '/introduction?tab=greeting',
      subItems: [
        { name: '인사말', href: '/introduction?tab=greeting' },
        { name: '역대 이사장', href: '/introduction?tab=presidents' },
        { name: '재단 개요', href: '/introduction?tab=overview' },
        { name: '미션사업영역', href: '/introduction?tab=mission' },
        { name: '주요 연혁', href: '/introduction?tab=history' },
        { name: '재단 임원', href: '/introduction?tab=officers' },
        { name: '조직', href: '/introduction?tab=organization' },
        { name: '오시는 길', href: '/introduction?tab=location' }
      ]
    },
    {
      name: '사업 소개',
      href: '/business?tab=financial',
      subItems: [
        { name: '서민사회책임 금융', href: '/business?tab=financial' },
        { name: '지역사회공익사업', href: '/business?tab=community' },
        { name: '글로벌', href: '/business?tab=global' },
        { name: '종료된 사업', href: '/business?tab=completed' }
      ]
    },
    {
      name: '소식 활동',
      href: '/news?tab=notices',
      subItems: [
        { name: '공지사항', href: '/news?tab=notices' },
        { name: '언론보도', href: '/news?tab=media' },
        { name: '재단활동', href: '/news?tab=activities' },
        { name: '출연현황', href: '/news?tab=appearances' }
      ]
    },
        { 
      name: '자료실', 
      href: '/resources?tab=management',
      subItems: [
        { name: '경영정보 공시', href: '/resources?tab=management' },
        { name: '연차보고서', href: '/resources?tab=annual' },
        { name: '연구보고서', href: '/resources?tab=research' },
        { name: '기타 자료', href: '/resources?tab=other' }
      ]
    },
    {
      name: '참여 기관',
      href: '/partners?tab=sponsor',
      subItems: [
        { name: '출연 기관', href: '/partners?tab=sponsor' },
        { name: '협력 기관', href: '/partners?tab=partner' },
        { name: '후원 안내', href: '/partners?tab=donation' }
      ]
    }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-main-400 to-main-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">4</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">402공익재단</h1>
            <span className="text-sm text-gray-500 hidden sm:block">
              402 Foundation
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center justify-center flex-1"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <div className="flex items-center max-w-4xl w-full">
              {menuItems.map((item, index) => (
                <div key={item.name} className="relative flex-1 text-center px-4">
                  <a
                    href={item.href}
                    className="relative text-gray-700 hover:text-main-600 transition-colors duration-300 font-medium py-2 block"
                    onMouseEnter={() => setHoveredMenuItem(item.name)}
                    onMouseLeave={() => setHoveredMenuItem(null)}
                  >
                    {item.name}
                    {/* Hover border animation */}
                    <span className={`absolute bottom-0 left-6 right-6 h-0.5 bg-main-500 transform transition-transform duration-300 ease-out ${hoveredMenuItem === item.name ? 'scale-x-100' : 'scale-x-0'}`}></span>
                  </a>
                </div>
              ))}
            </div>
          </nav>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col space-y-1 p-2"
          >
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-700 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-main-600 transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </motion.nav>
        )}
      </div>

      {/* Mega Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg transition-all duration-300 ease-out ${isMegaMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          }`}
        onMouseEnter={() => setIsMegaMenuOpen(true)}
        onMouseLeave={() => setIsMegaMenuOpen(false)}
      >
        <div className="container mx-auto">
          <div className="flex items-start">
            {/* 왼쪽 이미지 */}
            <div className="flex-shrink-0">
              <div
                className="w-[280px] h-[200px] rounded-lg bg-cover bg-center bg-gray-200 shadow-md"
                style={{
                  backgroundImage: `url('/images/hero/hero-bg-1.jpg')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </div>

            {/* 오른쪽 메뉴 - 상단 네비게이션과 정확히 일치 */}
            <div className="flex-1 -ml-2">
              <div className="flex justify-between items-start max-w-4xl mx-auto">
                {menuItems.map((item, index) => (
                  <div key={item.name} className="flex-1 px-4">

                    {/* 서브 메뉴 항목들 */}
                    <div className="space-y-1">
                      {item.subItems?.map((subItem, subIndex) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-sm text-gray-600 hover:text-main-600 hover:bg-main-50 py-2 rounded-md transition-all duration-200 font-medium text-center"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
} 