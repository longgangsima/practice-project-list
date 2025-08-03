import { useState } from 'react';
import { ProjectDetailLayout } from '../../components';
import './css/card.css';
import './css/layout.css';
import CardFlipsRequirements from './default/components/CardFlipsRequirements';
import GameBoard from './default/components/GameBoard';
import { generateRandomCards } from './default/utils';
import RADIOGameBoard from './radio';
import RADIORequirementsImpl from './radio/components/Requirements/RADIORequirements';

export default function CardFlips() {
  const [activeTab, setActiveTab] = useState<'default' | 'radio'>('default');

  // Dynamic requirements based on active tab
  const getCurrentRequirements = () => {
    return activeTab === 'default' ? <CardFlipsRequirements /> : <RADIORequirementsImpl />;
  };

  // Compact implementation tabs component
  const implementationTabs = (
    <div className="compact-implementation-tabs">
      <span className="compact-tab-label">🃏 Version:</span>
      <div className="compact-tab-buttons">
        <button
          className={`compact-tab-button ${activeTab === 'default' ? 'active' : ''}`}
          onClick={() => setActiveTab('default')}
        >
          📚 Basic
        </button>
        <button
          className={`compact-tab-button ${activeTab === 'radio' ? 'active' : ''}`}
          onClick={() => setActiveTab('radio')}
        >
          🏗️ Advanced
        </button>
      </div>
    </div>
  );

  return (
    <ProjectDetailLayout
      currentPath="/card-flips"
      projectRequirements={getCurrentRequirements()}
      implementationTabs={implementationTabs}
    >
      <div className="card-flips-container">
        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'default' ? (
            <div className="implementation-section">
              <div className="horizontal-game-container">
                <div className="game-section">
                  <GameBoard Cards={generateRandomCards()} />
                </div>
              </div>
            </div>
          ) : (
            <div className="implementation-section">
              <div className="horizontal-game-container">
                <div className="game-section">
                  <RADIOGameBoard gridSize={4} flipDelay={1000} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProjectDetailLayout>
  );
}
