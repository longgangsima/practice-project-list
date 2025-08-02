export default function RestaurantPreview() {
  return (
    <div>
      <h4>📊 Order Statistics</h4>
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
          <strong>📝 Total Orders:</strong> Real-time count
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
          <strong>🌶️ Popular Spice:</strong> Medium
        </div>
        <div
          style={{
            background: '#e8f5e8',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
          }}
        >
          <strong>📅 Today's Orders:</strong> Active count
        </div>
      </div>

      <h4>🍽️ Menu Preview</h4>
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
          <strong>Base Options</strong>
          <br />
          Rice, Noodles, Salad, Wrap
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
          <strong>Proteins</strong>
          <br />
          Chicken, Beef, Tofu, Shrimp
        </div>
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '6px',
            padding: '0.75rem',
            fontSize: '0.8rem',
          }}
        >
          <strong>Spice Levels</strong>
          <br />
          🔥 Mild → Medium → Hot → Extra Hot
        </div>
      </div>

      <h4>📋 Current Status</h4>
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
          🔄 <strong>Server:</strong> Connected
        </div>
        <div>
          💾 <strong>Storage:</strong> JSON Files
        </div>
        <div>
          📝 <strong>Form:</strong> Ready for input
        </div>
      </div>

      <h4>⚡ Quick Actions</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
          📝 New Order
        </button>
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
          📊 View All Orders
        </button>
        <button
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer',
          }}
        >
          🗑️ Clear Orders
        </button>
      </div>

      <h4>🕒 Recent Activity</h4>
      <div
        style={{
          background: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '6px',
          padding: '0.75rem',
          fontSize: '0.75rem',
        }}
      >
        <div>• Order submitted: 2 min ago</div>
        <div>• Form validated: 5 min ago</div>
        <div>• Data loaded: 10 min ago</div>
      </div>
    </div>
  );
}
