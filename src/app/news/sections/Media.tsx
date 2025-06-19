'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getNewsContent } from '../../../utils/contentData';

export default function Media() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('보도자료');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 10개 항목

  const tabs = [
    '보도자료',
    '언론기사'
  ];

  // 언론보도 데이터를 JSON에서 가져오기
  const allMediaData = getNewsContent('media');
  
  // 기존 포맷에 맞게 변환
  const mediaData = allMediaData.map((item, index) => ({
    id: 103 - index, // 역순으로 ID 할당
    originalId: item.id, // 원본 ID 저장
    type: item.type || '보도자료',
    title: item.title,
    author: item.author || '재단',
    date: item.date,
    hasFile: item.hasFile || false
  }));

  const handleMediaClick = (media: any) => {
    router.push(`/content/${media.originalId}`);
  };

  // 필터링된 데이터 계산
  const filteredData = useMemo(() => {
    return mediaData.filter(item => {
      const matchesTab = item.type === activeTab;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // 페이지 번호 생성
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 탭이나 검색어 변경 시 첫 페이지로 리셋
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">언론보도</h2>
      
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
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
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredData.length}</span>개의 {activeTab}
            {totalPages > 1 && (
              <span className="ml-2">
                (페이지 {currentPage} / {totalPages})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="제목이나 작성자를 검색하세요"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              검색
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="bg-blue-600 text-white">
            <div className="grid grid-cols-12 gap-4 items-center px-6 py-4 font-semibold">
              <div className="col-span-1 text-center">No</div>
              <div className="col-span-6">제목</div>
              <div className="col-span-2 text-center">작성자</div>
              <div className="col-span-3 text-center">등록일</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {currentData.map((item, index) => (
              <div 
                key={item.id} 
                onClick={() => handleMediaClick(item)}
                className={`grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-blue-50 transition-colors duration-200 cursor-pointer ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="col-span-1 text-center text-gray-600 font-medium">
                  {item.id}
                </div>
                <div className="col-span-6">
                  <a 
                    href="#" 
                    className="text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium leading-relaxed"
                  >
                    {item.title}
                  </a>
                </div>
                <div className="col-span-2 text-center text-gray-600">
                  {item.author}
                </div>
                <div className="col-span-3 text-center text-gray-600">
                  {item.date}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {currentData.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다.</p>
              <p className="text-gray-400 text-sm">다른 검색어를 사용해보세요.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-1">
              {/* Previous Button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                이전
              </button>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <div key={index}>
                  {page === '...' ? (
                    <span className="px-4 py-2 text-gray-400">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page as number)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </div>
              ))}

              {/* Next Button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 