import React from 'react';

export default function RestaurantRequirements() {
  return (
    <div>
      <h4>🎯 Project Goals</h4>
      <ul>
        <li>Order management system</li>
        <li>Form validation and submission</li>
        <li>Real-time order display</li>
        <li>Backend API integration</li>
      </ul>

      <h4>📋 Features</h4>
      <ul>
        <li>✅ Order form with validation</li>
        <li>✅ Multiple food options</li>
        <li>✅ Spice level selection</li>
        <li>✅ Date picker integration</li>
        <li>✅ Order history display</li>
        <li>✅ Delete functionality</li>
      </ul>

      <h4>🛠️ Technical Stack</h4>
      <ul>
        <li><strong>React</strong> - Frontend framework</li>
        <li><strong>Node.js/Express</strong> - Backend API</li>
        <li><strong>JSON File Storage</strong> - Data persistence</li>
        <li><strong>Form Validation</strong> - Input validation</li>
      </ul>

      <h4>📊 Form Fields</h4>
      <ul>
        <li><strong>Customer Name</strong> - Required text</li>
        <li><strong>Food Base</strong> - Selection dropdown</li>
        <li><strong>Protein</strong> - Multiple options</li>
        <li><strong>Spice Level</strong> - Mild to Extra Hot</li>
        <li><strong>Quantity</strong> - Number input</li>
        <li><strong>Pickup Date</strong> - Date picker</li>
        <li><strong>Address</strong> - Delivery location</li>
        <li><strong>Comments</strong> - Special requests</li>
      </ul>

      <h4>🔄 API Endpoints</h4>
      <pre style={{
        fontSize: '0.75rem',
        background: '#f1f3f4',
        padding: '0.5rem',
        borderRadius: '4px',
        overflow: 'auto'
      }}>
{`POST /api/orders
GET  /api/orders
GET  /api/orders/:id
DELETE /api/orders/:id
GET  /api/options`}
      </pre>
    </div>
  );
}
