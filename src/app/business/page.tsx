'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FinancialSupport from './sections/FinancialSupport';
import CommunityService from './sections/CommunityService';
import Global from './sections/Global';
import CompletedProjects from './sections/CompletedProjects';

function BusinessContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('financial');

  // URL 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    console.log('Business tab parameter:', tab); // 디버깅용
    if (tab && ['financial', 'community', 'global', 'completed'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const subNavItems = [
    { name: '서민사회책임 금융', id: 'financial' },
    { name: '지역사회공익사업', id: 'community' },
    { name: '글로벌', id: 'global' },
    { name: '종료된 사업', id: 'completed' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'financial':
        return <FinancialSupport />;
      case 'community':
        return <CommunityService />;
      case 'global':
        return <Global />;
      case 'completed':
        return <CompletedProjects />;
      default:
        return <FinancialSupport />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">사업 소개</h1>
          <p className="text-xl text-white/90">
            402공익재단은 다양한 사회공헌 사업을 통해 
            금융취약계층 지원과 사회적 가치 창출에 앞장서고 있습니다.
          </p>
        </div>
      </section>

      {/* Sub Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <nav className="flex flex-wrap items-center justify-center py-3">
            {subNavItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`transition-colors duration-200 text-base whitespace-nowrap ${
                    activeTab === item.id
                      ? 'text-green-500 font-medium'
                      : 'text-gray-500 hover:text-green-500'
                  }`}
                >
                  {item.name}
                </button>
                {index < subNavItems.length - 1 && (
                  <span className="mx-3 text-gray-400">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {renderContent()}
      </div>
    </div>
  );
}

export default function Business() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">Loading...</div>}>
      <BusinessContent />
    </Suspense>
  );
} 