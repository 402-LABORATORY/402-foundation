'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Greeting from './sections/Greeting';
import Presidents from './sections/Presidents';
import Overview from './sections/Overview';
import Mission from './sections/Mission';
import History from './sections/History';
import Officers from './sections/Officers';
import Organization from './sections/Organization';
import Location from './sections/Location';

// useSearchParams를 사용하는 컴포넌트를 분리
function IntroductionContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('greeting');

  // URL 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['greeting', 'presidents', 'overview', 'mission', 'history', 'officers', 'organization', 'location'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const subNavItems = [
    { name: '인사말', id: 'greeting' },
    { name: '역대 이사장', id: 'presidents' },
    { name: '재단 개요', id: 'overview' },
    { name: '미션사업영역', id: 'mission' },
    { name: '주요 연혁', id: 'history' },
    { name: '재단 임원', id: 'officers' },
    { name: '조직', id: 'organization' },
    { name: '오시는 길', id: 'location' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'greeting':
        return <Greeting />;
      case 'presidents':
        return <Presidents />;
      case 'overview':
        return <Overview />;
      case 'mission':
        return <Mission />;
      case 'history':
        return <History />;
      case 'officers':
        return <Officers />;
      case 'organization':
        return <Organization />;
      case 'location':
        return <Location />;
      default:
        return <Greeting />;
    }
  };

  return (
    <>
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
                      ? 'text-blue-500 font-medium'
                      : 'text-gray-500 hover:text-blue-500'
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
    </>
  );
}

export default function Introduction() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-main-500 to-main-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">재단 소개</h1>
          <p className="text-xl text-white/90">
            402공익재단은 공익사업을 통해 사회적 가치를 창출하고 
            지속가능한 발전을 위해 노력하는 공익재단입니다.
          </p>
        </div>
      </section>

      {/* Suspense로 감싸서 useSearchParams 에러 해결 */}
      <Suspense fallback={
        <div className="container mx-auto px-6 py-16">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      }>
        <IntroductionContent />
      </Suspense>
    </div>
  );
} 