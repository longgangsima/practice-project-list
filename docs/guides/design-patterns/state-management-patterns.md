# 🔄 State Management Patterns

## 1. Local vs Global State Pattern

### Description

Strategic decision-making about where to place state based on component needs and data flow.

### Implementation

```tsx
// Local State - Component-specific data
const CardObject = ({ card, onFlip }) => {
  const [isHovered, setIsHovered] = useState(false); // Local UI state

  return (
    <div
      className={`card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onFlip(card.id)} // Global state via prop
    >
      {card.letter}
    </div>
  );
};

// Global State - Shared across components
const GameBoard = () => {
  const [gameState, setGameState] = useState({
    // Shared game state
    cards: [],
    moves: 0,
    flippedCards: [],
  });

  return (
    <div>
      <GameStats moves={gameState.moves} />
      <CardGrid cards={gameState.cards} onCardFlip={handleCardFlip} />
    </div>
  );
};
```

### Benefits

- **Performance**: Avoid unnecessary re-renders
- **Maintainability**: Clear data ownership
- **Scalability**: State placement scales with component tree
- **Debugging**: Easier to track state changes

### Used In

- Card flip animations (local)
- Game progress tracking (shared)
- Form field states vs form submission

---

## 2. State Lifting Pattern

### Description

Move state up to the closest common ancestor when multiple components need the same data.

### Implementation

```tsx
// Before - Duplicated state
const BookCard = () => {
  const [selectedBook, setSelectedBook] = useState(null); // ❌ Duplicated
  // ...
};

const BookForm = () => {
  const [selectedBook, setSelectedBook] = useState(null); // ❌ Duplicated
  // ...
};

// After - Lifted state
const BookStore = () => {
  const [selectedBook, setSelectedBook] = useState(null); // ✅ Single source

  return (
    <div>
      <BookCard selectedBook={selectedBook} onSelect={setSelectedBook} />
      <BookForm selectedBook={selectedBook} onBookChange={setSelectedBook} />
    </div>
  );
};
```

### Benefits

- **Single Source of Truth**: Eliminates state synchronization issues
- **Data Flow**: Clear parent-to-child data flow
- **Consistency**: All components use the same data
- **Debugging**: Easier to track state changes

### Used In

- BookStore book selection
- Restaurant order state
- CardFlips game state

---

## 3. State Normalization Pattern

### Description

Flatten nested state structures to avoid deep updates and improve performance.

### Implementation

```tsx
// Before - Nested structure (harder to update)
const [restaurantState, setRestaurantState] = useState({
  orders: [
    {
      id: 1,
      customer: { name: 'John', email: 'john@example.com' },
      items: [
        { id: 1, name: 'Pizza', quantity: 2 },
        { id: 2, name: 'Salad', quantity: 1 },
      ],
    },
  ],
});

// After - Normalized structure (easier to update)
const [restaurantState, setRestaurantState] = useState({
  orders: {
    1: { id: 1, customerId: 1, itemIds: [1, 2] },
  },
  customers: {
    1: { id: 1, name: 'John', email: 'john@example.com' },
  },
  items: {
    1: { id: 1, name: 'Pizza', quantity: 2 },
    2: { id: 2, name: 'Salad', quantity: 1 },
  },
});

