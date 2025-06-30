# 📚 Mock API BookStore - 完整实现指南

## 🎯 项目概述

这个项目实现了一个复杂的 API 数据获取和处理流程，模拟真实世界中常见的场景：

1. 从一个 API 获取书籍信息（包含作者 ID）
2. 从另一个 API 根据作者 ID 获取作者详细信息
3. 处理 404 错误（某些作者 ID 不存在）
4. 合并数据，过滤无效书籍
5. 按作者姓氏分组和排序

## 🏗️ 项目结构

```
BookStore/
├── api/
│   ├── books-data.json          # 书籍原始数据
│   ├── authors-data.json        # 作者原始数据
│   └── mockApi.ts              # Mock API 服务
├── component/
│   ├── BookCard.tsx            # 书籍展示卡片
│   ├── BookForm.tsx            # 添加书籍表单
│   └── ApiTestPage.tsx         # API测试页面
├── index.tsx                   # 主BookStore组件
├── data.json                   # 原始本地数据（已不使用）
├── example-concepts.js         # 概念演示代码
└── shallow-copy-guide.md       # 浅拷贝指南
```

## 🚀 使用方法

### 1. 查看 BookStore 页面

访问 `/book-store` 路由，页面会：

- 显示加载状态
- 自动调用 API 获取数据
- 显示 API 处理摘要
- 按作者姓氏分组展示书籍

### 2. 测试 API 功能

你可以在 BookStore 组件中添加 ApiTestPage 来测试各个 API：

```tsx
import ApiTestPage from './component/ApiTestPage';

// 在return中添加
<ApiTestPage />;
```

### 3. 查看控制台日志

打开浏览器开发者工具，查看详细的 API 调用日志，了解整个数据处理流程。

## 🔧 API 设计说明

### Books API (`fetchBooks`)

```typescript
// 返回所有书籍，但作者信息只有ID
{
  success: true,
  data: [
    {
      id: "b1",
      title: "A Tale of Two Cities",
      authorId: "a1",          // 只有ID，需要额外调用
      year: 1859,
      genre: "Historical Fiction"
    }
  ]
}
```

### Authors API (`fetchAuthor`)

```typescript
// 根据ID获取单个作者，可能404
{
  success: true,
  data: {
    id: "a1",
    name: "Charles Dickens",
    nationality: "British",
    birthYear: 1812
  }
}
```

### Batch Authors API (`fetchAuthors`)

```typescript
// 批量获取作者，返回成功和失败的信息
{
  success: true,
  data: [/* 成功的作者数据 */],
  errors: [
    { authorId: "a404", error: "Author a404 not found" }
  ]
}
```

### Complete Flow (`fetchBooksWithAuthors`)

```typescript
// 完整的数据获取和处理流程
{
  success: true,
  data: [/* 完整的书籍+作者信息 */],
  summary: {
    totalBooksFound: 11,
    validBooksAfterFilter: 9,    // 过滤掉404作者的书
    authorsFound: 9,
    authorErrors: 2,
    filteredOutBooks: 2
  }
}
```

## 🎭 模拟的真实场景

### 1. 网络延迟

每个 API 调用都有 500-1500ms 的随机延迟，模拟真实网络情况。

### 2. 404 错误

作者 ID 包含"404"的会返回 404 错误，模拟数据不完整的情况：

- `a404` → 404 错误
- `a404_2` → 404 错误

### 3. 数据处理复杂性

- 需要调用多个 API
- 需要合并数据
- 需要错误处理
- 需要数据转换和分组

## 🛠️ 核心功能实现

### 1. 错误处理和过滤

```typescript
// 过滤掉无法获取作者信息的书籍
const validBooks = books.filter(book => {
  const hasValidAuthor = authors.some(author => author.id === book.authorId);
  if (!hasValidAuthor) {
    console.log(`🚫 Filtering out book "${book.title}" - author ${book.authorId} not found`);
  }
  return hasValidAuthor;
});
```

### 2. 数据合并

```typescript
// 将书籍和作者信息合并
const booksWithAuthors = validBooks.map(book => {
  const author = authors.find(a => a.id === book.authorId);
  return {
    ...book,
    author: {
      id: author!.id,
      name: author!.name,
      nationality: author!.nationality,
      birthYear: author!.birthYear,
    },
  };
});
```

### 3. 分组和排序

```typescript
// 按作者姓氏首字母分组
const grouped = books.reduce(
  (acc, book) => {
    const lastName = book.author.name.split(' ').pop() || '';
    const firstLetter = lastName.charAt(0).toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(book);
    return acc;
  },
  {} as Record<string, BookWithAuthor[]>
);

// 组内按姓氏排序
Object.keys(grouped).forEach(letter => {
  grouped[letter].sort((a, b) => {
    const lastNameA = a.author.name.split(' ').pop() || '';
    const lastNameB = b.author.name.split(' ').pop() || '';
    return lastNameA.localeCompare(lastNameB);
  });
});
```

## 📊 UI 功能

### 1. 加载状态

- 显示加载动画
- 显示加载文本
- 旋转的加载图标

### 2. 错误处理

- 显示错误信息
- 提供重试按钮
- 优雅的错误 UI

### 3. 数据展示

- API 处理摘要
- 按组展示书籍
- 美观的书籍卡片
- 完整的作者信息

### 4. 交互功能

- 卡片悬停效果
- 响应式布局
- 详细的书籍信息展示

## 🧪 测试和调试

### 1. 使用 ApiTestPage

- 测试单个 API 调用
- 测试错误情况
- 测试完整流程

### 2. 控制台日志

每个步骤都有详细的日志输出，帮助理解数据处理流程。

### 3. 错误模拟

- 404 作者错误
- 网络延迟
- 数据合并复杂性

## 🚀 扩展可能性

1. **真实 API 集成** - 替换 mock 数据为真实 API
2. **缓存机制** - 添加作者信息缓存
3. **搜索功能** - 按书名、作者搜索
4. **排序选项** - 多种排序方式
5. **分页功能** - 处理大量数据
6. **添加书籍** - 实现 POST API 调用
7. **离线支持** - Service Worker 缓存

这个实现展示了现代前端应用中常见的复杂数据处理场景，是学习 React 状态管理、API 集成和错误处理的绝佳例子！
