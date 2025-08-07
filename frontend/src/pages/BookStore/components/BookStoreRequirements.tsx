export default function BookStoreRequirements() {
  return (
    <div className="infinite-scroll-info">
      <div className="info-header">
        <h2 className="info-title">BookStore Project</h2>
        <p className="info-subtitle">Dynamic book display with grouping and search functionality</p>
      </div>

      <div className="info-section">
        <h3>🎯 Project Goals</h3>
        <ul className="best-for-list">
          <li>Display books with author information</li>
          <li>Group books by author or publication year</li>
          <li>Add new books functionality</li>
          <li>Search and filter capabilities</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📋 Features</h3>
        <ul className="pros-list">
          <li>Dynamic grouping toggle</li>
          <li>Book card display</li>
          <li>Add book form</li>
          <li>API integration</li>
          <li>Error handling</li>
          <li>Loading states</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🛠️ Technical Stack</h3>
        <ul className="pros-list">
          <li>
            <strong>React</strong> - Component library
          </li>
          <li>
            <strong>TypeScript</strong> - Type safety
          </li>
          <li>
            <strong>Custom API</strong> - Data fetching
          </li>
          <li>
            <strong>CSS Modules</strong> - Styling
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🔄 Performance Optimizations</h3>
        <ul className="pros-list">
          <li>
            <code>useMemo</code> for grouping logic
          </li>
          <li>
            <code>useCallback</code> for event handlers
          </li>
          <li>
            <code>React.memo</code> for components
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📊 Data Structure</h3>
        <pre className="code-block">
          <code>{`interface Book {
  id: string;
  title: string;
  year: number;
  genre: string;
  author: Author;
}`}</code>
        </pre>
      </div>
    </div>
  );
}
