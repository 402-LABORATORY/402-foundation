'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Notices from './sections/Notices';
import Media from './sections/Media';
import Activities from './sections/Activities';
import Appearances from './sections/Appearances';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('notices');
  const searchParams = useSearchParams();

  // URL 파라미터에서 초기 탭 설정
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['notices', 'media', 'activities', 'appearances'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const subNavItems = [
    { name: '공지사항', id: 'notices' },
    { name: '언론보도', id: 'media' },
    { name: '재단활동', id: 'activities' },
    { name: '출연현황', id: 'appearances' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'notices':
        return <Notices />;
      case 'media':
        return <Media />;
      case 'activities':
        return <Activities />;
      case 'appearances':
        return <Appearances />;
      default:
        return <Notices />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-600 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">소식 활동</h1>
          <p className="text-xl text-white/90">
            402공익재단의 최신 소식과 다양한 활동을 확인하고
            언론보도 및 출연현황을 통해 재단의 발자취를 살펴보세요.
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
                      ? 'text-purple-500 font-medium'
                      : 'text-gray-500 hover:text-purple-500'
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