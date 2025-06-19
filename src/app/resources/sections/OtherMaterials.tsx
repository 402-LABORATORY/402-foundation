'use client';

import { useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export default function OtherMaterials() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 페이지당 10개 항목

  // 샘플 기타자료 데이터
  const materials = [
    {
      id: 1,
      title: '재단 브랜드 가이드라인',
      author: '홍보팀',
      date: '2025-01-05',
      hasAttachment: true
    },
    {
      id: 2,
      title: '금융교육 교재 템플릿',
      author: '교육개발팀',
      date: '2024-12-28',
      hasAttachment: true
    },
    {
      id: 3,
      title: '사업 제안서 양식',
      author: '기획팀',
      date: '2024-12-15',
      hasAttachment: true
    },
    {
      id: 4,
      title: '재단 소개 브로셔',
      author: '홍보팀',
      date: '2024-11-30',
      hasAttachment: true
    },
    {
      id: 5,
      title: '금융소외계층 지원 신청서',
      author: '사회공헌팀',
      date: '2024-11-20',
      hasAttachment: true
    },
    {
      id: 6,
      title: '교육 프로그램 신청 양식',
      author: '교육운영팀',
      date: '2024-10-25',
      hasAttachment: true
    },
    {
      id: 7,
      title: '재단 조직도 및 연락처',
      author: '인사팀',
      date: '2024-10-10',
      hasAttachment: false
    },
    {
      id: 8,
      title: '금융교육 동영상 자료집',
      author: '콘텐츠팀',
      date: '2024-09-18',
      hasAttachment: true
    },
    {
      id: 9,
      title: '사회공헌 활동 가이드',
      author: '사회공헌팀',
      date: '2024-08-22',
      hasAttachment: true
    },
    {
      id: 10,
      title: '재단 로고 및 CI 파일',
      author: '디자인팀',
      date: '2024-07-15',
      hasAttachment: true
    },
    {
      id: 11,
      title: '금융용어 사전',
      author: '교육개발팀',
      date: '2024-06-30',
      hasAttachment: true
    },
    {
      id: 12,
      title: '언론 보도자료 템플릿',
      author: '홍보팀',
      date: '2024-05-20',
      hasAttachment: true
    },
    {
      id: 13,
      title: '파트너십 협약서 양식',
      author: '협력팀',
      date: '2024-04-18',
      hasAttachment: true
    },
    {
      id: 14,
      title: '재단 연혁 및 주요 성과',
      author: '기획팀',
      date: '2024-03-25',
      hasAttachment: false
    },
    {
      id: 15,
      title: '금융교육 효과성 측정 도구',
      author: '평가팀',
      date: '2024-02-14',
      hasAttachment: true
    }
  ];

  // 필터링된 데이터 계산
  const filteredMaterials = useMemo(() => {
    return materials.filter(material => {
      const matchesSearch = 
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.author.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMaterials = filteredMaterials.slice(startIndex, endIndex);

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

  const handleItemClick = (title: string) => {
    toast.info(`임시 페이지라서 실제 다운로드는 지원하지 않습니다. (${title})`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-12">기타자료</h2>
      
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-sm text-gray-600">
            총 <span className="font-semibold text-blue-600">{filteredMaterials.length}</span>개의 기타자료
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
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-center text-sm font-semibold w-20">No</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">제목</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold w-32">작성자</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold w-32">등록일</th>
                </tr>
              </thead>
              
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {currentMaterials.map((material, index) => (
                  <tr 
                    key={material.id}
                    onClick={() => handleItemClick(material.title)}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-500">
                        {startIndex + index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                          {material.title}
                        </div>
                        {material.hasAttachment && (
                          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-700">
                        {material.author}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="text-sm text-gray-500">
                        {material.date}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredMaterials.length === 0 && (
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