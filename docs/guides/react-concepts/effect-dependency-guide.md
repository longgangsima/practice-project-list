# 🔄 Effect Dependency Management

## Overview

Advanced patterns for managing useEffect dependencies to avoid infinite loops, stale closures, and unnecessary re-renders.

## 1. Dependency Array Optimization

### Problem: Missing Dependencies

```tsx
// ❌ Missing dependency - potential stale closure
const GameBoard = ({ cards }) => {
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch(cards, flippedCards); // cards not in deps
    }
  }, [flippedCards]); // Missing cards dependency
};
```

### Solution: Complete Dependencies

```tsx
// ✅ All dependencies included
const GameBoard = ({ cards }) => {
  const [flippedCards, setFlippedCards] = useState([]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch(cards, flippedCards);
    }
  }, [cards, flippedCards]); // Complete dependency list
};
```

## 2. Stable References with useCallback

### Problem: Function Recreation

```tsx
// ❌ Function recreated on every render
const GameBoard = ({ cards }) => {
  const [gameState, setGameState] = useState(initialState);

  const handleCardClick = cardId => {
    // New function every render
    setGameState(prev => ({ ...prev, flippedCards: [...prev.flippedCards, cardId] }));
  };

  useEffect(() => {
    // Some effect using handleCardClick
  }, [handleCardClick]); // Will run on every render
};
```

### Solution: Memoized Callbacks

```tsx
// ✅ Stable function reference
const GameBoard = ({ cards }) => {
  const [gameState, setGameState] = useState(initialState);

  const handleCardClick = useCallback(cardId => {
    setGameState(prev => ({ ...prev, flippedCards: [...prev.flippedCards, cardId] }));
  }, []); // No dependencies needed for functional updates

  useEffect(() => {
    // Effect will only run when truly necessary
  }, [handleCardClick]);
};
```

## 3. Effect Cleanup Patterns

### Timer Cleanup

```tsx
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // ✅ Cleanup
  }, [isAutoPlaying, images.length]);
};
```

### API Request Cleanup

```tsx
const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await api.getBooks();
        if (!cancelled) {
          // ✅ Check if component still mounted
          setBooks(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch books:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBooks();

    return () => {
      cancelled = true; // ✅ Prevent state updates after unmount
    };
  }, []);
};
```

## 4. Conditional Effects

### Problem: Effect Running Unnecessarily

```tsx
// ❌ Effect runs even when data isn't ready
const BookStore = ({ selectedAuthor }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (selectedAuthor) {
      fetchBooksByAuthor(selectedAuthor.id);
    }
  }, [selectedAuthor]); // Runs even when selectedAuthor is null
};
```

### Solution: Early Return Pattern

```tsx
// ✅ Effect only runs when conditions are met
const BookStore = ({ selectedAuthor }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!selectedAuthor?.id) return; // Early return

    const fetchBooks = async () => {
      const response = await fetchBooksByAuthor(selectedAuthor.id);
      setBooks(response.data);
    };

    fetchBooks();
  }, [selectedAuthor?.id]); // Only depend on the ID
};
```

## 5. Effect Separation

### Problem: Multiple Concerns in One Effect

```tsx
// ❌ Multiple unrelated concerns
const GameBoard = ({ cards, gameMode }) => {
  const [gameState, setGameState] = useState(initialState);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // Game logic
    if (gameState.flippedCards.length === 2) {
      checkForMatch();
    }

    // Analytics tracking
    if (gameState.moves > 0) {
      trackGameProgress(gameState.moves);
    }

    // Game mode setup
    if (gameMode === 'advanced') {
      setupAdvancedFeatures();
    }
  }, [gameState, gameMode]); // All concerns mixed together
};
```

### Solution: Separate Effects

```tsx
// ✅ Separate concerns in different effects
const GameBoard = ({ cards, gameMode }) => {
  const [gameState, setGameState] = useState(initialState);
  const [analytics, setAnalytics] = useState({});

  // Game logic effect
  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      checkForMatch();
    }
  }, [gameState.flippedCards]);

  // Analytics effect
  useEffect(() => {
    if (gameState.moves > 0) {
      trackGameProgress(gameState.moves);
    }
  }, [gameState.moves]);

  // Game mode effect
  useEffect(() => {
    if (gameMode === 'advanced') {
      setupAdvancedFeatures();
    }
  }, [gameMode]);
};
```

## Best Practices

1. **Include All Dependencies**: Use ESLint exhaustive-deps rule
2. **Stable References**: Use useCallback and useMemo for expensive operations
3. **Cleanup Effects**: Always clean up timers, subscriptions, and API calls
4. **Separate Concerns**: One effect per logical concern
5. **Early Returns**: Use conditional logic to prevent unnecessary work
6. **Functional Updates**: Prefer functional state updates to reduce dependencies

## Used In Projects

- **CardFlips**: Game state synchronization and timer management
- **ImageCarousel**: Auto-play timer and cleanup
- **BookStore**: API request management and cancellation
- **RestaurantSystem**: Form validation and data persistence
