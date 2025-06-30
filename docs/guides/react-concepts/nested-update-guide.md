# 🏗️ 复杂嵌套结构的不可变更新策略

## 📋 问题场景

当数据结构有多层嵌套时，简单的 `{ ...prevState }` 浅拷贝不够用：

```javascript
// ❌ 问题：4层嵌套结构
const complexStructure = {
  stores: {                    // Level 1
    downtown: {
      categories: {            // Level 2
        fiction: {
          letterGroups: {      // Level 3
            A: {
              books: [...]     // Level 4
            }
          }
        }
      }
    }
  }
};

// ❌ 浅拷贝只能复制第一层
const newState = { ...complexStructure };
newState.stores.downtown.categories.fiction.letterGroups.A.books.push(newBook);
// 原始数据被污染！
```

## 🎯 解决方案对比

### 1. ❌ 错误方式：只做浅拷贝

```javascript
const handleAddBook = book => {
  setState(prev => {
    const newState = { ...prev }; // 只拷贝第一层
    newState.stores.downtown.categories.fiction.letterGroups.A.books.push(book);
    return newState; // 原始数据被修改！
  });
};
```

### 2. ✅ 正确方式 1：手动深层拷贝

```javascript
const handleAddBook = book => {
  setState(prev => ({
    ...prev,
    stores: {
      ...prev.stores,
      downtown: {
        ...prev.stores.downtown,
        categories: {
          ...prev.stores.downtown.categories,
          fiction: {
            ...prev.stores.downtown.categories.fiction,
            letterGroups: {
              ...prev.stores.downtown.categories.fiction.letterGroups,
              A: {
                ...prev.stores.downtown.categories.fiction.letterGroups.A,
                books: [...prev.stores.downtown.categories.fiction.letterGroups.A.books, book],
              },
            },
          },
        },
      },
    },
  }));
};
```

**优点**: 完全可控，性能好  
**缺点**: 代码冗长，容易出错

### 3. ✅ 正确方式 2：使用 Helper 函数

```javascript
const updateNestedProperty = (obj, path, updateFn) => {
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
};

const handleAddBook = book => {
  setState(prev =>
    updateNestedProperty(
      prev,
      ['stores', 'downtown', 'categories', 'fiction', 'letterGroups', 'A'],
      letterGroup => ({
        ...letterGroup,
        books: [...letterGroup.books, book],
      })
    )
  );
};
```

**优点**: 可复用，相对简洁  
**缺点**: 需要额外的工具函数

### 4. ✅ 正确方式 3：使用 Immer 库（推荐）

```bash
npm install immer
```

```javascript
import produce from 'immer';

const handleAddBook = book => {
  setState(prev =>
    produce(prev, draft => {
      draft.stores.downtown.categories.fiction.letterGroups.A.books.push(book);
    })
  );
};
```

**优点**: 代码简洁，易读，不易出错  
**缺点**: 额外的依赖，略微的性能开销

### 5. ✅ 正确方式 4：JSON 深拷贝（适用于简单数据）

```javascript
const handleAddBook = book => {
  setState(prev => {
    const deepClone = JSON.parse(JSON.stringify(prev));
    deepClone.stores.downtown.categories.fiction.letterGroups.A.books.push(book);
    return deepClone;
  });
};
```

**优点**: 简单易懂  
**缺点**: 性能差，不支持函数、Date 等特殊对象

## 📊 方法选择指南

| 场景               | 推荐方法     | 理由                 |
| ------------------ | ------------ | -------------------- |
| 小项目，简单嵌套   | 手动深层拷贝 | 无额外依赖，代码清晰 |
| 中等项目，复杂嵌套 | Helper 函数  | 平衡复杂度和性能     |
| 大项目，频繁更新   | Immer 库     | 代码简洁，维护性好   |
| 原型开发，简单数据 | JSON 深拷贝  | 快速实现             |

## 🎯 实际应用：BookStore 示例

在我们的 BookStore 项目中，处理添加书籍到嵌套结构：

```javascript
const handleAddBook = book => {
  setBookList(prevBookList => {
    const firstLetter = book.title.charAt(0).toUpperCase();

    // 方法1: 当前结构比较简单，使用手动拷贝
    const newBookList = { ...prevBookList };

    if (!newBookList[firstLetter]) {
      newBookList[firstLetter] = [];
    }

    // 重要：为数组也创建新引用
    const letterGroup = [...newBookList[firstLetter]];

    // 检查重复
    const exists = letterGroup.find(b => b.title === book.title);
    if (exists) {
      alert('Book already exists!');
      return prevBookList; // 不更新
    }

    // 添加新书
    letterGroup.push({
      ...book,
      id: `manual_${Date.now()}`,
      genre: 'Manual Entry',
      author: {
        /* 默认作者信息 */
      },
    });

    // 排序
    letterGroup.sort((a, b) => a.title.localeCompare(b.title));

    // 更新状态
    newBookList[firstLetter] = letterGroup;

    return newBookList;
  });
};
```

## 🔑 关键要点

### 1. 数组也需要创建新引用

```javascript
// ❌ 错误
const newState = { ...prevState };
newState.items.push(newItem); // 修改了原数组！

// ✅ 正确
const newState = { ...prevState };
newState.items = [...prevState.items, newItem];
```

### 2. 检查操作结果

```javascript
const exists = items.find(item => item.id === newItem.id);
if (exists) {
  return prevState; // 不更新状态
}
```

### 3. 深层更新的层级规律

```javascript
// 需要更新第N层，就要拷贝前N层
// 第1层: { ...obj }
// 第2层: { ...obj, level1: { ...obj.level1 } }
// 第3层: { ...obj, level1: { ...obj.level1, level2: { ...obj.level1.level2 } } }
```

### 4. 性能考虑

- 浅拷贝：O(1) - 最快
- 深拷贝：O(n) - 与数据大小成正比
- Immer：介于两者之间，但开发效率最高

## 🚀 推荐实践

1. **小项目**: 手动深层拷贝，理解原理
2. **中大项目**: 使用 Immer 库，提高开发效率
3. **性能敏感**: 分析具体场景，选择合适方法
4. **团队开发**: 统一使用 Immer，减少错误

记住：不可变更新的核心是创建新的对象引用，让 React 能够检测到变化并重新渲染！
