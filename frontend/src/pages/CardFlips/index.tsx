import { useState } from 'react';
import { ProjectDetailLayout } from '../../components';
import AdvancedGameBoard from './advanced';
import AdvancedRequirements from './advanced/components/Requirements/RADIORequirements';
import BasicGameBoard from './basic/components/GameBoard';
import CardFlipsRequirements from './basic/components/Requirements';
import { generateRandomCards } from './basic/utils';
import './css/card.css';
import './css/layout.css';

export default function CardFlips() {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  // Dynamic requirements based on active tab
  const getCurrentRequirements = () => {
    return activeTab === 'basic' ? <CardFlipsRequirements /> : <AdvancedRequirements />;
  };

  // Compact implementation tabs component
  const implementationTabs = (
    <div className="compact-implementation-tabs">
      <span className="compact-tab-label">🃏 Version:</span>
      <div className="compact-tab-buttons">
        <button
          className={`compact-tab-button ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic
        </button>
        <button
          className={`compact-tab-button ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
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
      <div className="card-flips-container wide-content">
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
  );
}
