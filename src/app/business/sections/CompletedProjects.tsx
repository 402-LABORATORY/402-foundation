'use client';

import { useState } from 'react';

export default function CompletedProjects() {
  const [activeTab, setActiveTab] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    '전체',
    '서민금융·사회책임금융',
    '지역사회·공익사업',
    '글로벌'
  ];

  const projects = [
    {
      no: 13,
      year: 2023,
      title: '자립준비청년(보호종료아동) 취업촉진·자산형성 지원사업',
      category: '서민금융·사회책임금융'
    },
    {
      no: 12,
      year: 2022,
      title: '한경호르몬 없는 아동친화공간 만들기 지원사업',
      category: '지역사회·공익사업'
    },
    {
      no: 11,
      year: 2022,
      title: '무보험 외국인 코로나19 진료비 지원사업',
      category: '글로벌'
    },
    {
      no: 10,
      year: 2022,
      title: '취약계층 방한용품 지원사업',
      category: '지역사회·공익사업'
    },
    {
      no: 8,
      year: 2022,
      title: '아동복지 종사자 정신건강 지원사업',
      category: '지역사회·공익사업'
    },
    {
      no: 7,
      year: 2021,
      title: '코로나19 피해 소상공인 임대료 지원사업',
      category: '서민금융·사회책임금융'
    },
    {
      no: 6,
      year: 2021,
      title: '청년 주거안정 지원사업',
      category: '서민금융·사회책임금융'
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesTab = activeTab === '전체' || project.category === activeTab;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">종료된 사업</h2>
      
      <div className="max-w-6xl mx-auto">

        {/* Content Container */}
        <div className="bg-gray-50 rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <div className="flex flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Section */}
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="flex justify-end">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
                />
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  검색
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">연도</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">제목</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProjects.map((project, index) => (
                  <tr key={project.no} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {project.no}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {project.year}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {project.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
            </div>
          )}

          {/* Footer */}
          <div className="p-6 bg-white text-center">
            <p className="text-sm text-gray-600">
              총 {filteredProjects.length}개의 종료된 사업이 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 