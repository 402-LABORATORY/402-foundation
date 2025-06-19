'use client';

import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import { getResourcesContent } from '../../../utils/contentData';

export default function AnnualReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 페이지당 9개 항목 (3열 x 3행)

  // 연차 보고서 데이터를 JSON에서 가져오기
  const allReports = getResourcesContent('annual');
  
  // 기존 포맷에 맞게 변환
  const reports = allReports.map((item, index) => ({
    id: index + 1,
    title: item.title,
    date: item.date,
    bgGradient: item.bgGradient || 'from-blue-400 to-blue-600',
    year: item.year || '2024'
  }));

  const handleDownloadClick = (reportTitle: string) => {
    toast.info(`임시 페이지라서 실제 다운로드는 지원하지 않습니다. (${reportTitle})`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  // 필터링된 데이터 계산
  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = 
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.year.includes(searchTerm);
      return matchesSearch;
    });
  }, [searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

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

  // 검색어 변경 시 첫 페이지로 리셋
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">연차 보고서</h2>
      
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredReports.length}</span>개의 연차보고서
            {totalPages > 1 && (
              <span className="ml-2">
                (페이지 {currentPage} / {totalPages})
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="연도나 제목을 검색하세요"
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-80"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
              검색
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        {currentReports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentReports.map((report) => (
              <div
                key={report.id}
                onClick={() => handleDownloadClick(report.title)}
                className={`relative bg-gradient-to-br ${report.bgGradient} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group min-h-[320px] flex flex-col justify-between`}
              >
                {/* Header - Report Icon */}
                <div>
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="text-center mb-4">
                    <span className="inline-block bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-full text-2xl font-bold">
                      {report.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-lg text-center mb-4 group-hover:text-gray-100 transition-colors">
                    {report.title}
                  </h3>
                </div>

                {/* Footer */}
                <div className="text-center">
                  <div className="text-white text-sm opacity-90">
                    발행일: {report.date}
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredReports.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
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