export type ProjectItem = {
  name: string;
  path: string;
  description?: string;
};

export const projectList: ProjectItem[] = [
  { name: 'Image Carousel III', path: '/image-carousel-iii' },
  { name: 'Book Store', path: '/book-store' },
  // { name: 'Trading Chart', path: '/trading-chart' },
  { name: 'Restaurant System', path: '/restaurant-system' },
];
