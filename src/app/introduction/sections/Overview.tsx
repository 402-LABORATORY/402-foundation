'use client';

import { HiOutlineEye, HiOutlineDownload, HiOutlineDocumentDownload, HiOutlinePhotograph } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function Overview() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      {/* 재단소개 섹션 */}
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 mb-12"
        >
          재단소개
        </motion.h2>
        
        <div className="max-w-4xl mx-auto space-y-8 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            402공익재단은 금융산업노사가 공동으로 기금을 출연하여 함께 운영하는 대한민국의 유일한 공익재단입니다.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            재단은 33개 금융기관 노사가 뜻을 모아 2018년 10월4일에 출범하여
          </p>
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            국내의 금융 및 사회 취약계층을 지원하여서 따뜻하고 지속 가능한 사회를 만드는데 기여하고 있습니다.
          </p>
        </div>

        {/* 버튼들 */}
        <div className="flex justify-center gap-4">
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-16 py-6 rounded-md font-medium transition-colors text-xl flex items-center gap-3">
            <HiOutlineEye className="text-2xl" />
            정관 바로보기
          </button>
          <button className="bg-blue-800 hover:bg-blue-900 text-white px-16 py-6 rounded-md font-medium transition-colors text-xl flex items-center gap-3">
            <HiOutlineDownload className="text-2xl" />
            정관 다운로드
          </button>
        </div>
      </div>

      {/* CI 소개 섹션 */}
      <div className="border-t border-gray-200 pt-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl font-bold text-gray-800 mb-12"
        >
          CI 소개
        </motion.h2>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            402공익재단 CI 로고는
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            '라이'이 서로 이어지는 모습과 '색상'이 서로 합쳐지는 모습으로
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">"금융산업 노사의 상생"</span>을 상징하였고,
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">"402공익재단을 통해 행복한 대한민국"</span>을 표현하였습니다.
          </p>
        </div>

        {/* CI 로고 이미지들 */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-lg p-8 flex items-center justify-center">
            <img 
              src="/images/hero/hero-bg-1.jpg"
              alt="402공익재단 한국어 로고"
              className="max-w-full h-auto"
            />
          </div>
          <div className="rounded-lg p-8 flex items-center justify-center">
            <img 
              src="/images/hero/hero-bg-1.jpg"
              alt="402 Foundation 영어 로고"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        {/* CI 다운로드 버튼들 */}
        <div className="flex justify-center gap-4 max-w-2xl mx-auto">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-md font-medium transition-colors text-xl flex-1 flex items-center justify-center gap-3">
            <HiOutlineDocumentDownload className="text-2xl" />
            AI 파일 다운로드
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-6 rounded-md font-medium transition-colors text-xl flex-1 flex items-center justify-center gap-3">
            <HiOutlinePhotograph className="text-2xl" />
            JPEG 파일 다운로드
          </button>
        </div>
      </div>
    </div>
  );
} 