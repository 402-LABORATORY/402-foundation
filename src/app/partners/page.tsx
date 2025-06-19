'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Partners() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('sponsor');

  // URL 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['sponsor', 'partner', 'donation'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const subNavItems = [
    { name: '출연 기관', id: 'sponsor' },
    { name: '협력 기관', id: 'partner' },
    { name: '후원 안내', id: 'donation' }
  ];

  // 출연 기관 데이터
  const sponsorOrganizations = [
    { id: 1, name: '전국금융산업노동조합', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 2, name: '금융산업사용자협의회', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 3, name: '신한은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 4, name: '우리은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 5, name: 'SC제일은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 6, name: '하나은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 7, name: 'KB국민은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 8, name: 'KDB산업은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 9, name: 'IBK기업은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 10, name: '한국수출입은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 11, name: '씨티은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 12, name: 'iM뱅크', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 13, name: 'BNK부산은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 14, name: 'BNK경남은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 15, name: '광주은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 16, name: '전북은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 17, name: '제주은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 18, name: 'NH농협은행', logo: '/images/hero/hero-bg-1.jpg' }
  ];

  // 협력 기관 데이터
  const partnerOrganizations = [
    { id: 1, name: '한국은행', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 2, name: '금융감독원', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 3, name: '예금보험공사', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 4, name: '신용보증기금', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 5, name: '기술보증기금', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 6, name: '한국주택금융공사', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 7, name: '한국자산관리공사', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 8, name: '한국투자공사', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 9, name: '중소벤처기업부', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 10, name: '고용노동부', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 11, name: '보건복지부', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 12, name: '교육부', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 13, name: '서울시청', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 14, name: '부산시청', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 15, name: '대구시청', logo: '/images/hero/hero-bg-1.jpg' },
    { id: 16, name: '인천시청', logo: '/images/hero/hero-bg-1.jpg' }
  ];

  const renderContent = () => {
    if (activeTab === 'donation') {
      return (
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 border-l-4 border-blue-500 pl-4 inline-block">
                후원 문의
              </h3>
              
              <div className="rounded-full py-6 px-8 mb-8 inline-flex items-center gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-blue-600">02-1234-1234</span>
              </div>
              
              <p className="text-lg text-gray-700">
                후원 문의는 02-1234-1234로 연락 주십시오. 감사합니다.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const organizations = activeTab === 'sponsor' ? sponsorOrganizations : partnerOrganizations;
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-32 overflow-hidden bg-gray-100">
              <img 
                src={org.logo} 
                alt={org.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 text-center">
                {org.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">참여 기관</h1>
          <p className="text-xl text-white/90">
            402공익재단과 함께하는 출연기관과 협력기관을 소개합니다.
          </p>
        </div>
      </section>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-center py-3">
            {subNavItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors duration-200 text-base whitespace-nowrap ${
                    activeTab === item.id
                      ? 'text-blue-500 font-medium'
                      : 'text-gray-500 hover:text-blue-500'
                  }`}
                >
                  {item.name}
                </button>
                                 {index < subNavItems.length - 1 && (
                   <span className="mx-6 text-gray-400">|</span>
                 )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Section Title */}
        {activeTab !== 'donation' && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              {activeTab === 'sponsor' ? '출연 기관' : '협력 기관'}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl">
              {activeTab === 'sponsor' 
                ? '402공익재단의 설립과 운영에 참여하는 출연기관들입니다.' 
                : '402공익재단과 다양한 사업에서 협력하는 기관들입니다.'
              }
            </p>
          </div>
        )}

        {/* Organizations Grid */}
        {renderContent()}
      </div>
    </div>
  );
} 