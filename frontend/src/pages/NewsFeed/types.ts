export interface NewsItem {
  id: string;
  name: string;
  body: string;
  image: {
    url: string;
  };
}

export interface ApiResponse {
  page: number;
  data: NewsItem[];
}
