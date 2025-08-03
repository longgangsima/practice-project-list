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

  return (
    <div className="card-flips-wrapper">
      {/* Tab Navigation at Top Level */}
      <div className="implementation-tabs">
        <h1>🃏 Card Flips Memory Game</h1>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'default' ? 'active' : ''}`}
            onClick={() => setActiveTab('default')}
          >
            📚 Current Implementation
          </button>
          <button
            className={`tab-button ${activeTab === 'radio' ? 'active' : ''}`}
            onClick={() => setActiveTab('radio')}
          >
            🏗️ RADIO Framework
          </button>
        </div>
        <p className="version-indicator">
          Current Version:{' '}
          {activeTab === 'default'
            ? 'Basic Implementation'
            : 'RADIO Framework - Advanced Architecture & Optimization'}
        </p>
      </div>

      {/* Project Layout with Dynamic Requirements */}
      <ProjectDetailLayout currentPath="/card-flips" projectRequirements={getCurrentRequirements()}>
        <div className="card-flips-container">
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'default' ? (
              <div className="implementation-section">
                <GameBoard Cards={generateRandomCards()} />
              </div>
            ) : (
              <div className="implementation-section">
                <RADIOGameBoard gridSize={4} flipDelay={1000} />
              </div>
            )}
          </div>
        </div>
      </ProjectDetailLayout>
    </div>
  );
}
