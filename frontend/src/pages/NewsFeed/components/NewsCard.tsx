import { NewsItem } from '../types';
import './NewsCard.css';

interface NewsCardProps {
  newsItem: NewsItem;
}

const NewsCard = ({ newsItem }: NewsCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src =
      'https://via.placeholder.com/400x250/f0f0f0/666666?text=Image+Not+Available';
  };

  return (
    <article className="news-card">
      <div className="news-card-image">
        <img
          src={newsItem.image.url}
          alt={newsItem.name}
          loading="lazy"
          onError={handleImageError}
        />
      </div>
      <div className="news-card-content">
        <h2 className="news-card-title">{newsItem.name}</h2>
        <p className="news-card-body">{newsItem.body}</p>
        <div className="news-card-meta">
          <span className="news-card-id">ID: {newsItem.id}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
