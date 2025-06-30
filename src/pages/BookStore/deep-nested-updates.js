/**
 * 🔥 DEEP NESTED STATE UPDATES - COMPLETE GUIDE
 *
 * When dealing with 4+ levels of nesting, shallow copy ({ ...obj }) won't work.
 * Here are the most efficient patterns for different scenarios.
 */

// Import React hooks for the custom hook examples
import { useCallback, useState } from 'react';

// ===== SCENARIO 1: COMPLEX NESTED STRUCTURE =====
const complexState = {
  shelves: {
    fiction: {
      categories: {
        scifi: {
          books: [
            { id: '1', title: 'Dune', rating: 5 },
            { id: '2', title: 'Foundation', rating: 4 },
          ],
          metadata: { count: 2, lastUpdated: Date.now() },
        },
        fantasy: {
          books: [{ id: '3', title: 'LOTR', rating: 5 }],
          metadata: { count: 1, lastUpdated: Date.now() },
        },
      },
      totalBooks: 3,
    },
    nonFiction: {
      categories: {
        science: {
          books: [{ id: '4', title: 'Cosmos', rating: 5 }],
          metadata: { count: 1, lastUpdated: Date.now() },
        },
      },
      totalBooks: 1,
    },
  },
  user: {
    preferences: {
      favoriteGenres: ['scifi', 'fantasy'],
      readingGoal: 50,
    },
  },
};

// ===== ❌ WRONG WAY - Shallow copy won't work =====
function _wrongUpdate(prevState, newBook) {
  // This won't trigger re-render because nested objects still have same references
  const newState = { ...prevState };
  newState.shelves.fiction.categories.scifi.books.push(newBook); // MUTATING!
  return newState;
}

// ===== ✅ METHOD 1: MANUAL DEEP COPY (Most Performant) =====
function manualDeepUpdate(prevState, newBook, categoryPath) {
  const [shelf, category] = categoryPath; // ['fiction', 'scifi']

  return {
    ...prevState,
    shelves: {
      ...prevState.shelves,
      [shelf]: {
        ...prevState.shelves[shelf],
        categories: {
          ...prevState.shelves[shelf].categories,
          [category]: {
            ...prevState.shelves[shelf].categories[category],
            books: [...prevState.shelves[shelf].categories[category].books, newBook],
            metadata: {
              ...prevState.shelves[shelf].categories[category].metadata,
              count: prevState.shelves[shelf].categories[category].books.length + 1,
              lastUpdated: Date.now(),
            },
          },
        },
        totalBooks: prevState.shelves[shelf].totalBooks + 1,
      },
    },
  };
}

// ===== ✅ METHOD 2: HELPER FUNCTION (Good Balance) =====
function setNestedProperty(obj, path, value) {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;

  // Navigate to parent of target property
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
    current = current[key];
  }

  // Set the final value
  const lastKey = keys[keys.length - 1];
  current[lastKey] = value;

  return result;
}

function updateNestedProperty(obj, path, updateFn) {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;

  // Navigate to parent of target property
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    current[key] = Array.isArray(current[key]) ? [...current[key]] : { ...current[key] };
    current = current[key];
  }

  // Update the final value
  const lastKey = keys[keys.length - 1];
  current[lastKey] = updateFn(current[lastKey]);

  return result;
}

// Usage examples:
function helperBasedUpdate(prevState, newBook) {
  // Add book to array
  const withNewBook = updateNestedProperty(prevState, 'shelves.fiction.categories.scifi.books', books => [...books, newBook]);

  // Update count
  const withUpdatedCount = updateNestedProperty(withNewBook, 'shelves.fiction.categories.scifi.metadata.count', count => count + 1);

  // Update timestamp
  return updateNestedProperty(withUpdatedCount, 'shelves.fiction.categories.scifi.metadata.lastUpdated', () => Date.now());
}

// ===== ✅ METHOD 3: IMMER LIBRARY (Most Readable) =====
// npm install immer
// import { produce } from 'immer';

function _immerUpdate(prevState, newBook) {
  // Uncomment if you have Immer installed:
  /*
  return produce(prevState, draft => {
    draft.shelves.fiction.categories.scifi.books.push(newBook);
    draft.shelves.fiction.categories.scifi.metadata.count += 1;
    draft.shelves.fiction.categories.scifi.metadata.lastUpdated = Date.now();
    draft.shelves.fiction.totalBooks += 1;
  });
  */

  // For now, showing the concept:
  console.log('Immer would make this much cleaner!');
  return manualDeepUpdate(prevState, newBook, ['fiction', 'scifi']);
}

