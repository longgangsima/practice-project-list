import React from 'react';

export default function BookStoreRequirements() {
  return (
    <div>
      <h4>🎯 Project Goals</h4>
      <ul>
        <li>Display books with author information</li>
        <li>Group books by author or publication year</li>
        <li>Add new books functionality</li>
        <li>Search and filter capabilities</li>
      </ul>

      <h4>📋 Features</h4>
      <ul>
        <li>✅ Dynamic grouping toggle</li>
        <li>✅ Book card display</li>
        <li>✅ Add book form</li>
        <li>✅ API integration</li>
        <li>✅ Error handling</li>
        <li>✅ Loading states</li>
      </ul>

      <h4>🛠️ Technical Stack</h4>
      <ul>
        <li><strong>React</strong> - Component library</li>
        <li><strong>TypeScript</strong> - Type safety</li>
        <li><strong>Custom API</strong> - Data fetching</li>
        <li><strong>CSS Modules</strong> - Styling</li>
      </ul>

      <h4>🔄 Performance Optimizations</h4>
      <ul>
        <li><code>useMemo</code> for grouping logic</li>
        <li><code>useCallback</code> for event handlers</li>
        <li><code>React.memo</code> for components</li>
      </ul>

      <h4>📊 Data Structure</h4>
      <pre style={{
        fontSize: '0.75rem',
        background: '#f1f3f4',
        padding: '0.5rem',
        borderRadius: '4px',
        overflow: 'auto'
      }}>
{`interface Book {
  id: string;
  title: string;
  year: number;
  genre: string;
  author: Author;
}`}
      </pre>
    </div>
  );
}
