'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Youtube, Instagram } from 'lucide-react';

interface FooterSection {
  label: string;
  links: Array<{ title: string; href: string; }>;
}

const footerSections: FooterSection[] = [
  {
    label: '재단 안내',
    links: [
      { title: '재단 소개', href: '/introduction' },
      { title: '사업 소개', href: '/business' },
      { title: '오시는 길', href: '/introduction?tab=location' },
    ],
  },
  {
    label: '정보',
    links: [
      { title: '소식 활동', href: '/news' },
      { title: '자료실', href: '/resources' },
      { title: '참여 기관', href: '/partners' },
    ],
  },
  {
    label: '정책',
    links: [
      { title: '개인정보처리방침', href: '#' },
      { title: '이용약관', href: '#' },
    ],
  },
];

export default function Footer() {
  const [selectedDepartment, setSelectedDepartment] = useState('정보부처');

  const socialLinks = [
    { 
      name: 'YouTube', 
      icon: Youtube, 
      href: '#', 
      bgColor: 'bg-red-600 hover:bg-red-700',
      hoverScale: 'hover:scale-110'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: '#', 
      bgColor: 'bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
      hoverScale: 'hover:scale-110'
    },

  ];

  const departments = [
    '정보부처',
    '기획재정부',
    '금융위원회',
    '금융감독원',
    '한국은행',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
          <AnimatedContainer className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-main-400 to-main-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">402공익재단</h3>
                <p className="text-sm text-gray-400">402 Foundation</p>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 ${social.bgColor} rounded-xl flex items-center justify-center text-white shadow-lg transition-all duration-300 ${social.hoverScale}`}
                  title={social.name}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>

            {/* Contact Information */}
            <div className="mt-8">
              <p className="text-gray-300 text-sm mb-2">
                서울시 중구 수표로 23 한국빌딩 8층
              </p>
              <p className="text-gray-300 text-sm mb-2">
                전화: 02-1234-1234 | 팩스: 02-1234-1234, 02-1234-1234
              </p>
              <p className="text-gray-300 text-sm">
                E-mail: kfif@kfif.or.kr
              </p>
            </div>

            <p className="text-gray-400 text-sm mt-8">
              © {new Date().getFullYear()} 402공익재단. All rights reserved.
            </p>
          </AnimatedContainer>

          <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-3 xl:col-span-2 xl:mt-0">
            {footerSections.map((section, index) => (
              <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                <div className="mb-10 md:mb-0">
                  <h3 className="text-sm font-semibold mb-4 text-white">{section.label}</h3>
                  <ul className="text-gray-400 mt-4 space-y-2 text-sm">
                    {section.links.map((link) => (
                      <li key={link.title}>
                        <a
                          href={link.href}
                          className="hover:text-white inline-flex items-center transition-all duration-300"
                        >
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}

            {/* Department Dropdown */}
            <AnimatedContainer delay={0.4}>
              <div className="mb-10 md:mb-0">
                <h3 className="text-sm font-semibold mb-4 text-white">관련 기관</h3>
                <div className="relative">
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white text-sm appearance-none cursor-pointer hover:bg-gray-750 transition-colors"
                  >
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: string;
  children: React.ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}