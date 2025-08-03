import { useState } from 'react';
import { ProjectDetailLayout } from '../../components';
import AdvancedGameBoard from './advanced';
import AdvancedRequirements from './advanced/components/Requirements/RADIORequirements';
import BasicGameBoard from './basic/components/GameBoard';
import BasicRequirements from './basic/components/Requirements';
import { generateRandomCards } from './basic/utils';
import './css/card.css';
import './css/layout.css';

export default function CardFlips() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  // Dynamic requirements based on active tab
  const getCurrentRequirements = () => {
    return activeTab === 'basic' ? <BasicRequirements /> : <AdvancedRequirements />;
  };

  return (
    <div className="card-flips-wrapper">
      {/* Tab Navigation at Top Level */}
      <div className="implementation-tabs">
        <h1>🃏 Card Flips Memory Game</h1>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            📚 Basic Implementation
          </button>
          <button
            className={`tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
            onClick={() => setActiveTab('advanced')}
          >
            🏗️ Advanced (RADIO)
          </button>
        </div>
        <p className="version-indicator">
          Current Version:{' '}
          {activeTab === 'basic'
            ? 'Basic Implementation'
            : 'RADIO Framework - Advanced Architecture & Optimization'}
        </p>
      </div>

      {/* Project Layout with Dynamic Requirements */}
      <ProjectDetailLayout currentPath="/card-flips" projectRequirements={getCurrentRequirements()}>
        <div className="card-flips-container">
          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'basic' ? (
              <div className="implementation-section">
                <BasicGameBoard Cards={generateRandomCards()} />
              </div>
            ) : (
              <div className="implementation-section">
                <AdvancedGameBoard gridSize={4} flipDelay={1000} />
              </div>
            )}
          </div>
        </div>
      </ProjectDetailLayout>
    </div>
  );
}
