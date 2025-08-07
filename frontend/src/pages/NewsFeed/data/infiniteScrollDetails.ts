import { ReactNode } from 'react';

export interface InfiniteScrollDetails {
  title: string;
  subtitle: string;
  description: string;
  howItWorks: string;
  codeExample: string;
  pros: string[];
  cons: string[];
  performance: {
    rating: number;
    battery: number;
    complexity: 'Simple' | 'Medium' | 'Complex';
    mobile: 'Poor' | 'OK' | 'Good' | 'Excellent';
  };
  bestFor: string[];
  implementation: ReactNode;
}

export const infiniteScrollDetails: Record<string, InfiniteScrollDetails> = {
  original: {
    title: 'Viewport Height Method',
    subtitle: 'Classic scroll position calculation',
    description:
      'This method calculates the scroll position by comparing the viewport height plus current scroll position against the total document height.',
    howItWorks:
      'Uses window.innerHeight + document.documentElement.scrollTop to detect when user has scrolled near the bottom of the page.',
    codeExample: `// Detect scroll position
const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const docHeight = document.documentElement.offsetHeight;
  
  if (scrollTop + windowHeight >= docHeight - 1000) {
    loadMoreContent();
  }
};

window.addEventListener('scroll', handleScroll);`,
    pros: [
      'Simple to understand and implement',
      'Wide browser support (works everywhere)',
      'Easy to debug and troubleshoot',
      'Immediate implementation possible',
      'Good for learning concepts',
    ],
    cons: [
      'Performance issues with frequent scroll events',
      'Not optimized for mobile devices',
      'Can cause battery drain',
      'Requires manual buffer calculation',
      'May trigger unnecessarily',
    ],
    performance: {
      rating: 2,
      battery: 2,
      complexity: 'Simple',
      mobile: 'OK',
    },
    bestFor: [
      'Simple prototypes and demos',
      'Learning infinite scroll concepts',
      'Quick implementations',
      'Legacy browser support',
      'Small applications with limited content',
    ],
    implementation: null,
  },

  intersection: {
    title: 'Intersection Observer API',
    subtitle: 'Modern, performant browser API',
    description:
      'Uses the Intersection Observer API to efficiently watch when a trigger element enters the viewport, providing the most performant solution.',
    howItWorks:
      'Places an invisible trigger element at the bottom of the content and observes when it becomes visible in the viewport.',
    codeExample: `// Create observer for trigger element
const observer = new IntersectionObserver(
  (entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loading) {
      loadMoreContent();
    }
  },
  {
    root: null, // viewport
    rootMargin: '100px', // trigger before visible
    threshold: 0.1 // 10% visibility required
  }
);

// Observe the trigger element
if (triggerRef.current) {
  observer.observe(triggerRef.current);
}`,
    pros: [
      'Excellent performance - browser optimized',
      'Better battery life on mobile devices',
      'Automatic performance optimization',
      'More precise triggering control',
      'Handles edge cases automatically',
      'Recommended by browser vendors',
    ],
    cons: [
      'Requires modern browser support (IE not supported)',
      'Slightly more complex initial setup',
      'Learning curve for developers unfamiliar with API',
      'Requires understanding of observer patterns',
    ],
    performance: {
      rating: 5,
      battery: 5,
      complexity: 'Medium',
      mobile: 'Excellent',
    },
    bestFor: [
      'Production applications',
      'Mobile-first designs',
      'Performance-critical applications',
      'Modern web applications',
      'Social media feeds',
      'E-commerce product listings',
    ],
    implementation: null,
  },

  'custom-hook': {
    title: 'Custom Hook with Throttling',
    subtitle: 'Reusable optimized scroll logic',
    description:
      'Creates a reusable React hook that throttles scroll events to improve performance while maintaining scroll-based detection.',
    howItWorks:
      'Uses setTimeout to throttle scroll events, checking scroll position only every specified interval (e.g., 100ms) rather than on every scroll event.',
    codeExample: `// Custom hook with throttling
const useInfiniteScroll = (callback, hasMore, loading) => {
  useEffect(() => {
    let timeoutId;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      
      // Throttle to every 100ms
      timeoutId = setTimeout(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        
        if (scrollTop + clientHeight >= scrollHeight - 200) {
          callback();
        }
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [hasMore, loading, callback]);
};`,
    pros: [
      'Reusable across multiple components',
      'Performance optimized with throttling',
      'Customizable throttle timing',
      'Good separation of concerns',
      'Easy to test and maintain',
      'Works with legacy browsers',
    ],
    cons: [
      'Still uses scroll events (less efficient than Intersection Observer)',
      'Requires manual throttle management',
      'More complex than basic scroll method',
      'Can still impact performance on slower devices',
    ],
    performance: {
      rating: 3,
      battery: 3,
      complexity: 'Medium',
      mobile: 'Good',
    },
    bestFor: [
      'Component libraries',
      'Applications needing reusable scroll logic',
      'Teams wanting consistent scroll behavior',
      'Gradual migration from basic scroll methods',
      'Applications with multiple infinite scroll areas',
    ],
    implementation: null,
  },

  virtual: {
    title: 'Virtual Scrolling',
    subtitle: 'High-performance for large datasets',
    description:
      'Only renders items currently visible in the viewport, using spacer elements for non-visible content to maintain scroll behavior.',
    howItWorks:
      'Calculates which items should be visible based on scroll position and item height, renders only those items plus a small buffer, using spacers to maintain scroll height.',
    codeExample: `// Virtual scrolling calculation
const ITEM_HEIGHT = 400;
const BUFFER_SIZE = 5;

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  
  const startIndex = Math.max(0, 
    Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE
  );
  const endIndex = Math.min(items.length,
    Math.ceil((scrollTop + windowHeight) / ITEM_HEIGHT) + BUFFER_SIZE
  );
  
  setVisibleRange({ start: startIndex, end: endIndex });
};

// Render with spacers
const topSpacer = startIndex * ITEM_HEIGHT;
const bottomSpacer = (items.length - endIndex) * ITEM_HEIGHT;

return (
  <>
    <div style={{ height: topSpacer }} />
    {visibleItems.map(item => <Item key={item.id} {...item} />)}
    <div style={{ height: bottomSpacer }} />
  </>
);`,
    pros: [
      'Excellent performance with large datasets',
      'Constant memory usage regardless of item count',
      'Smooth scrolling experience',
      'Handles thousands of items efficiently',
      'Perfect for data-heavy applications',
      'Scales linearly with dataset size',
    ],
    cons: [
      'Complex implementation and debugging',
      'Requires fixed or calculable item heights',
      'Harder to implement variable content sizes',
      'More memory overhead for calculations',
      'Challenging with dynamic content',
      'SEO considerations for non-rendered content',
    ],
    performance: {
      rating: 5,
      battery: 4,
      complexity: 'Complex',
      mobile: 'Excellent',
    },
    bestFor: [
      'Large datasets (1000+ items)',
      'Social media feeds',
      'Data tables and grids',
      'Chat applications',
      'Financial data displays',
      'Analytics dashboards',
    ],
    implementation: null,
  },

  button: {
    title: 'Manual Loading',
    subtitle: 'User-controlled content loading',
    description:
      'Provides complete user control over when additional content is loaded through a manual trigger button.',
    howItWorks:
      'Displays a "Load More" button that users click to fetch and display additional content when they are ready.',
    codeExample: `// Manual loading implementation
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

const handleLoadMore = async () => {
  setLoading(true);
  try {
    const newData = await fetchMoreData(nextPage);
    setItems(prev => [...prev, ...newData]);
    setNextPage(prev => prev + 1);
    
    if (newData.length === 0) {
      setHasMore(false);
    }
  } catch (error) {
    console.error('Failed to load more:', error);
  } finally {
    setLoading(false);
  }
};

return (
  <>
    {items.map(item => <Item key={item.id} {...item} />)}
    {hasMore && (
      <button onClick={handleLoadMore} disabled={loading}>
        {loading ? 'Loading...' : 'Load More'}
      </button>
    )}
  </>
);`,
    pros: [
      'Complete user control and predictability',
      'No performance concerns with scrolling',
      'Excellent accessibility support',
      'Works perfectly on all devices',
      'Easy to implement and maintain',
      'Great for slow network connections',
      'Users can pause and resume loading',
    ],
    cons: [
      'Less seamless user experience',
      'Requires manual user interaction',
      'Not truly "infinite" scrolling',
      'May interrupt user flow',
      'Additional UI space required for button',
    ],
    performance: {
      rating: 5,
      battery: 5,
      complexity: 'Simple',
      mobile: 'Excellent',
    },
    bestFor: [
      'Accessibility-first applications',
      'Data analysis tools',
      'Slow network environments',
      'User preference settings',
      'Search results pages',
      'Admin dashboards',
      'Applications with heavy content',
    ],
    implementation: null,
  },
};
