'use client';

import { motion } from 'framer-motion';

export default function Greeting() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 mb-12"
      >
        인사말
      </motion.h2>
      
      {/* Main Message Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Left: Quote Message */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center rounded-lg p-8"
        >
          <div className="text-center relative px-8 py-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-5xl text-blue-400 opacity-30 absolute -top-2 -left-2 font-serif leading-none"
            >
              &ldquo;
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl font-medium text-gray-800 leading-relaxed relative z-10"
            >
              402공익재단은 금융노사가<br />
              공동으로 기금을 출연하고 공동으로 재단을 운영하는<br />
              유일한 노사 파트너십 사회공헌 재단입니다.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.3, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-5xl text-blue-400 opacity-30 absolute -bottom-6 -right-2 font-serif leading-none"
            >
              &rdquo;
            </motion.div>
          </div>
        </motion.div>
        
        {/* Right: President Photo */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <img 
              src="/images/hero/hero-bg-1.jpg"
              alt="이사장"
              className="w-80 h-80 rounded-full object-cover shadow-lg"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Greeting Text */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg font-medium">
            안녕하십니까?
          </p>
          <p>
            402공익재단 이사장 홍길동입니다.
          </p>
          <p>
            우리 재단은 은행관련 종사자 한 3만개 금융기관 노사가 공동으로 약 2,000억원의 기금을 조성해 설립된 
            세계 유일의 금융산업 노사 공동의 사회공헌 재단입니다.
          </p>
          <p>
            2018년 10월 4일 출범 이후, 국내외 금융 및 사회 취약계층 지원을 위해 사회적 가치를 창출하여 
            지속 가능한 사회를 만드는데 기여하고 있습니다.
          </p>
          <p>
            서민·사회취약층은 저금상환·공고 금융법 현실, 학숭·교육 문화예술·체육 등 6대 사회공헌 영역에서 다양한 활동을 펼치고 있으며,
          </p>
          <p>
            앞으로도 금융산업 노사가 뜻을 모아 우리 사회의 상생발전과 포용성장에 기여할 수 있도록 
            최선의 노력을 다하겠습니다.
          </p>
          <p className="font-medium mt-8">
            감사합니다.
          </p>
        </div>
        
        {/* Signature */}
        <div className="text-right mt-8">
          <p className="text-lg font-semibold text-gray-800">
            402공익재단 이사장 홍길동
          </p>
        </div>
      </motion.div>
    </div>
  );
} 