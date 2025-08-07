import { ApiResponse, NewsItem } from '../types';

// Mock data generator
const generateMockNews = (page: number): NewsItem[] => {
  const items: NewsItem[] = [];
  const startId = (page - 1) * 5;

  for (let i = 0; i < 5; i++) {
    const id = startId + i;
    items.push({
      id: `news-${id}`,
      name: `Breaking News Story ${id + 1}`,
      body: `This is the detailed content for news story ${id + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
      image: {
        url: `https://picsum.photos/400/250?random=${id + 1}`,
      },
    });
  }

  return items;
};

// Simulate API call with delay
export const fetchNewsFeed = async (page: number): Promise<ApiResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate no more data after page 2 (10 items total)
  if (page > 2) {
    return {
      page,
      data: [],
    };
  }

  return {
    page,
    data: generateMockNews(page),
  };
};
