export default function ImageCarouselRequirements() {
  return (
    <div className="infinite-scroll-info">
      <div className="info-header">
        <h2 className="info-title">Image Carousel</h2>
        <p className="info-subtitle">
          Interactive image carousel with smooth transitions and responsive design
        </p>
      </div>

      <div className="info-section">
        <h3>🎯 Project Goals</h3>
        <ul className="best-for-list">
          <li>Interactive image carousel component</li>
          <li>Smooth navigation transitions</li>
          <li>Responsive design</li>
          <li>Touch-friendly controls</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📋 Features</h3>
        <ul className="pros-list">
          <li>Image navigation (prev/next)</li>
          <li>Pagination dots</li>
          <li>Smooth CSS transitions</li>
          <li>Responsive layout</li>
          <li>Touch/swipe support</li>
          <li>Keyboard navigation</li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🛠️ Technical Implementation</h3>
        <ul className="pros-list">
          <li>
            <strong>CSS Transforms</strong> - translateX animations
          </li>
          <li>
            <strong>React State</strong> - Current image tracking
          </li>
          <li>
            <strong>Event Handlers</strong> - Navigation controls
          </li>
          <li>
            <strong>CSS Grid/Flexbox</strong> - Layout structure
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🎨 Design Patterns</h3>
        <ul className="pros-list">
          <li>
            <strong>Container/Presenter</strong> - Logic separation
          </li>
          <li>
            <strong>Component Composition</strong> - Reusable parts
          </li>
          <li>
            <strong>CSS Modules</strong> - Scoped styling
          </li>
          <li>
            <strong>Performance Optimization</strong> - React.memo
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>🔧 Navigation Controls</h3>
        <ul className="pros-list">
          <li>
            <strong>Previous Button</strong> - Navigate backward
          </li>
          <li>
            <strong>Next Button</strong> - Navigate forward
          </li>
          <li>
            <strong>Dot Pagination</strong> - Direct navigation
          </li>
          <li>
            <strong>Keyboard Support</strong> - Arrow keys
          </li>
        </ul>
      </div>

      <div className="info-section">
        <h3>📱 Responsive Behavior</h3>
        <pre className="code-block">
          <code>{`Desktop: Full controls
Tablet:  Touch optimized  
Mobile:  Swipe gestures`}</code>
        </pre>
      </div>
    </div>
  );
}
