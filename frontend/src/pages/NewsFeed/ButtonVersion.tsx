import { useCallback, useEffect, useState } from 'react';
import { fetchNewsFeed } from './api/newsApi';
import LoadingSpinner from './components/LoadingSpinner';
import NewsCard from './components/NewsCard';
import './styles/NewsFeed.css';
import { ApiResponse, NewsItem } from './types';

const NewsFeedButton = () => {
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

  // Manual load more handler
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    loadMoreNews(nextPage);
  };

  // Initial load
  useEffect(() => {
    loadMoreNews(1);
  }, []);

  return (
    <div className="news-feed">
      <header className="news-feed-header">
        <h1>📰 News Feed (Manual Loading)</h1>
        <p>Click the button to load more articles</p>
      </header>

      <div className="news-feed-container">
        {newsItems.map(item => (
          <NewsCard key={item.id} newsItem={item} />
        ))}

        {loading && <LoadingSpinner />}

        {hasMore && !loading && (
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore} disabled={loading}>
              📄 Load More Articles
            </button>
          </div>
        )}

        {!hasMore && newsItems.length > 0 && (
          <div className="end-message">
            <p>🎉 You've reached the end of the news feed!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsFeedButton;
