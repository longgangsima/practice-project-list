export default function BookStorePreview() {
  return (
    <div>
      <h4>📈 Project Stats</h4>
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            background: '#e3f2fd',
            padding: '0.5rem',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <strong>📚 Total Books:</strong> Dynamic count
        </div>
        <div
          style={{
            background: '#f3e5f5',
            padding: '0.5rem',
            borderRadius: '4px',
            marginBottom: '0.5rem',
            fontSize: '0.875rem',
          }}
        >
          <strong>👥 Authors:</strong> Unique authors
        </div>
        <div
          style={{
            background: '#e8f5e8',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        >
          <strong>🏷️ Genres:</strong> Various genres
        </div>
      </div>

      <h4>🎨 UI Components</h4>
      <div style={{ marginBottom: '1rem' }}>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            fontSize: '0.8rem',
          }}
        >
          <strong>BookCard</strong>
          <br />
          Displays book information with author details
        </div>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '0.75rem',
            marginBottom: '0.5rem',
            fontSize: '0.8rem',
          }}
        >
          <strong>BookForm</strong>
          <br />
          Form for adding new books
        </div>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          <strong>GroupToggle</strong>
          <br />
          Switch between grouping methods
        </div>
      </div>

      <h4>🔍 Current View</h4>
      <div
        style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px',
          padding: '0.75rem',
          fontSize: '0.875rem',
        }}
      >
        <div>
          📋 <strong>Grouping:</strong> Author / Year
        </div>
        <div>
          🔄 <strong>Status:</strong> Loading / Ready
        </div>
        <div>
          📊 <strong>Filter:</strong> All / Filtered
        </div>
      </div>

      <h4>🚀 Quick Actions</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          ➕ Add Book
        </button>
        <button
          style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          🔄 Refresh Data
        </button>
        <button
          style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          📊 Export Data
        </button>
      </div>
    </div>
  );
}
