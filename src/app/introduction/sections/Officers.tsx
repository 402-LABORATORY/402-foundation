'use client';

import { motion } from 'framer-motion';

export default function Officers() {
  // 현직 임원진 데이터
  const currentOfficers = [
    {
      id: 1,
      position: "이사장",
      name: "홍길동",
      title: "제4기 이사장",
      term: "2024.10.22 ~",
      career: [
        "現) 402공익재단 변호사",
        "前) 402공익재단 노무변호사회 회장", 
        "前) 고용노동부 자문변호사",
        "前) 국민경제자문회의 위원"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 2,
      position: "상임이사",
      name: "홍길동",
      title: "상임이사",
      term: "2024.10.22 ~",
      career: [
        "現) 402공익재단 이사장",
        "前) 402공익재단 국제관계학과 교수",
        "前) 전국금융노동조합평 위원장"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    }
  ];

  // 이사진 데이터
  const directors = [
    {
      id: 1,
      position: "당연직이사",
      name: "홍길동",
      organization: "402공익재단",
      career: [
        "現) 402공익재단 위원장"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 2,
      position: "당연직이사", 
      name: "홍길동",
      organization: "402공익재단",
      career: [
        "現) 402공익재단 회장"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 3,
      position: "추천이사",
      name: "홍길동",
      organization: "학계",
      career: [
        "現) 402공익재단 경영학과 교수",
        "前) 한국금융학회 회장"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 4,
      position: "추천이사",
      name: "홍길동", 
      organization: "법조계",
      career: [
        "現) 402공익재단 변호사",
        "前) 402공익재단 이사"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    }
  ];

  // 감사진 데이터
  const auditors = [
    {
      id: 1,
      position: "감사",
      name: "홍길동",
      career: [
        "現) 402공익재단 사회학과 교수",
        "前) 한국사회학회 회장"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    },
    {
      id: 2,
      position: "감사",
      name: "홍길동",
      career: [
        "現) 공인회계사",
        "前) 금융감독원 검사국장"
      ],
      image: "/images/hero/hero-bg-1.jpg"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 p-8 md:p-12 pb-0"
      >
        재단 임원
      </motion.h2>
      
      {/* 현직 임원진 */}
      <div className="p-8 md:p-12 pt-8">
        <div className="flex items-center mb-8">
          <div className="w-1 h-6 bg-blue-600 mr-3"></div>
          <h3 className="text-xl font-bold text-blue-600">현직 임원진</h3>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {currentOfficers.map((officer) => (
            <div key={officer.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-40 flex-shrink-0">
                  <img 
                    src={officer.image}
                    alt={`${officer.position} ${officer.name}`}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="mb-4">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg inline-block text-sm font-medium mb-3">
                      {officer.position}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">{officer.name}</h4>
                    <p className="text-gray-600 text-sm mb-1">{officer.title}</p>
                    <p className="text-gray-500 text-sm">{officer.term}</p>
                  </div>
                  <div className="w-12 h-0.5 bg-blue-500 mb-4"></div>
                  <div className="space-y-1">
                    {officer.career.map((item, index) => (
                      <p key={index} className="text-gray-700 text-sm leading-relaxed">
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 이사진 */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-green-600 mr-3"></div>
            <h3 className="text-xl font-bold text-green-600">이사진</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {directors.map((director) => (
              <div key={director.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={director.image}
                      alt={`${director.position} ${director.name}`}
                      className="w-20 h-24 rounded-lg object-cover shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                        {director.position}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">{director.name}</h4>
                      <p className="text-gray-600 text-sm">{director.organization}</p>
                    </div>
                    <div className="space-y-1">
                      {director.career.map((item, index) => (
                        <p key={index} className="text-gray-700 text-sm">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 감사진 */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-purple-600 mr-3"></div>
            <h3 className="text-xl font-bold text-purple-600">감사진</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {auditors.map((auditor) => (
              <div key={auditor.id} className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img 
                      src={auditor.image}
                      alt={`${auditor.position} ${auditor.name}`}
                      className="w-20 h-24 rounded-lg object-cover shadow-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                        {auditor.position}
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">{auditor.name}</h4>
                    </div>
                    <div className="space-y-1">
                      {auditor.career.map((item, index) => (
                        <p key={index} className="text-gray-700 text-sm">
                          • {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 