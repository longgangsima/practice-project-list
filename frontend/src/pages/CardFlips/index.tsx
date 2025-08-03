import { useState } from 'react';
import { ProjectDetailLayout } from '../../components';
import RADIORequirementsImpl from '../CardFlipsRADIO/components/Requirements/RADIORequirements';
import RADIOGameBoard from '../CardFlipsRADIO/index';
import CardFlipsRequirements from './components/CardFlipsRequirements';
import GameBoard from './components/GameBoard';
import './styles.css';
import { generateRandomCards } from './utils';

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
