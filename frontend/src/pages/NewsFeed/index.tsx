import { useState } from 'react';
import ProjectDetailLayout from '../../components/layout/ProjectDetailLayout';
import NewsFeedButton from './ButtonVersion';
import NewsFeedCustomHook from './CustomHookVersion';
import NewsFeedIntersectionObserver from './IntersectionObserverVersion';
import NewsFeedOriginal from './OriginalVersion';
import NewsFeedVirtual from './VirtualScrollVersion';
import InfiniteScrollInfo from './components/InfiniteScrollInfo';
import { infiniteScrollDetails } from './data/infiniteScrollDetails';
import './styles/NewsFeedClean.css';

type TabType = 'original' | 'intersection' | 'custom-hook' | 'virtual' | 'button';

const NewsFeed = () => {
  const [activeTab, setActiveTab] = useState<TabType>('original');

  const tabs = [
    {
      id: 'original' as TabType,
      label: 'Viewport Height',
      description: 'window.innerHeight + scrollTop',
    },
    {
      id: 'intersection' as TabType,
      label: 'Intersection Observer',
      description: 'Modern, performant API',
    },
    { id: 'custom-hook' as TabType, label: 'Custom Hook', description: 'Throttled scroll events' },
    {
      id: 'virtual' as TabType,
      label: 'Virtual Scrolling',
      description: 'Renders only visible items',
    },
    { id: 'button' as TabType, label: 'Manual Loading', description: 'Button-triggered loading' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'intersection':
        return <NewsFeedIntersectionObserver />;
      case 'custom-hook':
        return <NewsFeedCustomHook />;
      case 'virtual':
        return <NewsFeedVirtual />;
      case 'button':
        return <NewsFeedButton />;
      default:
        return <NewsFeedOriginal />;
    }
  };

  const implementationTabs = (
    <div className="tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-label">{tab.label}</span>
          <small className="tab-description">{tab.description}</small>
        </button>
      ))}
    </div>
  );

  const projectRequirements = <InfiniteScrollInfo details={infiniteScrollDetails[activeTab]} />;

  return (
    <ProjectDetailLayout
      currentPath="/news-feed"
      implementationTabs={implementationTabs}
      projectRequirements={projectRequirements}
    >
      {renderContent()}
    </ProjectDetailLayout>
  );
};

export default NewsFeed;
