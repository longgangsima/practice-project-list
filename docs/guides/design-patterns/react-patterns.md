# ⚛️ React Patterns

## 1. Container/Presentational Components Pattern

### Description

Separate components that manage state (containers) from components that handle presentation (presentational).

### Implementation

```tsx
// Container Component (Logic)
const ImageCarouselContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    // Complex navigation logic
  };

  return <ImageCarouselPresentation currentIndex={currentIndex} onNext={handleNext} isTransitioning={isTransitioning} />;
};

// Presentational Component (UI)
const ImageCarouselPresentation = ({ currentIndex, onNext, isTransitioning }) => (
  <div className={`carousel ${isTransitioning ? 'transitioning' : ''}`}>
    <img src={images[currentIndex]} />
    <button onClick={onNext}>Next</button>
  </div>
);
```

### Benefits

- **Separation of Concerns**: Logic vs presentation
- **Reusability**: Presentational components are highly reusable
- **Testability**: Easier to test logic and UI separately
- **Maintainability**: Clear responsibilities

### Used In

- ImageCarousel implementation
- CardFlips game logic separation
- BookStore data vs UI components

---

## 2. Compound Components Pattern

### Description

Components that work together to form a complete interface, sharing implicit state.

### Implementation

```tsx
// Parent component manages shared state
const GameBoard = ({ cards }) => {
  const [flippedCards, setFlippedCards] = useState([]);

  return (
    <div className="game-board">
      <GameStats moves={calculateMoves(flippedCards)} />
      <CardGrid>
        {cards.map(card => (
          <CardObject key={card.id} card={card} isFlipped={flippedCards.includes(card.id)} onFlip={handleCardFlip} />
        ))}
      </CardGrid>
      <GameControls onReset={resetGame} />
    </div>
  );
};
```

### Benefits

- **Intuitive API**: Components naturally work together
- **State Sharing**: Implicit state management
- **Flexibility**: Users can compose as needed
- **Encapsulation**: Related functionality grouped together

### Used In

- CardFlips GameBoard composition
- ProjectDetailLayout structure
- Restaurant order form components

---

## 3. Custom Hooks Pattern

### Description

Extract component logic into reusable hooks for state management and side effects.

### Implementation

```tsx
// Custom hook for game state management
const useGameEngine = initialCards => {
  const [gameState, setGameState] = useState({
    cards: initialCards,
    flippedCards: [],
    moves: 0,
    gameWon: false,
  });

  const handleCardClick = useCallback(cardId => {
    setGameState(prevState => {
      // Complex game logic
      return newState;
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return {
    gameState,
    handleCardClick,
    resetGame,
    isGameComplete: gameState.gameWon,
  };
};

// Usage in component
const GameBoard = ({ initialCards }) => {
  const { gameState, handleCardClick, resetGame, isGameComplete } = useGameEngine(initialCards);

  return <div>{/* Game UI */}</div>;
};
```

### Benefits

- **Logic Reuse**: Share stateful logic between components
- **Separation of Concerns**: UI vs business logic
- **Testing**: Hooks can be tested independently
- **Composition**: Combine multiple hooks for complex features

### Used In

- CardFlipsRADIO advanced state management
- Restaurant form validation
- API data fetching patterns

---

## 4. Higher-Order Components (HOCs) Pattern

### Description

Functions that take a component and return a new component with additional functionality.

### Implementation

```tsx
// HOC for error boundary functionality
const withErrorBoundary = Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return <ErrorFallback />;
      }

      return <Component {...this.props} />;
    }
  };
};

// HOC for loading states
const withLoading =
  Component =>
  ({ isLoading, ...props }) => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return <Component {...props} />;
  };

// Usage
const EnhancedBookStore = withErrorBoundary(withLoading(BookStore));
```

### Benefits

- **Cross-Cutting Concerns**: Add functionality to multiple components
- **Reusability**: Same enhancement for different components
- **Composition**: Stack multiple HOCs
- **Separation**: Keep enhancement logic separate

### Used In

- Error boundary implementations
- Loading state management
- Authentication checks

---

## 5. Render Props Pattern

### Description

Components that accept a function as a prop to determine what to render.

### Implementation

```tsx
// Data fetcher with render prop
const DataFetcher = ({ url, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(url)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [url]);

  return render({ data, loading, error });
};

// Usage with flexible rendering
<DataFetcher
  url="/api/books"
  render={({ data, loading, error }) => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage error={error} />;
    return <BookList books={data} />;
  }}
/>;
```

### Benefits

- **Flexibility**: Consumers control rendering
- **Reusability**: Same logic, different UI
- **Inversion of Control**: Component provides data, user provides UI
- **Composition**: Easy to combine with other patterns

### Used In

- API data fetching abstractions
- Form validation patterns
- Animation control systems

---

## 6. State Reducer Pattern

### Description

Manage complex state logic using reducer pattern, similar to Redux but local to component.

### Implementation

```tsx
// Reducer for complex game state
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      return {
        ...state,
        flippedCards: [...state.flippedCards, action.cardId],
        moves: state.moves + 1,
      };
    case 'MATCH_CARDS':
      return {
        ...state,
        matchedCards: [...state.matchedCards, ...action.cardIds],
        flippedCards: [],
      };
    case 'RESET_GAME':
      return initialGameState;
    default:
      return state;
  }
};

// Component using reducer
const GameBoard = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const handleCardClick = cardId => {
    dispatch({ type: 'FLIP_CARD', cardId });
  };

  return <div>{/* Game UI */}</div>;
};
```

### Benefits

- **Predictable State**: Clear state transitions
- **Complex Logic**: Handle intricate state relationships
- **Debugging**: Easy to trace state changes
- **Testing**: Reducers are pure functions

### Used In

- CardFlipsRADIO advanced state management
- Restaurant order processing
- Form state management

---

## 🎯 Pattern Selection Guidelines

### When to Use Each Pattern

1. **Container/Presentational**: Clear separation between data and UI
2. **Compound Components**: Related components that share state
3. **Custom Hooks**: Reusable stateful logic
4. **HOCs**: Cross-cutting concerns affecting multiple components
5. **Render Props**: Flexible rendering with shared logic
6. **State Reducer**: Complex state transitions

### Best Practices

- **Start Simple**: Don't over-engineer early
- **Gradual Migration**: Refactor to patterns as complexity grows
- **Consistent Usage**: Use patterns consistently across the project
- **Documentation**: Explain pattern choices and implementations
- **Performance**: Consider the performance impact of each pattern
