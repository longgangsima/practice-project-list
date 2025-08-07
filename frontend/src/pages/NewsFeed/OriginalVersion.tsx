import { useCallback, useEffect, useState } from 'react';
import { fetchNewsFeed } from './api/newsApi';
import LoadingSpinner from './components/LoadingSpinner';
import NewsCard from './components/NewsCard';
import './styles/NewsFeedClean.css';
import { ApiResponse, NewsItem } from './types';

const NewsFeedOriginal = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch news data
  const loadMoreNews = useCallback(
    async (page: number) => {
      if (loading) return;

      setLoading(true);
      try {
        const response: ApiResponse = await fetchNewsFeed(page);

        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setNewsItems(prev => (page === 1 ? response.data : [...prev, ...response.data]));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  // Initial load
  useEffect(() => {
    loadMoreNews(1);
  }, []);

  // Infinite scroll handler using viewport height + scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 1000 && // Trigger 1000px before end
        hasMore &&
        !loading
      ) {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        loadMoreNews(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, hasMore, loading, loadMoreNews]);

  return (
    <div className="news-feed">
      <header className="news-feed-header">
        <h1>📰 News Feed (Viewport Height Method)</h1>
        <p>Uses window.innerHeight + scrollTop to detect scroll position</p>
      </header>

      <div className="news-feed-container">
        {newsItems.map(item => (
          <NewsCard key={item.id} newsItem={item} />
        ))}

        {loading && <LoadingSpinner />}

        {!hasMore && newsItems.length > 0 && (
          <div className="end-message">
            <p>🎉 You've reached the end of the news feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeedOriginal;
