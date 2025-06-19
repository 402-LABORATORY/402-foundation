'use client';

import { useParams, useRouter } from 'next/navigation';
import { getContentById } from '../../../utils/contentData';
import { useState, useEffect } from 'react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  subcategory: string;
  content: string;
  image?: string;
  author?: string;
  hasAttachment?: boolean;
}

export default function ContentDetail() {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const contentData = getContentById(params.id as string);
      if (contentData) {
        setContent(contentData as ContentItem);
      } else {
        setContent(null);
      }
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">콘텐츠를 찾을 수 없습니다</h1>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'business':
        return '사업 소개';
      case 'news':
        return '소식 활동';
      case 'resources':
        return '자료실';
      default:
        return '콘텐츠';
    }
  };

  const getSubcategoryName = (category: string, subcategory: string) => {
    if (category === 'business') {
      switch (subcategory) {
        case 'financial': return '서민사회책임 금융';
        case 'community': return '지역사회공익사업';
        case 'global': return '글로벌';
        case 'completed': return '종료된 사업';
        default: return subcategory;
      }
    }
    if (category === 'news') {
      switch (subcategory) {
        case 'notices': return '공지사항';
        case 'media': return '언론보도';
        case 'activities': return '재단활동';
        case 'appearances': return '출연현황';
        default: return subcategory;
      }
    }
    if (category === 'resources') {
      switch (subcategory) {
        case 'management': return '경영정보 공시';
        case 'annual': return '연차 보고서';
        case 'research': return '연구보고서';
        case 'other': return '기타자료';
        default: return subcategory;
      }
    }
    return subcategory;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <button 
                  onClick={() => router.push('/')}
                  className="hover:text-gray-800 transition-colors"
                >
                  홈
                </button>
                <span>/</span>
                <button 
                  onClick={() => router.push(`/${content.category}`)}
                  className="hover:text-gray-800 transition-colors"
                >
                  {getCategoryName(content.category)}
                </button>
                <span>/</span>
                <span className="text-gray-800">{getSubcategoryName(content.category, content.subcategory)}</span>
              </div>
            </nav>
            {/* Article Content */}
            <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
              {/* Back Button */}
              <div className="mb-6">
                <button 
                  onClick={() => router.back()}
                  className="text-gray-600 hover:text-blue-600 transition-colors font-medium cursor-pointer"
                >
                  ← 이전 페이지로
                </button>
              </div>

              {/* Article Header */}
              <header className="mb-8 pb-6 border-b border-gray-200">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {content.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {content.description}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{content.date}</span>
                  </div>
                  
                  {content.author && (
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <span>{content.author}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                    <span>{getSubcategoryName(content.category, content.subcategory)}</span>
                  </div>
                </div>
              </header>

              {/* Content Image */}
              {content.image && (
                <div className="mb-8">
                  <img 
                    src={content.image} 
                    alt={content.title}
                    className="w-full h-80 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Content Body */}
              <div className="prose prose-lg max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {content.content}
                </div>
              </div>

              {/* Additional Content based on category */}
              {content.category === 'business' && (
                <div className="mt-12 p-6 bg-blue-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">사업 상세 정보</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-800">사업 분야:</span>
                      <span className="ml-2 text-gray-700">{getSubcategoryName(content.category, content.subcategory)}</span>
                    </div>
                    <div>
                      <span className="font-medium text-blue-800">등록일:</span>
                      <span className="ml-2 text-gray-700">{content.date}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {content.hasAttachment && (
                <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-gray-200">
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                    첨부파일 다운로드
                  </button>
                </div>
              )}
            </article>
          </div>
        </div>
      </section>
    </div>
  );
} 