'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getNewsContent } from '../../../utils/contentData';

export default function Notices() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 페이지당 6개 항목 (상단 3개 + 하단 3개)

  const tabs = [
    '전체',
    '공지',
    '채용',
    '공모',
    '입찰'
  ];

  // 공지사항 데이터를 JSON에서 가져오기
  const allNotices = getNewsContent('notices');
  
  // displayType이 'small-card' 또는 'large-card'인 항목들만 필터링
  const notices = allNotices.map(item => ({
    id: item.id,
    type: item.type || '공지',
    title: item.title,
    date: item.date,
    isImportant: item.isImportant || false,
    bgGradient: item.bgGradient || 'from-gray-100 to-gray-200',
    cardType: item.displayType === 'large-card' ? 'large' : 'small',
    hasGraphics: item.hasGraphics || false,
    description: item.description
  }));

  const handleNoticeClick = (noticeId: string) => {
    router.push(`/content/${noticeId}`);
  };

  // 필터링된 데이터 계산
  const filteredNotices = useMemo(() => {
    return notices.filter(notice => {
      const matchesTab = activeTab === '전체' || notice.type === activeTab;
      const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotices = filteredNotices.slice(startIndex, endIndex);

  // 현재 페이지의 small/large 카드 분리
  const smallCards = currentNotices.filter(notice => notice.cardType === 'small');
  const largeCards = currentNotices.filter(notice => notice.cardType === 'large');

  // 페이지 번호 생성 (현재 페이지 주변 번호들만 표시)
  const getPageNumbers = () => {
    const delta = 2; // 현재 페이지 앞뒤로 보여줄 페이지 수
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
    // 페이지 변경 시 상단으로 스크롤
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
      <h2 className="text-3xl font-bold text-gray-800 mb-12">공지사항</h2>
      
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
            총 <span className="font-semibold text-blue-600">{filteredNotices.length}</span>개의 공지사항
            {totalPages > 1 && (
              <span className="ml-2">
                (페이지 {currentPage} / {totalPages})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              검색
            </button>
          </div>
        </div>

        {/* Small Cards Grid - Top Row */}
        {smallCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {smallCards.map((notice) => (
              <div
                key={notice.id}
                onClick={() => handleNoticeClick(notice.id)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                                {/* Image Section - 상단 절반 */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/hero/hero-bg-1.jpg" 
                    alt={notice.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                      notice.type === '공지' ? 'bg-blue-600' :
                      notice.type === '채용' ? 'bg-green-600' :
                      notice.type === '공모' ? 'bg-purple-600' :
                      notice.type === '입찰' ? 'bg-orange-600' :
                      'bg-gray-600'
                    }`}>
                      {notice.type}
                    </span>
                  </div>

                </div>

                {/* Content Section - 하단 절반 */}
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-teal-600 font-medium text-sm mb-1">402공익재단</div>
                    <div className="text-xs text-gray-500">402 Foundation</div>
                  </div>
                  <h3 className="text-gray-800 font-bold text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {notice.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm">
                      {notice.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Large Cards Grid - Bottom Row */}
        {largeCards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {largeCards.map((notice) => (
              <div
                key={notice.id}
                onClick={() => handleNoticeClick(notice.id)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden min-h-[400px]"
              >
                                {/* Image Section - 상단 절반 */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/images/hero/hero-bg-1.jpg" 
                    alt={notice.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg ${
                      notice.type === '공지' ? 'bg-blue-600' :
                      notice.type === '채용' ? 'bg-green-600' :
                      notice.type === '공모' ? 'bg-purple-600' :
                      notice.type === '입찰' ? 'bg-orange-600' :
                      'bg-gray-600'
                    }`}>
                      {notice.type}
                    </span>
                  </div>

                </div>

                {/* Content Section - 하단 절반 */}
                <div className="p-6 flex flex-col justify-between h-48">
                  <div>
                    <div className="text-center mb-4">
                      <div className="text-teal-600 font-medium text-sm mb-1">금융산업공익재단</div>
                      <div className="text-xs text-gray-500">Korea Financial Industry Foundation</div>
                    </div>
                    <h3 className="text-gray-800 font-bold text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                      {notice.title}
                    </h3>
                    {notice.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {notice.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-gray-500 text-sm">
                      {notice.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredNotices.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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