// Update becomes simple
const updateItem = (itemId, updates) => {
  setRestaurantState(prev => ({
    ...prev,
    items: {
      ...prev.items,
      [itemId]: { ...prev.items[itemId], ...updates },
    },
  }));
};
```

### Benefits

- **Performance**: Shallow comparisons work better
- **Updates**: Easier to update specific items
- **Consistency**: No duplicate data
- **Scalability**: Handles large datasets efficiently

### Used In

- Restaurant order management
- BookStore book collections
- Complex form data

---

## 4. Optimistic Updates Pattern

### Description

Update UI immediately while API call is in progress, rollback if the call fails.

### Implementation

```tsx
const useOptimisticOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pendingOperations, setPendingOperations] = useState(new Set());

  const addOrder = async newOrder => {
    const tempId = generateTempId();
    const optimisticOrder = { ...newOrder, id: tempId, pending: true };

    // Optimistic update
    setOrders(prev => [...prev, optimisticOrder]);
    setPendingOperations(prev => new Set([...prev, tempId]));

    try {
      const savedOrder = await api.createOrder(newOrder);

      // Replace optimistic with real data
      setOrders(prev => prev.map(order => (order.id === tempId ? savedOrder : order)));
    } catch (error) {
      // Rollback on error
      setOrders(prev => prev.filter(order => order.id !== tempId));
      showErrorMessage('Failed to create order');
    } finally {
      setPendingOperations(prev => {
        const newSet = new Set(prev);
        newSet.delete(tempId);
        return newSet;
      });
    }
  };

  return { orders, addOrder, pendingOperations };
};
```

### Benefits

- **Responsive UI**: Immediate feedback to user actions
- **Better UX**: No waiting for server responses
- **Error Handling**: Graceful fallback on failures
- **Performance**: Perceived performance improvement

### Used In

- Restaurant order creation
- BookStore book additions
- Form submissions

---

## 5. State Synchronization Pattern

### Description

Keep related state values in sync automatically using effects.

### Implementation

```tsx
const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [moves, setMoves] = useState(0);

  // Synchronize game won state
  useEffect(() => {
    const totalCards = cards.length;
    const matchedCount = matchedCards.length;
    setGameWon(totalCards > 0 && matchedCount === totalCards);
  }, [cards.length, matchedCards.length]);

  // Synchronize moves count
  useEffect(() => {
    const completedMoves = Math.floor(flippedCards.length / 2);
    setMoves(completedMoves);
  }, [flippedCards.length]);

  // Auto-clear flipped cards after checking for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const timer = setTimeout(() => {
        checkForMatch(flippedCards);
        setFlippedCards([]);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  return (
    <div>
      <GameStats moves={moves} gameWon={gameWon} />
      <CardGrid cards={cards} flippedCards={flippedCards} />
    </div>
  );
};
```

### Benefits

- **Consistency**: Related state always stays in sync
- **Automation**: Reduces manual state management
- **Reliability**: Prevents inconsistent state scenarios
- **Maintainability**: Clear dependencies between state values

### Used In

- CardFlips game state synchronization
- Form validation state
- API loading states

---

## 6. State Machine Pattern

### Description

Model component state as a finite state machine with explicit states and transitions.

### Implementation

```tsx
const GAME_STATES = {
  IDLE: 'idle',
  PLAYING: 'playing',
  CHECKING: 'checking',
  WON: 'won',
  PAUSED: 'paused',
};

const gameStateMachine = {
  [GAME_STATES.IDLE]: {
    START_GAME: GAME_STATES.PLAYING,
  },
  [GAME_STATES.PLAYING]: {
    FLIP_CARD: GAME_STATES.CHECKING,
    PAUSE_GAME: GAME_STATES.PAUSED,
    WIN_GAME: GAME_STATES.WON,
  },
  [GAME_STATES.CHECKING]: {
    MATCH_FOUND: GAME_STATES.PLAYING,
    NO_MATCH: GAME_STATES.PLAYING,
    WIN_GAME: GAME_STATES.WON,
  },
  [GAME_STATES.WON]: {
    RESTART_GAME: GAME_STATES.IDLE,
  },
  [GAME_STATES.PAUSED]: {
    RESUME_GAME: GAME_STATES.PLAYING,
    RESTART_GAME: GAME_STATES.IDLE,
  },
};

const useGameStateMachine = () => {
  const [currentState, setCurrentState] = useState(GAME_STATES.IDLE);

  const transition = action => {
    const nextState = gameStateMachine[currentState]?.[action];
    if (nextState) {
      setCurrentState(nextState);
    }
  };

  return { currentState, transition };
};
```

### Benefits

- **Predictable**: Clear state transitions
- **Debugging**: Easy to visualize and debug
- **Testing**: State machines are easy to test
- **Documentation**: Self-documenting behavior

### Used In

- CardFlips game flow control
- Form wizard navigation
- API request states

---

## 🎯 Pattern Selection Guidelines

### When to Use Each Pattern

1. **Local vs Global**: Based on data sharing needs
2. **State Lifting**: When multiple components need the same data
3. **Normalization**: For complex nested data structures
4. **Optimistic Updates**: For responsive user interactions
5. **Synchronization**: When state values depend on each other
6. **State Machine**: For complex state transitions and workflows

### Best Practices

- **Minimize State**: Only store what you need
- **Single Source of Truth**: Avoid duplicating state
- **Immutable Updates**: Always create new state objects
- **Performance**: Use useMemo and useCallback appropriately
- **Testing**: Write tests for state transitions and edge cases
