export default function ImageCarouselPreview() {
  return (
    <div>
      <h4>🖼️ Image Gallery</h4>
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
          <strong>📸 Total Images:</strong> 5 images
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
          <strong>📍 Current:</strong> Image 1 of 5
        </div>
        <div
          style={{
            background: '#e8f5e8',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        >
          <strong>🔄 Status:</strong> Interactive
        </div>
      </div>

      <h4>🎮 Controls</h4>
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
          <strong>⬅️ Previous</strong>
          <br />
          Navigate to previous image
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
          <strong>➡️ Next</strong>
          <br />
          Navigate to next image
        </div>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          <strong>🔘 Dots</strong>
          <br />
          Direct image selection
        </div>
      </div>

      <h4>🎨 Mini Preview</h4>
      <div
        style={{
          background: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '6px',
          padding: '0.75rem',
          fontSize: '0.875rem',
        }}
      >
        <div style={{ display: 'flex', gap: '4px', marginBottom: '0.5rem' }}>
          <div
            style={{ width: '12px', height: '8px', background: '#007bff', borderRadius: '2px' }}
          ></div>
          <div
            style={{ width: '12px', height: '8px', background: '#6c757d', borderRadius: '2px' }}
          ></div>
          <div
            style={{ width: '12px', height: '8px', background: '#6c757d', borderRadius: '2px' }}
          ></div>
          <div
            style={{ width: '12px', height: '8px', background: '#6c757d', borderRadius: '2px' }}
          ></div>
          <div
            style={{ width: '12px', height: '8px', background: '#6c757d', borderRadius: '2px' }}
          ></div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#856404' }}>
          Current: Image 1 (Nature landscape)
        </div>
      </div>

      <h4>⚡ Features</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <div
          style={{
            background: '#28a745',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            textAlign: 'center',
          }}
        >
          ✨ Smooth Transitions
        </div>
        <div
          style={{
            background: '#007bff',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            textAlign: 'center',
          }}
        >
          📱 Touch Friendly
        </div>
        <div
          style={{
            background: '#6f42c1',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            textAlign: 'center',
          }}
        >
          🎯 Responsive Design
        </div>
      </div>

      <h4>🔧 Performance</h4>
      <div
        style={{
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '6px',
          padding: '0.75rem',
          fontSize: '0.75rem',
        }}
      >
        <div>• Optimized with React.memo</div>
        <div>• CSS transforms for animation</div>
        <div>• Lazy loading ready</div>
        <div>• Minimal re-renders</div>
      </div>
    </div>
  );
}
