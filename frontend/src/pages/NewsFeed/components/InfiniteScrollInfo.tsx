import { InfiniteScrollDetails } from '../data/infiniteScrollDetails';
import './InfiniteScrollInfo.css';

interface InfiniteScrollInfoProps {
  details: InfiniteScrollDetails;
}

const InfiniteScrollInfo = ({ details }: InfiniteScrollInfoProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  const renderBatteryIcons = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`battery ${i < level ? 'filled' : ''}`}>
        🔋
      </span>
    ));
  };

  return (
    <div className="infinite-scroll-info">
      <div className="info-header">
        <h2 className="info-title">{details.title}</h2>
        <p className="info-subtitle">{details.subtitle}</p>
      </div>

      <div className="info-section">
        <h3>📋 Description</h3>
        <p>{details.description}</p>
      </div>

      <div className="info-section">
        <h3>⚙️ How It Works</h3>
        <p>{details.howItWorks}</p>
      </div>

      <div className="info-section">
        <h3>💻 Code Example</h3>
        <pre className="code-block">
          <code>{details.codeExample}</code>
        </pre>
      </div>

      <div className="info-section">
        <h3>📊 Performance Metrics</h3>
        <div className="performance-grid">
          <div className="metric">
            <label>Performance:</label>
            <div className="rating">{renderStars(details.performance.rating)}</div>
          </div>
          <div className="metric">
            <label>Battery Life:</label>
            <div className="rating">{renderBatteryIcons(details.performance.battery)}</div>
          </div>
          <div className="metric">
            <label>Complexity:</label>
            <span className={`complexity ${details.performance.complexity.toLowerCase()}`}>
              {details.performance.complexity}
            </span>
          </div>
          <div className="metric">
            <label>Mobile Support:</label>
            <span className={`mobile ${details.performance.mobile.toLowerCase()}`}>
              {details.performance.mobile}
            </span>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h3>✅ Pros</h3>
        <ul className="pros-list">
          {details.pros.map((pro, index) => (
            <li key={index}>{pro}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <h3>❌ Cons</h3>
        <ul className="cons-list">
          {details.cons.map((con, index) => (
            <li key={index}>{con}</li>
          ))}
        </ul>
      </div>

      <div className="info-section">
        <h3>🎯 Best For</h3>
        <ul className="best-for-list">
          {details.bestFor.map((use, index) => (
            <li key={index}>{use}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfiniteScrollInfo;
