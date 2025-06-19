'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getNewsContent } from '../../../utils/contentData';

export default function Activities() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('사진');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 페이지당 9개 항목 (3열 x 3행)

  const tabs = [
    '사진',
    '영상',
    '카드뉴스'
  ];

  // 재단활동 데이터를 JSON에서 가져오기
  const allActivities = getNewsContent('activities');
  
  // 기존 포맷에 맞게 변환
  const activities = allActivities.map((item, index) => ({
    id: index + 1,
    originalId: item.id, // 원본 ID 저장
    type: item.type || '사진',
    title: item.title,
    description: item.description,
    date: item.date,
    cardType: item.cardType || 'small',
    bgGradient: item.bgGradient || 'from-gray-100 to-gray-200',
    hasImage: item.hasImage || false,
    isVideo: item.isVideo || false
  }));

  const handleActivityClick = (activity: { originalId: string }) => {
    router.push(`/content/${activity.originalId}`);
  };

  // 필터링된 데이터 계산
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesTab = activity.type === activeTab;
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm, activities]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  // 모든 카드를 동일한 크기로 통일 (3열 그리드)
  const allCards = currentActivities;

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
      <h2 className="text-3xl font-bold text-gray-800 mb-12">재단활동</h2>
      
      <div className="max-w-7xl mx-auto">
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
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredActivities.length}</span>개의 {activeTab}
            {totalPages > 1 && (
              <span className="ml-2">
                (페이지 {currentPage} / {totalPages})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="제목이나 내용을 검색하세요"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              검색
            </button>
          </div>
        </div>

                 {/* Cards Grid - 3열 고정 */}
         {allCards.length > 0 && (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {allCards.map((activity) => (
               <div
                 key={activity.id}
                 onClick={() => handleActivityClick(activity)}
                 className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
               >
                 {/* Image Section - 상단 절반 */}
                 <div className="relative h-48 overflow-hidden">
                   <img 
                     src="/images/hero/hero-bg-1.jpg" 
                     alt={activity.title}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                   />
                   {/* Type Badge */}
                   <div className="absolute top-4 right-4">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                       activity.type === '사진' ? 'bg-blue-600' :
                       activity.type === '영상' ? 'bg-red-600' :
                       activity.type === '카드뉴스' ? 'bg-green-600' :
                       'bg-gray-600'
                     }`}>
                       {activity.type}
                     </span>
                   </div>
                 </div>

                 {/* Content Section - 하단 절반 */}
                 <div className="p-6">
                   <h3 className="text-gray-800 font-bold text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                     {activity.title}
                   </h3>
                   <p className="text-gray-600 text-sm leading-relaxed mb-4">
                     {activity.description}
                   </p>
                   <div className="flex items-center justify-between">
                     <div className="text-gray-500 text-sm">
                       {activity.date}
                     </div>
                   </div>
                 </div>
               </div>
             ))}
           </div>
         )}

        {/* No Results */}
        {filteredActivities.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다.</p>
            <p className="text-gray-400 text-sm">다른 검색어를 사용해보세요.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
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