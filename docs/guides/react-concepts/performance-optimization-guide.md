# ⚡ Performance Optimization Guide

## Overview

Advanced React performance optimization techniques using React.memo, useMemo, useCallback, and other strategies.

## 1. React.memo for Component Memoization

### Problem: Unnecessary Re-renders

```tsx
// ❌ Child re-renders every time parent updates
const CardObject = ({ card, onFlip }) => {
  console.log('CardObject rendered'); // Logs on every parent update

  return (
    <div className="card" onClick={() => onFlip(card.id)}>
      {card.letter}
    </div>
  );
};

const GameBoard = () => {
  const [moves, setMoves] = useState(0);
  const [cards, setCards] = useState(generateCards());

  const handleCardFlip = cardId => {
    setMoves(prev => prev + 1); // This causes ALL cards to re-render
  };

  return (
    <div>
      <div>Moves: {moves}</div>
      {cards.map(card => (
        <CardObject key={card.id} card={card} onFlip={handleCardFlip} />
      ))}
    </div>
  );
};
```

### Solution: Memoized Components

```tsx
// ✅ Only re-renders when props actually change
const CardObject = React.memo(({ card, onFlip }) => {
  console.log('CardObject rendered'); // Only logs when card props change

  return (
    <div className="card" onClick={() => onFlip(card.id)}>
      {card.letter}
    </div>
  );
});

// ✅ With custom comparison for complex props
const BookCard = React.memo(
  ({ book, onSelect, isSelected }) => {
    return (
      <div className={`book-card ${isSelected ? 'selected' : ''}`}>
        <h3>{book.title}</h3>
        <p>{book.author.name}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison - only re-render if these specific values change
    return prevProps.book.id === nextProps.book.id && prevProps.isSelected === nextProps.isSelected;
  }
);
```

## 2. useCallback for Stable Function References

### Problem: New Functions on Every Render

```tsx
// ❌ New function created on every render
const GameBoard = () => {
  const [gameState, setGameState] = useState(initialState);

  const handleCardFlip = cardId => {
    // New function every render
    setGameState(prev => ({
      ...prev,
      flippedCards: [...prev.flippedCards, cardId],
    }));
  };

  return (
    <div>
      {gameState.cards.map(card => (
        <CardObject
          key={card.id}
          card={card}
          onFlip={handleCardFlip} // Always a new function reference
        />
      ))}
    </div>
  );
};
```

### Solution: Memoized Callbacks

```tsx
// ✅ Stable function reference
const GameBoard = () => {
  const [gameState, setGameState] = useState(initialState);

  const handleCardFlip = useCallback(cardId => {
    setGameState(prev => ({
      ...prev,
      flippedCards: [...prev.flippedCards, cardId],
    }));
  }, []); // No dependencies needed with functional updates

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  return (
    <div>
      {gameState.cards.map(card => (
        <CardObject
          key={card.id}
          card={card}
          onFlip={handleCardFlip} // Same function reference
        />
      ))}
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};
```

## 3. useMemo for Expensive Calculations

### Problem: Repeated Expensive Calculations

```tsx
// ❌ Expensive calculation on every render
const BookStore = ({ books, filters }) => {
  const [sortBy, setSortBy] = useState('title');

  // This runs on EVERY render, even when books/filters don't change
  const filteredAndSortedBooks = books
    .filter(book => book.genre.includes(filters.genre))
    .filter(book => book.rating >= filters.minRating)
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div>
      {filteredAndSortedBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
```

### Solution: Memoized Calculations

```tsx
// ✅ Only recalculates when dependencies change
const BookStore = ({ books, filters }) => {
  const [sortBy, setSortBy] = useState('title');

  const filteredAndSortedBooks = useMemo(() => {
    console.log('Filtering and sorting books'); // Only logs when needed

    return books
      .filter(book => book.genre.includes(filters.genre))
      .filter(book => book.rating >= filters.minRating)
      .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
  }, [books, filters.genre, filters.minRating, sortBy]);

  return (
    <div>
      {filteredAndSortedBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};
```

