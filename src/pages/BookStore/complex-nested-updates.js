// 🏗️ 复杂嵌套结构的不可变更新 - 完整指南

// ===== 🎯 问题场景：复杂的4层嵌套结构 =====
console.log('=== 复杂嵌套结构更新演示 ===');

// 📚 假设我们有一个复杂的书店数据结构：
// Level 1: 书店分店 (stores)
// Level 2: 书籍类别 (categories)
// Level 3: 字母分组 (letterGroups)
// Level 4: 具体书籍 (books)

const complexBookStore = {
  stores: {
    downtown: {
      name: '市中心店',
      categories: {
        fiction: {
          name: '小说类',
          letterGroups: {
            A: {
              count: 2,
              books: [
                { id: 'a1', title: 'Animal Farm', author: 'George Orwell', stock: 5 },
                { id: 'a2', title: 'Alice in Wonderland', author: 'Lewis Carroll', stock: 3 },
              ],
            },
            B: {
              count: 1,
              books: [{ id: 'b1', title: 'Brave New World', author: 'Aldous Huxley', stock: 2 }],
            },
          },
        },
        technical: {
          name: '技术类',
          letterGroups: {
            J: {
              count: 1,
              books: [{ id: 'j1', title: 'JavaScript Guide', author: 'MDN', stock: 10 }],
            },
          },
        },
      },
    },
    suburban: {
      name: '郊区店',
      categories: {
        fiction: {
          name: '小说类',
          letterGroups: {
            C: {
              count: 1,
              books: [{ id: 'c1', title: 'Crime and Punishment', author: 'Dostoevsky', stock: 1 }],
            },
          },
        },
      },
    },
  },
};

console.log('初始复杂结构:', JSON.stringify(complexBookStore, null, 2));

// ===== ❌ 错误的更新方式 =====
console.log('\n=== 错误的更新方式 ===');

function addBookWrongWay(store, category, letter, newBook) {
  // ❌ 只做了第一层浅拷贝，深层还是共享引用
  const newState = { ...store };

  // 这样修改会影响原始数据！
  newState.stores.downtown.categories.fiction.letterGroups.A.books.push(newBook);

  return newState;
}

// 测试错误方式
const wrongResult = addBookWrongWay(complexBookStore, 'fiction', 'A', {
  id: 'a3',
  title: 'Another Book',
  author: 'Test Author',
  stock: 1,
});

console.log('错误方式：原始数据被污染了！');
console.log('原始A组书籍数量:', complexBookStore.stores.downtown.categories.fiction.letterGroups.A.books.length);

// ===== ✅ 正确的更新方式 =====
console.log('\n=== 正确的更新方式 ===');

// 方法1: 手动深层拷贝 (繁琐但完全可控)
function addBookCorrectWay1(store, storeName, categoryName, letter, newBook) {
  return {
    ...store,
    stores: {
      ...store.stores,
      [storeName]: {
        ...store.stores[storeName],
        categories: {
          ...store.stores[storeName].categories,
          [categoryName]: {
            ...store.stores[storeName].categories[categoryName],
            letterGroups: {
              ...store.stores[storeName].categories[categoryName].letterGroups,
              [letter]: {
                ...store.stores[storeName].categories[categoryName].letterGroups[letter],
                count: store.stores[storeName].categories[categoryName].letterGroups[letter].count + 1,
                books: [...store.stores[storeName].categories[categoryName].letterGroups[letter].books, newBook],
              },
            },
          },
        },
      },
    },
  };
}

// 方法2: 使用helper函数简化
function updateNestedProperty(obj, path, updateFn) {
  const [head, ...tail] = path;

  if (tail.length === 0) {
    return {
      ...obj,
      [head]: updateFn(obj[head]),
    };
  }

  return {
    ...obj,
    [head]: updateNestedProperty(obj[head], tail, updateFn),
  };
}

