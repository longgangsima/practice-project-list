export default function CardFlipsRequirements() {
  return (
    <div className="requirements-content">
      <div className="requirement-section">
        <h5>🎯 Game Objective</h5>
        <p>Match all pairs of cards by flipping them over and finding matching letters.</p>
      </div>

      <div className="requirement-section">
        <h5>📋 Game Setup</h5>
        <ul>
          <li>16 cards arranged in a 4×4 grid</li>
          <li>8 pairs of matching cards</li>
          <li>Card values randomly selected from A to Z</li>
          <li>All cards initially face down (hidden)</li>
        </ul>
      </div>

      <div className="requirement-section">
        <h5>🎮 Game Rules</h5>
        <ul>
          <li>Click a card to flip it over and reveal its letter</li>
          <li>Click a second card to reveal its letter</li>
          <li>If both cards match: they stay face up permanently</li>
          <li>If cards do not match: they flip back after 1 second delay</li>
          <li>Continue until all pairs are matched</li>
        </ul>
      </div>

      <div className="requirement-section">
        <h5>🔧 Technical Features</h5>
        <ul>
          <li>React functional components</li>
          <li>useState hook for state management</li>
          <li>Component prop passing</li>
          <li>Event handling patterns</li>
          <li>Conditional rendering</li>
          <li>Array manipulation methods</li>
        </ul>
      </div>

      <div className="requirement-section">
        <h5>📚 Learning Focus</h5>
        <ul>
          <li>React hooks fundamentals</li>
          <li>State management patterns</li>
          <li>Component composition</li>
          <li>Event handling</li>
          <li>CSS styling techniques</li>
          <li>TypeScript integration</li>
        </ul>
      </div>

      <div className="requirement-section">
        <h5>⚡ Game Features</h5>
        <ul>
          <li>Visual card flip animations</li>
          <li>Game state tracking (moves, time, etc.)</li>
          <li>Win condition detection</li>
          <li>Reset/New Game functionality</li>
        </ul>
      </div>

      <div className="requirement-section">
        <h5>🎨 UI Requirements</h5>
        <ul>
          <li>Clean 4×4 grid layout</li>
          <li>Card flip animations</li>
          <li>Visual feedback for matched/unmatched cards</li>
          <li>Game statistics display</li>
          <li>Responsive design</li>
        </ul>
      </div>
    </div>
  );
}