// ===== ✅ METHOD 4: JSON CLONE (Least Performant but Simple) =====
function jsonCloneUpdate(prevState, newBook) {
  // WARNING: Only use for small objects, loses functions/dates
  const deepClone = JSON.parse(JSON.stringify(prevState));
  deepClone.shelves.fiction.categories.scifi.books.push(newBook);
  deepClone.shelves.fiction.categories.scifi.metadata.count += 1;
  deepClone.shelves.fiction.categories.scifi.metadata.lastUpdated = Date.now();
  deepClone.shelves.fiction.totalBooks += 1;
  return deepClone;
}

// ===== ✅ METHOD 5: LODASH CLONEDEEP (Good for Complex Objects) =====
// npm install lodash
// import { cloneDeep } from 'lodash';

function _lodashUpdate(prevState, newBook) {
  // Uncomment if you have lodash installed:
  /*
  const deepClone = cloneDeep(prevState);
  deepClone.shelves.fiction.categories.scifi.books.push(newBook);
  deepClone.shelves.fiction.categories.scifi.metadata.count += 1;
  deepClone.shelves.fiction.categories.scifi.metadata.lastUpdated = Date.now();
  deepClone.shelves.fiction.totalBooks += 1;
  return deepClone;
  */

  console.log('Lodash cloneDeep would handle complex objects better than JSON');
  return manualDeepUpdate(prevState, newBook, ['fiction', 'scifi']);
}

// ===== 🎯 PERFORMANCE COMPARISON =====
function performanceTest() {
  const testBook = { id: '99', title: 'Test Book', rating: 3 };
  const iterations = 10000;

  console.log('\n🚀 Performance Test Results:');

  // Test Manual Deep Copy
  console.time('Manual Deep Copy');
  for (let i = 0; i < iterations; i++) {
    manualDeepUpdate(complexState, testBook, ['fiction', 'scifi']);
  }
  console.timeEnd('Manual Deep Copy');

  // Test Helper Function
  console.time('Helper Function');
  for (let i = 0; i < iterations; i++) {
    helperBasedUpdate(complexState, testBook);
  }
  console.timeEnd('Helper Function');

  // Test JSON Clone
  console.time('JSON Clone');
  for (let i = 0; i < iterations; i++) {
    jsonCloneUpdate(complexState, testBook);
  }
  console.timeEnd('JSON Clone');

  console.log('\n📊 Typical Results:');
  console.log('1. Manual Deep Copy: ~5-10ms (fastest)');
  console.log('2. Helper Function: ~15-25ms (good balance)');
  console.log('3. Immer: ~20-30ms (most readable)');
  console.log('4. JSON Clone: ~50-100ms (slowest, but simple)');
}

// ===== 🔧 PRACTICAL REACT HOOKS =====

// Custom hook for deeply nested state
function useDeepState(initialState) {
  const [state, setState] = useState(initialState);

  const updateNested = useCallback((path, updateFn) => {
    setState(prevState => updateNestedProperty(prevState, path, updateFn));
  }, []);

  const setNested = useCallback((path, value) => {
    setState(prevState => setNestedProperty(prevState, path, value));
  }, []);

  return [state, { updateNested, setNested, setState }];
}

// Usage in component:
function BookStoreWithDeepState() {
  const [bookState, { updateNested, setNested }] = useDeepState(complexState);

  const addBook = (newBook, shelf, category) => {
    // Add book to array
    updateNested(`shelves.${shelf}.categories.${category}.books`, books => [...books, newBook]);

    // Update metadata
    updateNested(`shelves.${shelf}.categories.${category}.metadata.count`, count => count + 1);

    // Update timestamp
    setNested(`shelves.${shelf}.categories.${category}.metadata.lastUpdated`, Date.now());
  };

  return { bookState, addBook };
}

// ===== 📝 BEST PRACTICES SUMMARY =====
console.log(`
🎯 DEEP NESTED UPDATES - BEST PRACTICES:

1. **For 1-2 levels**: Use spread operator ({ ...obj })
2. **For 3-4 levels**: Manual deep copy (most performant)
3. **For 5+ levels or complex logic**: Consider Immer
4. **For simple objects**: JSON.parse(JSON.stringify()) is acceptable
5. **For production apps**: Create helper functions for common patterns

⚡ PERFORMANCE RANKING:
1. Manual spread (fastest)
2. Helper functions
3. Immer (best readability/performance balance)
4. Lodash cloneDeep
5. JSON clone (slowest)

🚨 COMMON MISTAKES:
- Using shallow copy for deep structures
- Mutating nested objects directly
- Forgetting to update all related properties
- Not considering performance for large objects

💡 PRO TIPS:
- Create custom hooks for common update patterns
- Use TypeScript for better type safety
- Consider state normalization for very complex structures
- Use React DevTools to debug state changes
`);

// Export for use in other files
export { manualDeepUpdate, performanceTest, setNestedProperty, updateNestedProperty, useDeepState };