function addBookCorrectWay2(store, storeName, categoryName, letter, newBook) {
  return updateNestedProperty(store, ['stores', storeName, 'categories', categoryName, 'letterGroups', letter], letterGroup => ({
    ...letterGroup,
    count: letterGroup.count + 1,
    books: [...letterGroup.books, newBook],
  }));
}

// 方法3: 使用Immer库 (推荐生产环境)
// npm install immer
// import produce from 'immer';

function addBookWithImmer(store, storeName, categoryName, letter, newBook) {
  // 注意：这里模拟Immer的produce函数
  // 实际使用时需要: return produce(store, draft => { ... })
  console.log('📝 使用Immer库的伪代码:');
  console.log(`
  return produce(store, draft => {
    draft.stores.${storeName}.categories.${categoryName}.letterGroups.${letter}.books.push(newBook);
    draft.stores.${storeName}.categories.${categoryName}.letterGroups.${letter}.count += 1;
  });
  `);

  // 这里返回手动方式的结果作为演示
  return addBookCorrectWay1(store, storeName, categoryName, letter, newBook);
}

// 方法4: 使用JSON深拷贝 (简单但性能差)
function addBookWithJSONClone(store, storeName, categoryName, letter, newBook) {
  // ⚠️ 注意：这种方法会丢失函数、undefined、Symbol等
  const deepClone = JSON.parse(JSON.stringify(store));

  deepClone.stores[storeName].categories[categoryName].letterGroups[letter].books.push(newBook);
  deepClone.stores[storeName].categories[categoryName].letterGroups[letter].count += 1;

  return deepClone;
}

// 方法5: 递归深拷贝函数
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));

  const cloned = {};
  Object.keys(obj).forEach(key => {
    cloned[key] = deepClone(obj[key]);
  });
  return cloned;
}

function addBookWithDeepClone(store, storeName, categoryName, letter, newBook) {
  const cloned = deepClone(store);

  cloned.stores[storeName].categories[categoryName].letterGroups[letter].books.push(newBook);
  cloned.stores[storeName].categories[categoryName].letterGroups[letter].count += 1;

  return cloned;
}

// ===== 🧪 测试所有方法 =====
console.log('\n=== 测试所有方法 ===');

const testBook = { id: 'a3', title: 'Atlas Shrugged', author: 'Ayn Rand', stock: 4 };

// 保存原始数据用于对比
const originalCount = complexBookStore.stores.downtown.categories.fiction.letterGroups.A.books.length;

console.log('原始A组书籍数量:', originalCount);

// 测试方法1: 手动深层拷贝
const result1 = addBookCorrectWay1(complexBookStore, 'downtown', 'fiction', 'A', testBook);
console.log('方法1结果 - A组书籍数量:', result1.stores.downtown.categories.fiction.letterGroups.A.books.length);
console.log('原始数据是否被改变:', complexBookStore.stores.downtown.categories.fiction.letterGroups.A.books.length === originalCount);

// 测试方法2: Helper函数
const result2 = addBookCorrectWay2(complexBookStore, 'downtown', 'fiction', 'A', testBook);
console.log('方法2结果 - A组书籍数量:', result2.stores.downtown.categories.fiction.letterGroups.A.books.length);

// 测试方法3: Immer (模拟)
const result3 = addBookWithImmer(complexBookStore, 'downtown', 'fiction', 'A', testBook);
console.log('方法3结果 - A组书籍数量:', result3.stores.downtown.categories.fiction.letterGroups.A.books.length);

// 测试方法4: JSON深拷贝
const result4 = addBookWithJSONClone(complexBookStore, 'downtown', 'fiction', 'A', testBook);
console.log('方法4结果 - A组书籍数量:', result4.stores.downtown.categories.fiction.letterGroups.A.books.length);

