import { useCallback, useEffect, useState } from 'react';

// Custom hook for throttled infinite scroll
export const useInfiniteScroll = (callback: () => void, hasMore: boolean, loading: boolean) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // Clear previous timeout
      clearTimeout(timeoutId);

      // Throttle scroll events (only check every 100ms)
      timeoutId = setTimeout(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;

        // Check if we're near the bottom (within 200px)
        if (scrollTop + clientHeight >= scrollHeight - 200 && hasMore && !loading) {
          setIsFetching(true);
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [hasMore, loading]);

  useEffect(() => {
    if (!isFetching) return;
    callback();
    setIsFetching(false);
  }, [isFetching, callback]);

  return [isFetching, setIsFetching] as const;
};

// Component using the custom hook
import { fetchNewsFeed } from './api/newsApi';
import LoadingSpinner from './components/LoadingSpinner';
import NewsCard from './components/NewsCard';
import './styles/NewsFeed.css';
import { ApiResponse, NewsItem } from './types';

const NewsFeedCustomHook = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch news data
  const loadMoreNews = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response: ApiResponse = await fetchNewsFeed(nextPage);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setNewsItems(prev => [...prev, ...response.data]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading]);

  // Use custom hook for infinite scroll
  const [isFetching] = useInfiniteScroll(loadMoreNews, hasMore, loading);

  // Initial load
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      try {
        const response: ApiResponse = await fetchNewsFeed(1);
        setNewsItems(response.data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInitial();
  }, []);

  return (
    <div className="news-feed">
      <header className="news-feed-header">
        <h1>📰 News Feed (Custom Hook + Throttling)</h1>
        <p>Uses throttled scroll events for optimized performance</p>
      </header>

      <div className="news-feed-container">
        {newsItems.map(item => (
          <NewsCard key={item.id} newsItem={item} />
        ))}

        {(loading || isFetching) && <LoadingSpinner />}

        {!hasMore && newsItems.length > 0 && (
          <div className="end-message">
            <p>🎉 You've reached the end of the news feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeedCustomHook;
