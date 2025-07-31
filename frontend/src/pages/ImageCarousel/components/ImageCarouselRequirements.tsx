import React from 'react';

export default function ImageCarouselRequirements() {
  return (
    <div>
      <h4>🎯 Project Goals</h4>
      <ul>
        <li>Interactive image carousel component</li>
        <li>Smooth navigation transitions</li>
        <li>Responsive design</li>
        <li>Touch-friendly controls</li>
      </ul>

      <h4>📋 Features</h4>
      <ul>
        <li>✅ Image navigation (prev/next)</li>
        <li>✅ Pagination dots</li>
        <li>✅ Smooth CSS transitions</li>
        <li>✅ Responsive layout</li>
        <li>✅ Touch/swipe support</li>
        <li>✅ Keyboard navigation</li>
      </ul>

      <h4>🛠️ Technical Implementation</h4>
      <ul>
        <li><strong>CSS Transforms</strong> - translateX animations</li>
        <li><strong>React State</strong> - Current image tracking</li>
        <li><strong>Event Handlers</strong> - Navigation controls</li>
        <li><strong>CSS Grid/Flexbox</strong> - Layout structure</li>
      </ul>

      <h4>🎨 Design Patterns</h4>
      <ul>
        <li><strong>Container/Presenter</strong> - Logic separation</li>
        <li><strong>Component Composition</strong> - Reusable parts</li>
        <li><strong>CSS Modules</strong> - Scoped styling</li>
        <li><strong>Performance Optimization</strong> - React.memo</li>
      </ul>

      <h4>🔧 Navigation Controls</h4>
      <ul>
        <li><strong>Previous Button</strong> - Navigate backward</li>
        <li><strong>Next Button</strong> - Navigate forward</li>
        <li><strong>Dot Pagination</strong> - Direct navigation</li>
        <li><strong>Keyboard Support</strong> - Arrow keys</li>
      </ul>

      <h4>📱 Responsive Behavior</h4>
      <pre style={{
        fontSize: '0.75rem',
        background: '#f1f3f4',
        padding: '0.5rem',
        borderRadius: '4px',
        overflow: 'auto'
      }}>
{`Desktop: Full controls
Tablet:  Touch optimized  
Mobile:  Swipe gestures`}
      </pre>
    </div>
  );
}
