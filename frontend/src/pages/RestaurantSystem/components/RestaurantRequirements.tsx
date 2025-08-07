export default function RestaurantRequirements() {
  return (
    <div className="infinite-scroll-info">
      <div className="info-header">
        <h2 className="info-title">Restaurant Order System</h2>
        <p className="info-subtitle">
          Complete order management with form validation and backend integration
        </p>
      </div>

      <div className="info-section">
        <h3>🎯 Project Goals</h3>
        <ul className="best-for-list">
          <li>Order management system</li>
          <li>Form validation and submission</li>
          <li>Real-time order display</li>
          <li>Backend API integration</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📋 Features</h3>
        <ul className="pros-list">
          <li>Order form with validation</li>
          <li>Multiple food options</li>
          <li>Spice level selection</li>
          <li>Date picker integration</li>
          <li>Order history display</li>
          <li>Delete functionality</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🛠️ Technical Stack</h3>
        <ul className="pros-list">
          <li>
            <strong>React</strong> - Frontend framework
          </li>
          <li>
            <strong>Node.js/Express</strong> - Backend API
          </li>
          <li>
            <strong>JSON File Storage</strong> - Data persistence
          </li>
          <li>
            <strong>Form Validation</strong> - Input validation
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📊 Form Fields</h3>
        <ul className="pros-list">
          <li>
            <strong>Customer Name</strong> - Required text
          </li>
          <li>
            <strong>Food Base</strong> - Selection dropdown
          </li>
          <li>
            <strong>Protein</strong> - Multiple options
          </li>
          <li>
            <strong>Spice Level</strong> - Mild to Extra Hot
          </li>
          <li>
            <strong>Quantity</strong> - Number input
          </li>
          <li>
            <strong>Pickup Date</strong> - Date picker
          </li>
          <li>
            <strong>Address</strong> - Delivery location
          </li>
          <li>
            <strong>Comments</strong> - Special requests
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🔄 API Endpoints</h3>
        <pre className="code-block">
          <code>{`POST /api/orders
GET  /api/orders
GET  /api/orders/:id
DELETE /api/orders/:id
GET  /api/options`}</code>
        </pre>
      </div>
    </div>
  );
}
