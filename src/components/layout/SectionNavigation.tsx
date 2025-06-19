'use client';

import { motion } from 'framer-motion';

interface Section {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  cards?: Array<{
    title: string;
    bgColor: string;
    image?: string;
  }>;
  bgGradient: string;
}

interface SectionNavigationProps {
  sections: Section[];
  currentSection: number;
  onSectionClick: (index: number) => void;
}

export default function SectionNavigation({ 
  sections, 
  currentSection, 
  onSectionClick 
}: SectionNavigationProps) {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-[9999]">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            onClick={() => onSectionClick(index)}
            className={`
              relative w-3 h-3 rounded-full border-2 transition-all duration-300 shadow-lg
              ${currentSection === index 
                ? 'bg-white border-white shadow-white/50' 
                : 'bg-black/30 border-white/70 hover:border-white shadow-black/30'
              }
            `}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Active indicator */}
            {currentSection === index && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute inset-0 bg-white rounded-full shadow-lg"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Tooltip */}
            <div className={`
              absolute right-6 top-1/2 transform -translate-y-1/2 
              px-3 py-2 bg-black/90 text-white text-sm rounded-lg
              opacity-0 pointer-events-none transition-opacity duration-300
              hover:opacity-100 whitespace-nowrap shadow-lg backdrop-blur-sm
            `}>
              {section.title}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 
                           border-r-4 border-r-black/90 border-y-4 border-y-transparent"></div>
            </div>
          </motion.button>
        ))}
      </div>
      
      {/* Section counter */}
      <div className="mt-6 text-center">
        <span className="text-white text-sm font-medium drop-shadow-lg">
          {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
} 