"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface HistoryItem {
  month: string;
  title: string;
  details?: string[];
}

interface YearData {
  year: number;
  items: HistoryItem[];
  image?: string;
}

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export default function History() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const historyData: YearData[] = [
    {
      year: 2024,
      items: [
        {
          month: '10',
          title: '출범 6주년 기념 『사업보고서』 개최',
          details: [
            '제4기 이사회 출범',
            '홍길동 제7대 이사장 취임(삼일이사 주임사)'
          ]
        }
      ],
      image: 'bg-1'
    },
    {
      year: 2023,
      items: [
        {
          month: '07',
          title: '네팔 롬바니 청량 쉘(Gender) 구조 취창실 건립 지원 감사패 수상'
        },
        {
          month: '08',
          title: '『2023 402공익재단 50억 규모 사업보고서』 개최'
        }
      ]
    },
    {
      year: 2022,
      items: [
        {
          month: '05',
          title: '제단 사무실 이전(은행회관→예성빌딩)'
        },
        {
          month: '10',
          title: '출범 4주년 기념 『사업보고서』 개최',
          details: [
            '인도네시아 수라바야시 노동청창건정 개선 지원 감사패 수상',
            '제3기 이사회 출범',
            '홍길동 제6대 이사장 취임(삼일이사 주임사)'
          ]
        },
        {
          month: '11',
          title: '『제3회 취업진전검증』 한경부당 표창 수상'
        }
      ],
      image: 'bg-1'
    },
    {
      year: 2021,
      items: [
        {
          month: '01',
          title: '홍길동 제4대 대표이사장 취임(중동이사장 홍길동)'
        },
        {
          month: '09',
          title: '기본재산(600억원) 설정 등기'
        },
        {
          month: '10',
          title: '홍길동 제5대 대표이사장 취임(중동이사장 홍길동)'
        },
        {
          month: '11',
          title: '금융감독원 주관, 『제16회 금융공모전』 고육부 장관상(워수상) 수상'
        }
      ],
      image: 'bg-1'
    },
    {
      year: 2020,
      items: [
        {
          month: '10',
          title: '제2기 이사회 출범',
          details: [
            '홍길동 제3대 대표이사장 취임(중동이사장 홍길동)'
          ]
        }
      ]
    },
    {
      year: 2019,
      items: [
        {
          month: '09',
          title: '『방자리 창출 사업 아이디어 공모전』 개최'
        },
        {
          month: '12',
          title: '홍길동 제3대 대표이사장 취임(중동이사장 홍길동)'
        }
      ]
    },
    {
      year: 2018,
      items: [
        {
          month: '07',
          title: '제단 설립추진위원회 개최(제1회10월 신설)'
        },
        {
          month: '09',
          title: '발기인총회 개최'
        },
        {
          month: '10',
          title: '402공익재단 설립(금융위원회 허가)',
          details: [
            '제단 출범식',
            '제1기 이사회 출범',
            '홍길동 제1대 대표이사장 취임(중동이사장 홍길동)'
          ]
        }
      ],
      image: 'bg-1'
    }
  ];

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // 타임라인 데이터 변환
  const timelineData: TimelineEntry[] = historyData.map((yearData) => ({
    title: yearData.year.toString(),
    content: (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 연혁 리스트 */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {yearData.items.map((item, itemIndex) => (
              <div key={itemIndex} className="bg-white dark:bg-neutral-900 rounded-lg p-6 shadow-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-start gap-3 mb-3">
                  <span className="inline-block bg-main-500 text-white px-3 py-1 rounded-full text-sm font-medium min-w-[3rem] text-center">
                    {item.month}월
                  </span>
                </div>
                <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-3 leading-relaxed text-lg">
                  {item.title}
                </h3>
                {item.details && (
                  <div className="ml-4 space-y-2">
                    {item.details.map((detail: string, detailIndex: number) => (
                      <div key={detailIndex} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-main-400 mt-2.5 flex-shrink-0"></div>
                        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* 이미지 영역 */}
        {yearData.image && (
          <div className="lg:col-span-1">
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg overflow-hidden h-80 sticky top-40">
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/images/hero/hero-${yearData.image}.jpg')` }}
              >
                <div className="w-full h-full bg-black bg-opacity-30 flex items-end justify-start p-6">
                  <span className="text-white font-medium text-sm bg-black bg-opacity-60 px-3 py-2 rounded-lg">
                    {yearData.year}년 주요 행사
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }));

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-800 mb-12"
      >
        주요 연혁
      </motion.h2>
      
      <div
        className="w-full bg-white font-sans"
        ref={containerRef}
      >

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {timelineData.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-6 absolute left-3 md:left-3 w-6 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-lg">
                <div className="h-3 w-3 rounded-full bg-main-500 border border-main-600" />
              </div>
              <h3 className="hidden md:block text-2xl md:pl-20 md:text-4xl font-bold text-main-600 dark:text-main-400">
                {item.title}년
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-3xl mb-6 text-left font-bold text-main-600 dark:text-main-400">
                {item.title}년
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-6 left-6 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-main-500 via-main-400 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
      </div>
    </div>
  );
}