## 4. State Structure Optimization

### Problem: Unnecessary Re-renders from State Shape

```tsx
// ❌ Changing one property causes entire object to be considered "new"
const [gameState, setGameState] = useState({
  cards: [],
  flippedCards: [],
  moves: 0,
  timer: 0,
  playerName: '',
  settings: { difficulty: 'medium', sound: true },
});

// Every state update creates a new object reference
const incrementMoves = () => {
  setGameState(prev => ({
    ...prev,
    moves: prev.moves + 1, // Entire gameState changes
  }));
};
```

### Solution: Split State Appropriately

```tsx
// ✅ Separate frequently changing state from stable state
const [cards, setCards] = useState([]);
const [flippedCards, setFlippedCards] = useState([]);
const [moves, setMoves] = useState(0); // Frequently changing
const [timer, setTimer] = useState(0); // Frequently changing
const [playerName, setPlayerName] = useState(''); // Rarely changing
const [settings, setSettings] = useState({ difficulty: 'medium', sound: true }); // Rarely changing

const incrementMoves = () => {
  setMoves(prev => prev + 1); // Only moves state changes
};
```

## 5. List Optimization Patterns

### Problem: Inefficient List Rendering

```tsx
// ❌ Poor key choice and unnecessary operations
const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.map((order, index) => (
        <OrderCard
          key={index} // ❌ Using array index as key
          order={order}
          formattedDate={new Date(order.date).toLocaleDateString()} // ❌ Calculation in render
        />
      ))}
    </div>
  );
};
```

### Solution: Optimized List Rendering

```tsx
// ✅ Stable keys and memoized calculations
const OrderCard = React.memo(({ order }) => {
  const formattedDate = useMemo(() => new Date(order.date).toLocaleDateString(), [order.date]);

  return (
    <div className="order-card">
      <h3>Order #{order.id}</h3>
      <p>Date: {formattedDate}</p>
      <p>Customer: {order.customerName}</p>
    </div>
  );
});

const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.map(order => (
        <OrderCard
          key={order.id} // ✅ Stable, unique key
          order={order}
        />
      ))}
    </div>
  );
};
```

## 6. Context Optimization

### Problem: Context Value Recreation

```tsx
// ❌ New context value on every render
const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialState);

  const value = {
    // New object every render
    gameState,
    setGameState,
    resetGame: () => setGameState(initialState),
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
```

### Solution: Memoized Context Value

```tsx
// ✅ Stable context value
const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(initialState);

  const resetGame = useCallback(() => {
    setGameState(initialState);
  }, []);

  const value = useMemo(
    () => ({
      gameState,
      setGameState,
      resetGame,
    }),
    [gameState, resetGame]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
```

## Performance Monitoring

### Built-in React DevTools

```tsx
// Use React DevTools Profiler to identify performance bottlenecks
const GameBoard = () => {
  return (
    <Profiler id="GameBoard" onRender={onRenderCallback}>
      {/* Your component tree */}
    </Profiler>
  );
};

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
};
```

## Best Practices Checklist

- [ ] **Use React.memo** for components that receive stable props
- [ ] **Use useCallback** for functions passed to child components
- [ ] **Use useMemo** for expensive calculations
- [ ] **Split state** to avoid unnecessary re-renders
- [ ] **Choose stable keys** for list items
- [ ] **Memoize context values** to prevent provider re-renders
- [ ] **Profile performance** using React DevTools
- [ ] **Measure before optimizing** - don't optimize prematurely

## Used In Projects

- **CardFlips**: Memoized card components and game calculations
- **BookStore**: Optimized book filtering and sorting
- **ImageCarousel**: Memoized image transitions and controls
- **RestaurantSystem**: Efficient order list rendering