// 测试方法5: 递归深拷贝
const result5 = addBookWithDeepClone(complexBookStore, 'downtown', 'fiction', 'A', testBook);
console.log('方法5结果 - A组书籍数量:', result5.stores.downtown.categories.fiction.letterGroups.A.books.length);

// ===== 📊 性能和复杂度对比 =====
console.log('\n=== 方法对比总结 ===');

const comparison = [
  {
    method: '手动深层拷贝',
    performance: '⚡ 快',
    complexity: '🔥 高',
    safety: '✅ 安全',
    readability: '❌ 差',
    recommendation: '小项目可用',
  },
  {
    method: 'Helper函数',
    performance: '⚡ 快',
    complexity: '🔥 中',
    safety: '✅ 安全',
    readability: '⚡ 好',
    recommendation: '中等项目推荐',
  },
  {
    method: 'Immer库',
    performance: '⚡ 中',
    complexity: '✅ 低',
    safety: '✅ 安全',
    readability: '⚡ 极好',
    recommendation: '大项目强烈推荐',
  },
  {
    method: 'JSON深拷贝',
    performance: '🐌 慢',
    complexity: '✅ 低',
    safety: '⚠️ 有限制',
    readability: '⚡ 好',
    recommendation: '仅简单数据可用',
  },
  {
    method: '递归深拷贝',
    performance: '🐌 慢',
    complexity: '🔥 中',
    safety: '✅ 安全',
    readability: '⚡ 好',
    recommendation: '性能要求不高时可用',
  },
];

comparison.forEach(item => {
  console.log(`${item.method}:`);
  console.log(`  性能: ${item.performance} | 复杂度: ${item.complexity} | 安全性: ${item.safety}`);
  console.log(`  可读性: ${item.readability} | 推荐: ${item.recommendation}`);
  console.log('');
});

// ===== 🎯 React中的实际应用 =====
console.log('=== React中的实际应用建议 ===');

console.log(`
// ✅ 推荐：使用Immer库
import produce from 'immer';

const handleAddBook = (book) => {
  setComplexBookStore(prevStore => 
    produce(prevStore, draft => {
      const letterGroup = draft.stores.downtown.categories.fiction.letterGroups.A;
      letterGroup.books.push(book);
      letterGroup.count += 1;
    })
  );
};

// ✅ 备选：使用专门的helper函数
const updateNestedState = (state, path, updateFn) => {
  // ... helper函数实现
};

const handleAddBook = (book) => {
  setComplexBookStore(prevStore => 
    updateNestedState(
      prevStore, 
      ['stores', 'downtown', 'categories', 'fiction', 'letterGroups', 'A'],
      letterGroup => ({
        ...letterGroup,
        books: [...letterGroup.books, book],
        count: letterGroup.count + 1
      })
    )
  );
};

// ❌ 避免：手动写深层展开（容易出错）
const handleAddBook = (book) => {
  setComplexBookStore(prevStore => ({
    ...prevStore,
    stores: {
      ...prevStore.stores,
      downtown: {
        ...prevStore.stores.downtown,
        categories: {
          ...prevStore.stores.downtown.categories,
          fiction: {
            ...prevStore.stores.downtown.categories.fiction,
            letterGroups: {
              ...prevStore.stores.downtown.categories.fiction.letterGroups,
              A: {
                ...prevStore.stores.downtown.categories.fiction.letterGroups.A,
                books: [...prevStore.stores.downtown.categories.fiction.letterGroups.A.books, book],
                count: prevStore.stores.downtown.categories.fiction.letterGroups.A.count + 1
              }
            }
          }
        }
      }
    }
  }));
};
`);

console.log('🎯 关键要点:');
console.log('1. 复杂嵌套结构需要深层不可变更新');
console.log('2. Immer库是处理复杂状态的最佳选择');
console.log('3. 手动深层展开容易出错，不推荐');
console.log('4. 性能敏感场景可以使用helper函数');
console.log('5. 简单数据可以考虑JSON深拷贝');
