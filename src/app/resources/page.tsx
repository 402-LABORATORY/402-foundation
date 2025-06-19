'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ManagementDisclosure from './sections/ManagementDisclosure';
import AnnualReports from './sections/AnnualReports';
import ResearchReports from './sections/ResearchReports';
import OtherMaterials from './sections/OtherMaterials';

export default function ResourcesPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('management');

  // URL 파라미터에서 탭 정보 읽기
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['management', 'annual', 'research', 'other'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const subNavItems = [
    { name: '경영정보 공시', id: 'management' },
    { name: '연차 보고서', id: 'annual' },
    { name: '연구보고서', id: 'research' },
    { name: '기타자료', id: 'other' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'management':
        return <ManagementDisclosure />;
      case 'annual':
        return <AnnualReports />;
      case 'research':
        return <ResearchReports />;
      case 'other':
        return <OtherMaterials />;
      default:
        return <ManagementDisclosure />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">자료실</h1>
          <p className="text-xl text-white/90">
            재단의 경영정보, 연차보고서, 연구자료 등 다양한 정보를 제공합니다
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
    </div>
  );
} 