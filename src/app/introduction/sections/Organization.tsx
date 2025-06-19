'use client';

import { motion } from 'framer-motion';
import { HiOutlinePhone } from 'react-icons/hi';

export default function Organization() {
  // 연락처 정보 데이터
  const contactInfo = [
    {
      department: "총괄",
      tasks: "총괄",
      phone: "02-1234-1234"
    },
    {
      department: "총괄",
      tasks: "경영기획팀 총괄, 재단 자산운용, 예결산, 재무회계, 규정 운영 및 관리, 공시, 인사·노무, 개인정보",
      phone: "02-1234-1234"
    },
    {
      department: "경영기획팀",
      tasks: "회계, 세무, 자금운용, 급여, 복무, 총무 등 경영지원",
      phone: "02-1234-1234"
    },
    {
      department: "사업기획팀",
      tasks: "사업기획팀 총괄, 신규사업 기획, 사업 계획·집행, 사업 예·결산, 성과관리, 사업평가, 사업보고, 리스크 관리, 사업규정 관리",
      phone: "02-1234-1234"
    },
    {
      department: "사업기획팀",
      tasks: "사업운영, 사업현황 관리, 분기·반기·총론 성과관리, 사업비 교부, 사업비 회계감독, 수행기관 관리",
      phone: "02-1234-1234"
    },
    {
      department: "사업기획팀",
      tasks: "",
      phone: "02-1234-1234"
    },
    {
      department: "사업기획팀",
      tasks: "",
      phone: "02-1234-1234"
    },
    {
      department: "사업지원팀",
      tasks: "사업지원팀 총괄",
      phone: "02-1234-1234"
    },
    {
      department: "사업지원팀",
      tasks: "홈페이지 관리, 홍보, 정책, 조사연구, 마케팅 및 대외기관 협력, 소규모지원사업",
      phone: "02-1234-1234"
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
        조직
      </motion.h2>
      
      {/* 조직도 이미지 */}
      <div className="p-8 md:p-12 pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '4px' }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-6 bg-green-600 mr-3"
            ></motion.div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl font-bold text-green-600"
            >
              조직도
            </motion.h3>
          </div>
          
          <div className="max-w-6xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="p-8"
            >
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                src="/images/hero/hero-bg-1.jpg"
                alt="402공익재단 조직도"
                className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="text-gray-600 text-sm mt-4"
              >
                ※ 조직도는 2024년 기준으로 작성되었습니다.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* 연락처 정보 테이블 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          <div className="flex items-center mb-8">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '4px' }}
              transition={{ duration: 0.6, delay: 2.2 }}
              className="h-6 bg-blue-600 mr-3"
            ></motion.div>
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.4 }}
              className="text-xl font-bold text-blue-600"
            >
              부서별 연락처
            </motion.h3>
          </div>
          
                     <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 2.6 }}
             className="overflow-x-auto"
           >
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">부서명</th>
                  <th className="px-6 py-4 text-left font-semibold">업무담당</th>
                  <th className="px-6 py-4 text-left font-semibold">연락처</th>
                </tr>
              </thead>
              <tbody>
                {contactInfo.map((info, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                    <td className="px-6 py-4 font-medium text-blue-600">
                      {info.department}
                    </td>
                    <td className="px-6 py-4 text-gray-700 text-sm leading-relaxed">
                      {info.tasks}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      <div className="flex items-center gap-2">
                        <HiOutlinePhone className="text-blue-600" />
                        {info.phone}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 