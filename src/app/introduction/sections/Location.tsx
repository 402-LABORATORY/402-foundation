'use client';

import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlinePhone } from 'react-icons/hi';
import { HiOutlineTruck } from 'react-icons/hi';

export default function Location() {
  // 지하철 정보 데이터
  const subwayInfo = [
    {
      station: "을지로3가역",
      line: "2",
      lineColor: "bg-green-500",
      direction: "을지로3가역 12번출구 5분거리 (300M)"
    },
    {
      station: "을지로3가역", 
      line: "3",
      lineColor: "bg-orange-500",
      direction: "을지로3가역 9번출구 7분거리 (300M)"
    },
    {
      station: "충무로역",
      line: "4",
      lineColor: "bg-blue-500", 
      direction: "충무로역 5번출구 6분거리 (400M)"
    },
    {
      station: "명동역",
      line: "4",
      lineColor: "bg-blue-500",
      direction: "명동역 10번출구 6분거리 (400M)"
    }
  ];

  // 버스 정보 데이터
  const busInfo = [
    {
      location: "퇴계로 3가, 한울마트, 한국외환",
      direction: "(명동방면)",
      buses: {
        간선: ["104", "105", "140", "421", "463", "507", "604"],
        지선: ["7011"]
      }
    },
    {
      location: "국가인권위, 안중근활동터", 
      direction: "(서울시청방면)",
      buses: {
        간선: ["140", "470", "472", "741"],
        광역: ["9401", "M4108", "M4130", "M4137", "M5107"]
      }
    },
    {
      location: "을지로 2가, 파인애비뉴",
      direction: "(을지로3가방면)", 
      buses: {
        간선: ["100", "105", "152", "202", "261"]
      }
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
        오시는 길
      </motion.h2>
      
      <div className="p-8 md:p-12 pt-8">
        {/* 약도 섹션 */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-blue-600 mr-3"></div>
            <h3 className="text-xl font-bold text-blue-600">약도</h3>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d6325.2609696136915!2d126.98336034598593!3d37.563768777984556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z7ISc7Jq47IucIOykkeq1rCDsiJjtkZzroZwgMjMg7J2464aN67mC65SpIDjsuLU!5e0!3m2!1sko!2skr!4v1749973373775!5m2!1sko!2skr" 
                width="100%" 
                height="450" 
                style={{border: 0}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
            
            {/* 주소 및 연락처 정보 */}
            <div className="mt-6 bg-white rounded-lg p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">재단법인 402공익재단</h4>
                <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <HiOutlineLocationMarker className="text-blue-600 text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">주소</p>
                    <p className="text-gray-800 font-medium">서울시 중구 수표로 23 인투빌딩 8층</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <HiOutlinePhone className="text-green-600 text-lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 text-sm">연락처</p>
                    <div className="text-gray-800 font-medium">
                      <p>TEL. 02-1234-1234</p>
                      <p className="text-sm text-gray-600">FAX. 02-1234-1234, 02-1234-1234</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 지하철 정보 */}
        <div className="mb-12">
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-green-600 mr-3"></div>
            <h3 className="text-xl font-bold text-green-600">지하철 정보</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 to-green-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">역명</th>
                  <th className="px-6 py-4 text-left font-semibold">호선</th>
                  <th className="px-6 py-4 text-left font-semibold">이용안내</th>
                </tr>
              </thead>
              <tbody>
                {subwayInfo.map((info, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-green-50 transition-colors duration-200`}>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {info.station}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 ${info.lineColor} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                          {info.line}
                        </div>
                        <span className="text-gray-600 text-sm">{info.line}호선</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {info.direction}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 버스 정보 */}
        <div>
          <div className="flex items-center mb-8">
            <div className="w-1 h-6 bg-purple-600 mr-3"></div>
            <h3 className="text-xl font-bold text-purple-600">버스 정보</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                  <th className="px-6 py-4 text-left font-semibold">정류장 위치</th>
                  <th className="px-6 py-4 text-left font-semibold">방향</th>
                  <th className="px-6 py-4 text-left font-semibold">버스 번호</th>
                </tr>
              </thead>
              <tbody>
                {busInfo.map((info, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-purple-50 transition-colors duration-200`}>
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {info.location}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {info.direction}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {Object.entries(info.buses).map(([type, numbers]) => (
                          <div key={type} className="flex items-center gap-2 flex-wrap">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              type === '간선' ? 'bg-blue-100 text-blue-800' :
                              type === '지선' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {type}
                            </span>
                                                         <div className="flex gap-1 flex-wrap">
                               {numbers.map((number: string) => (
                                 <span key={number} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                                   {number}
                                 </span>
                               ))}
                             </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 추가 정보 */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center justify-center gap-2">
              <HiOutlineTruck className="text-xl" />
              주차 안내
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <span className="font-medium">건물 주차:</span> 인투빌딩 지하주차장 이용
              </div>
              <div>
                <span className="font-medium">주차 요금:</span> 방문객 2시간 무료
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 