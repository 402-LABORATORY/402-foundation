import contentData from '../data/content.json';

export interface ContentItem {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  displayType: string;
  content: string;
  // News specific fields
  isImportant?: boolean;
  bgGradient?: string;
  type?: string;
  hasGraphics?: boolean;
  author?: string;
  hasFile?: boolean;
  cardType?: string;
  hasImage?: boolean;
  isVideo?: boolean;
  amount?: string;
  source?: string;
  // Resources specific fields
  hasAttachment?: boolean;
  year?: string;
}

// 전체 데이터 가져오기
export const getAllContent = (): ContentItem[] => {
  return contentData.items as ContentItem[];
};

// Business 데이터 가져오기
export const getBusinessContent = (subcategory?: string): ContentItem[] => {
  const businessItems = contentData.items.filter(item => item.category === 'business');
  if (subcategory) {
    return businessItems.filter(item => item.subcategory === subcategory) as ContentItem[];
  }
  return businessItems as ContentItem[];
};

// News 데이터 가져오기
export const getNewsContent = (subcategory?: string): ContentItem[] => {
  const newsItems = contentData.items.filter(item => item.category === 'news');
  if (subcategory) {
    return newsItems.filter(item => item.subcategory === subcategory) as ContentItem[];
  }
  return newsItems as ContentItem[];
};

// Resources 데이터 가져오기
export const getResourcesContent = (subcategory?: string): ContentItem[] => {
  const resourcesItems = contentData.items.filter(item => item.category === 'resources');
  if (subcategory) {
    return resourcesItems.filter(item => item.subcategory === subcategory) as ContentItem[];
  }
  return resourcesItems as ContentItem[];
};

// ID로 특정 컨텐츠 아이템 가져오기
export const getContentById = (id: string): ContentItem | undefined => {
  return contentData.items.find(item => item.id === id) as ContentItem | undefined;
};

// Business subcategory별 mapping
export const businessSubcategories = {
  financial: 'financial',
  community: 'community', 
  global: 'global',
  completed: 'completed'
};

// News subcategory별 mapping
export const newsSubcategories = {
  notices: 'notices',
  media: 'media',
  activities: 'activities',
  appearances: 'appearances'
};

// Resources subcategory별 mapping  
export const resourcesSubcategories = {
  management: 'management',
  annual: 'annual',
  research: 'research',
  other: 'other'
}; 