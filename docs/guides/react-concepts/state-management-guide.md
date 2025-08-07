# 🔄 React State Management - Complete Guide

Essential state update patterns for React interviews and development. This guide covers shallow copying, nested updates, and deep state management techniques.

## 📋 Table of Contents

1. [Shallow Copy Fundamentals](#shallow-copy-fundamentals)
2. [Nested State Updates](#nested-state-updates)
3. [Deep Nested Updates](#deep-nested-updates)
4. [Best Practices](#best-practices)
5. [Interview Questions](#interview-questions)

---

## 🎯 Shallow Copy Fundamentals

### What is Shallow Copy?

**Shallow copy** creates a new object/array but only copies the first level of properties:

- **Primitive values** (string, number, boolean) → Creates new values ✅
- **Reference types** (object, array) → Copies references only ⚠️

### Visual Example

```
Original Object                    Shallow Copy
┌─────────────────┐               ┌─────────────────┐
│ name: "John"    │               │ name: "John"    │  ← Independent value
│ age: 25         │               │ age: 25         │  ← Independent value
│ hobbies: ───────┼─────────────→ │ hobbies: ───────┼──┐
│ address: ───────┼─────────────→ │ address: ───────┼──┼─→ Shared reference
└─────────────────┘               └─────────────────┘  │
                                                      │
                 Shared Data ←─────────────────────────┘
                 ["reading", "swimming"]
                 {city: "NYC", zip: "10001"}
```

### Shallow Copy Methods

```javascript
// Object shallow copy
const obj = { name: 'John', address: { city: 'NYC' } };

// Method 1: Spread operator (most common)
const copy1 = { ...obj };

// Method 2: Object.assign
const copy2 = Object.assign({}, obj);

// Array shallow copy
const arr = [1, 2, { nested: 'value' }];

// Method 1: Spread operator
const arrCopy1 = [...arr];

// Method 2: Array.slice()
const arrCopy2 = arr.slice();

// Method 3: Array.from()
const arrCopy3 = Array.from(arr);
```

### React State Update Example

```javascript
// ❌ Wrong - Direct mutation
const handleUpdateUser = () => {
  user.name = 'Jane'; // Mutates original
  user.address.city = 'LA'; // Mutates nested object
  setUser(user); // React won't re-render!
};

// ✅ Correct - Shallow copy for top level
const handleUpdateUser = () => {
  setUser({
    ...user, // Shallow copy
    name: 'Jane', // Update specific property
  });
};

// ⚠️ Problem - Nested object still shared
const handleUpdateAddress = () => {
  setUser({
    ...user,
    address: {
      ...user.address, // Need to copy nested objects too
      city: 'LA',
    },
  });
};
```

---

## 🏗️ Nested State Updates

### The Challenge

When state contains nested objects or arrays, shallow copying isn't enough:

```javascript
const [state, setState] = useState({
  user: {
    profile: {
      name: 'John',
      settings: {
        theme: 'dark',
        notifications: true,
      },
    },
  },
  todos: [
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build app', completed: false },
  ],
});
```

### Safe Nested Updates

#### Updating Nested Objects

```javascript
// ❌ Wrong - Mutates nested object
const updateTheme = newTheme => {
  setState({
    ...state,
    user: {
      ...state.user,
      profile: {
        ...state.user.profile,
        settings: {
          ...state.user.profile.settings,
          theme: newTheme, // ← Only this line should change
        },
      },
    },
  });
};

// ✅ Better - Helper function
const updateNestedState = (path, value) => {
  const keys = path.split('.');
  const newState = { ...state };

  let current = newState;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;

  setState(newState);
};

// Usage: updateNestedState('user.profile.settings.theme', 'light');
```

#### Updating Arrays

```javascript
// Adding item
const addTodo = newTodo => {
  setState({
    ...state,
    todos: [...state.todos, newTodo], // Spread existing + add new
  });
};

// Updating item
const toggleTodo = id => {
  setState({
    ...state,
    todos: state.todos.map(
      todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed } // Copy and update
          : todo // Keep unchanged
    ),
  });
};

// Removing item
const removeTodo = id => {
  setState({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  });
};
```

---

## 🏗️ Deep Nested Updates

### When You Need Deep Copying

For complex nested structures, manual spreading becomes unwieldy:

```javascript
const complexState = {
  users: [
    {
      id: 1,
      profile: {
        personal: { name: 'John', age: 30 },
        settings: { theme: 'dark', notifications: { email: true, push: false } },
      },
      posts: [{ id: 1, content: 'Hello', comments: [{ id: 1, text: 'Nice!' }] }],
    },
  ],
};
```

### Solutions for Deep Updates

#### 1. Immer Library (Recommended)

```javascript
import { produce } from 'immer';

// ✅ Clean and readable
const updateUserName = (userId, newName) => {
  setState(
    produce(draft => {
      const user = draft.users.find(u => u.id === userId);
      user.profile.personal.name = newName; // Write like mutation, but safe!
    })
  );
};

const addComment = (userId, postId, comment) => {
  setState(
    produce(draft => {
      const user = draft.users.find(u => u.id === userId);
      const post = user.posts.find(p => p.id === postId);
      post.comments.push(comment);
    })
  );
};
```

#### 2. useReducer Pattern

```javascript
const stateReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_NAME':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.userId
            ? {
                ...user,
                profile: {
                  ...user.profile,
                  personal: {
                    ...user.profile.personal,
                    name: action.name,
                  },
                },
              }
            : user
        ),
      };

    case 'TOGGLE_NOTIFICATION':
      return produce(state, draft => {
        const user = draft.users.find(u => u.id === action.userId);
        user.profile.settings.notifications[action.type] = action.enabled;
      });

    default:
      return state;
  }
};

const [state, dispatch] = useReducer(stateReducer, initialState);
```

#### 3. State Normalization

```javascript
// Instead of nested arrays, use normalized structure
const normalizedState = {
  users: {
    byId: {
      1: { id: 1, name: 'John', profileId: 1 },
    },
    allIds: [1],
  },
  profiles: {
    byId: {
      1: { id: 1, userId: 1, settings: { theme: 'dark' } },
    },
    allIds: [1],
  },
};

// Updates become simpler
const updateUserProfile = (userId, updates) => {
  setState({
    ...state,
    profiles: {
      ...state.profiles,
      byId: {
        ...state.profiles.byId,
        [userId]: {
          ...state.profiles.byId[userId],
          ...updates,
        },
      },
    },
  });
};
```

---

## 🎯 Best Practices

### 1. Choose the Right Tool

```javascript
// Simple state - useState with spread
const [user, setUser] = useState({ name: '', email: '' });
setUser(prev => ({ ...prev, name: 'John' }));

// Complex state - useReducer + Immer
const [state, dispatch] = useReducer(produce(reducer), initialState);

// Very complex - State management library (Redux, Zustand)
```

### 2. Avoid Deep Nesting

```javascript
// ❌ Avoid deep nesting
const badState = {
  app: {
    user: {
      profile: {
        settings: {
          preferences: {
            theme: 'dark',
          },
        },
      },
    },
  },
};

// ✅ Flatten structure
const goodState = {
  user: { id: 1, name: 'John' },
  userSettings: { userId: 1, theme: 'dark' },
  userPreferences: { userId: 1, notifications: true },
};
```

### 3. Custom Hooks for Complex Logic

```javascript
const useNestedState = initialState => {
  const [state, setState] = useState(initialState);

  const updateNested = useCallback((path, value) => {
    setState(prev =>
      produce(prev, draft => {
        const keys = path.split('.');
        let current = draft;
        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
      })
    );
  }, []);

  return [state, updateNested];
};

// Usage
const [state, updateNested] = useNestedState(complexInitialState);
updateNested('user.profile.settings.theme', 'light');
```

---

## 🎤 Interview Questions

### Q1: Explain the difference between shallow and deep copy

**Answer**:

- **Shallow copy** creates a new object but copies only the first level. Nested objects/arrays are still referenced.
- **Deep copy** recursively copies all levels, creating completely independent copies.
- In React, we typically use shallow copying with manual nested copying for performance.

### Q2: Why can't you mutate state directly in React?

**Answer**:

- React uses `Object.is()` comparison to detect changes
- Direct mutation keeps the same reference, so React thinks nothing changed
- No re-render occurs, leading to UI not updating
- Immutable updates ensure predictable state changes

### Q3: When would you use useReducer over useState?

**Answer**:

- Complex state with multiple sub-values
- State transitions depend on previous state
- Multiple actions that update state
- Need predictable state updates (like form validation)
- Better testing and debugging capabilities

### Q4: How do you handle deeply nested state updates?

**Answer**:

1. **Manual spreading** for simple cases
2. **Immer library** for complex nested updates
3. **State normalization** to avoid deep nesting
4. **useReducer** with action-based updates
5. **Custom hooks** to encapsulate update logic

### Q5: What are the performance implications of deep copying?

**Answer**:

- Deep copying is expensive for large objects
- Shallow copying + manual nested updates is more performant
- Immer uses structural sharing to optimize performance
- Consider memoization for expensive state calculations
- Profile your app to identify actual bottlenecks

---

This guide covers the essential state management patterns you'll encounter in React interviews and real-world development.
