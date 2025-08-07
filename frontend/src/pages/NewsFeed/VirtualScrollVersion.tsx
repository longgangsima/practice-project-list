import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchNewsFeed } from './api/newsApi';
import LoadingSpinner from './components/LoadingSpinner';
import NewsCard from './components/NewsCard';
import './styles/NewsFeed.css';
import { ApiResponse, NewsItem } from './types';

const NewsFeedVirtual = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });

  const ITEM_HEIGHT = 400; // Approximate height of each news card
  const BUFFER_SIZE = 5; // Number of items to render outside visible area

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

  // Calculate visible items based on scroll position
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;

    const startIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
    const endIndex = Math.min(
      newsItems.length,
      Math.ceil((scrollTop + windowHeight) / ITEM_HEIGHT) + BUFFER_SIZE
    );

    setVisibleRange({ start: startIndex, end: endIndex });

    // Check if we need to load more data
    if (
      endIndex >= newsItems.length - 2 && // Near the end
      hasMore &&
      !loading
    ) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      loadMoreNews(nextPage);
    }
  }, [newsItems.length, hasMore, loading, currentPage, loadMoreNews]);

  // Throttled scroll handler
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const throttledScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 16); // ~60fps
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  // Initial load
  useEffect(() => {
    loadMoreNews(1);
  }, []);

  // Visible items to render
  const visibleItems = useMemo(() => {
    return newsItems.slice(visibleRange.start, visibleRange.end);
  }, [newsItems, visibleRange]);

  // Calculate spacer heights for virtual scrolling
  const topSpacer = visibleRange.start * ITEM_HEIGHT;
  const bottomSpacer = Math.max(0, (newsItems.length - visibleRange.end) * ITEM_HEIGHT);

  return (
    <div className="news-feed">
      <header className="news-feed-header">
        <h1>📰 News Feed (Virtual Scrolling)</h1>
        <p>Renders only visible items for optimal performance</p>
        <small>
          Items {visibleRange.start + 1}-{visibleRange.end} of {newsItems.length}
        </small>
      </header>

      <div className="news-feed-container">
        {/* Top spacer for virtual scrolling */}
        {topSpacer > 0 && <div style={{ height: topSpacer }} />}

        {/* Visible items */}
        {visibleItems.map(item => (
          <NewsCard key={item.id} newsItem={item} />
        ))}

        {/* Bottom spacer for virtual scrolling */}
        {bottomSpacer > 0 && <div style={{ height: bottomSpacer }} />}

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

export default NewsFeedVirtual;
