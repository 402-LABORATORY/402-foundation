'use client';

import { motion } from 'framer-motion';

export default function Mission() {
  const strategies = [
    {
      id: 1,
      title: "금융취약계층 지원\n민관협력 강화",
      color: "bg-blue-400"
    },
    {
      id: 2,
      title: "UN 지속가능 발전\n목표(SDGs) 기반\n글로벌 사회공헌",
      color: "bg-green-500" 
    },
    {
      id: 3,
      title: "현장사회복지 영역\n지속가능한\n인프라 구축",
      color: "bg-blue-400"
    },
    {
      id: 4,
      title: "전문성과 경험을\n보유한\n협력기관 발굴·육성",
      color: "bg-green-500"
    }
  ];

  const socialContributions = [
    { id: 1, title: "서민금융·\n사회책임금융" },
    { id: 2, title: "지역사회·공익" },
    { id: 3, title: "글로벌" },
    { id: 4, title: "환경" },
    { id: 5, title: "학술·교육" },
    { id: 6, title: "문화예술·체육" }
  ];

  const sdgs = [
    { id: 8, title: "양질의 일자리와\n경제성장", color: "bg-red-800" },
    { id: 1, title: "빈곤퇴치", color: "bg-red-600" },
    { id: 10, title: "불평등 감소", color: "bg-pink-600" },
    { id: 17, title: "지구촌\n평화 강화", color: "bg-blue-800" },
    { id: 13, title: "기후변화와 대응", color: "bg-green-600" },
    { id: 4, title: "양질의 교육", color: "bg-red-500" },
    { id: 16, title: "평화·정의·포용", color: "bg-blue-600" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 mb-12"
      >
        미션·사업영역
      </motion.h2>
      
      {/* 미션 섹션 */}
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
            className="h-6 bg-blue-600 mr-3"
          ></motion.div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl font-bold text-blue-600"
          >
            미션
          </motion.h3>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <div className="relative inline-block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="text-5xl text-blue-500 absolute -top-2 -left-6"
            >
              "
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-lg text-gray-700 leading-relaxed px-8"
            >
              402공익재단이 조성한 기금으로<br />
              국내의 금융 및 사회취약계층 지원을 위한 사회공헌사업을 수행하여<br />
              지속가능한 사회를 만드는 데 기여한다.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-5xl text-blue-500 absolute -top-2 -right-6"
            >
              "
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* 추진전략 섹션 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="mb-16"
      >
        <div className="flex items-center mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '4px' }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="h-6 bg-blue-600 mr-3"
          ></motion.div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-xl font-bold text-blue-600"
          >
            추진전략
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {strategies.map((strategy, index) => (
            <motion.div 
              key={strategy.id} 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
              className="flex justify-center"
            >
              <div className={`${strategy.color} rounded-full flex items-center justify-center text-white text-center shadow-lg`}
                   style={{ width: '180px', height: '180px' }}>
                <p className="text-base font-medium leading-tight whitespace-pre-line px-3">
                  {strategy.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 6대 사회공헌 영역 섹션 */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        className="mb-16"
      >
        <div className="flex items-center mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '4px' }}
            transition={{ duration: 0.6, delay: 2.8 }}
            className="h-6 bg-blue-600 mr-3"
          ></motion.div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 3.0 }}
            className="text-xl font-bold text-blue-600"
          >
            6대 사회공헌 영역
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {socialContributions.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3.2 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <img 
                src="/images/hero/hero-bg-1.jpg"
                alt={item.title}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <p className="text-sm font-medium text-gray-700 text-center whitespace-pre-line">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 핵심 지속가능 발전 목표(SDGs) 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.8 }}
      >
        <div className="flex items-center mb-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '4px' }}
            transition={{ duration: 0.6, delay: 4.0 }}
            className="h-6 bg-blue-600 mr-3"
          ></motion.div>
          <motion.h3 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 4.2 }}
            className="text-xl font-bold text-blue-600"
          >
            핵심 지속가능 발전 목표(SDGs)
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 max-w-6xl mx-auto">
          {sdgs.map((sdg, index) => (
            <motion.div 
              key={sdg.id} 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 4.4 + index * 0.1 }}
              className="flex flex-col items-center"
            >
              <img 
                src="/images/hero/hero-bg-1.jpg"
                alt={sdg.title}
                className="w-24 h-24 object-cover rounded-lg mb-2"
              />
              <p className="text-xs font-medium text-gray-700 text-center whitespace-pre-line">
                {sdg.title}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}