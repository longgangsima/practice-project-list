export type ProjectItem = {
  name: string;
  path: string;
  description?: string;
};

export const projectList: ProjectItem[] = [
  { name: 'Image Carousel', path: '/image-carousel' },
  { name: 'Book Store', path: '/book-store' },
  {
    name: 'Card Flips',
    path: '/card-flips',
    description: 'Memory game with tabbed implementations',
  },
  {
    name: 'News Feed',
    path: '/news-feed',
    description: 'Infinite scroll news feed with mock API',
  },
  // { name: 'Trading Chart', path: '/trading-chart' },
  { name: 'Restaurant System', path: '/restaurant-system' },
];
