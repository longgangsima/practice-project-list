import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchNewsFeed } from './api/newsApi';
import LoadingSpinner from './components/LoadingSpinner';
import NewsCard from './components/NewsCard';
import './styles/NewsFeed.css';
import { ApiResponse, NewsItem } from './types';

const NewsFeedIntersectionObserver = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);

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

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          const nextPage = currentPage + 1;
          setCurrentPage(nextPage);
          loadMoreNews(nextPage);
        }
      },
      {
        root: null, // viewport
        rootMargin: '100px', // Trigger 100px before the element comes into view
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [currentPage, hasMore, loading, loadMoreNews]);

  return (
    <div className="news-feed">
      <header className="news-feed-header">
        <h1>📰 News Feed (Intersection Observer)</h1>
        <p>Uses Intersection Observer API for better performance</p>
      </header>

      <div className="news-feed-container">
        {newsItems.map(item => (
          <NewsCard key={item.id} newsItem={item} />
        ))}

        {/* Invisible trigger element */}
        <div ref={observerRef} className="scroll-trigger">
          {loading && <LoadingSpinner />}
        </div>

        {!hasMore && newsItems.length > 0 && (
          <div className="end-message">
            <p>🎉 You've reached the end of the news feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeedIntersectionObserver;
