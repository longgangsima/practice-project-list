# 🎯 浅拷贝(Shallow Copy) 完整指南

## 📋 什么是浅拷贝？

**浅拷贝**只拷贝对象的第一层属性：

- **基本类型**（string, number, boolean）→ 创建新的值 ✅
- **引用类型**（object, array）→ 只拷贝引用地址 ⚠️

## 🔍 核心概念图解

```
原对象                          浅拷贝
┌─────────────────┐            ┌─────────────────┐
│ name: "张三"     │            │ name: "张三"     │  ← 独立的值
│ age: 25         │            │ age: 25         │  ← 独立的值
│ hobbies: ───────┼──────────→ │ hobbies: ───────┼──┐
│ address: ───────┼──────────→ │ address: ───────┼──┼─→ 共享的对象
└─────────────────┘            └─────────────────┘  │
                                                   │
                  共享的数据 ←─────────────────────────┘
                  ["读书", "游泳"]
                  {city: "北京", district: "朝阳区"}
```

## 🚀 浅拷贝的语法方式

### 1. 对象浅拷贝

```javascript
const original = { name: '张三', hobbies: ['读书'] };

// 方法1: 展开运算符 (推荐) ⭐
const copy1 = { ...original };

// 方法2: Object.assign()
const copy2 = Object.assign({}, original);

// 方法3: 解构赋值
const { ...copy3 } = original;
```

### 2. 数组浅拷贝

```javascript
const arr = [1, 2, [3, 4]];

// 方法1: 展开运算符 (推荐) ⭐
const copy1 = [...arr];

// 方法2: Array.from()
const copy2 = Array.from(arr);

// 方法3: slice()
const copy3 = arr.slice();

// 方法4: concat()
const copy4 = [].concat(arr);
```

## 🔬 行为测试示例

```javascript
const person = {
  name: 'Alice', // 基本类型
  age: 25, // 基本类型
  hobbies: ['读书', '游泳'], // 引用类型
  address: {
    // 引用类型
    city: '北京',
  },
};

const copy = { ...person };

// ✅ 修改基本类型 - 不影响原对象
copy.name = 'Bob';
copy.age = 30;
console.log(person.name); // "Alice" (未改变)
console.log(copy.name); // "Bob"

// ⚠️ 修改引用类型 - 影响原对象
copy.hobbies.push('跑步');
copy.address.city = '上海';
console.log(person.hobbies); // ["读书", "游泳", "跑步"] (被改变!)
console.log(person.address.city); // "上海" (被改变!)
```

## 🎯 React 中的应用

### 为什么 React 使用浅拷贝？

1. **性能优化**: 浅拷贝比深拷贝快很多
2. **引用比较**: React 通过 `Object.is()` 比较引用来决定是否重新渲染
3. **不可变性**: 确保状态更新时创建新的对象引用

### 正确的 React 状态更新

```javascript
const [state, setState] = useState({
  count: 0,
  user: { name: 'Alice', age: 25 },
  todos: ['学习', '工作'],
});

// ❌ 错误 - 直接修改不会触发重新渲染
state.count = 1;
setState(state);

// ✅ 正确 - 浅拷贝第一层
setState({ ...state, count: 1 });

// ✅ 正确 - 更新嵌套对象需要多层拷贝
setState({
  ...state,
  user: { ...state.user, age: 26 },
});

// ✅ 正确 - 更新数组
setState({
  ...state,
  todos: [...state.todos, '新任务'],
});
```

## 🚨 常见陷阱与解决方案

### 陷阱 1: 以为浅拷贝就完全安全

```javascript
// ❌ 错误认知
const newState = { ...oldState };
newState.user.name = 'Bob'; // 还是会影响 oldState!

// ✅ 正确做法 - 嵌套拷贝
const newState = {
  ...oldState,
  user: { ...oldState.user, name: 'Bob' },
};
```

### 陷阱 2: 数组方法的混淆

```javascript
const arr = [1, 2, 3];

// ❌ 错误 - 这些方法修改原数组
arr.push(4); // 返回新长度，不是新数组
arr.pop(); // 返回被删除的元素
arr.sort(); // 返回原数组，但已被修改

// ✅ 正确 - 创建新数组
const newArr1 = [...arr, 4]; // 添加元素
const newArr2 = arr.slice(0, -1); // 删除最后一个
const newArr3 = [...arr].sort(); // 排序
```

### 陷阱 3: 嵌套对象的处理

```javascript
// 复杂的嵌套结构
const complexState = {
  user: {
    profile: { name: 'Alice', avatar: 'url' },
    settings: { theme: 'dark', notifications: true },
  },
  data: [
    { id: 1, items: ['a', 'b'] },
    { id: 2, items: ['c', 'd'] },
  ],
};

// ❌ 只拷贝第一层
const wrong = { ...complexState };
wrong.user.profile.name = 'Bob'; // 影响原对象

// ✅ 正确的深层更新
const correct = {
  ...complexState,
  user: {
    ...complexState.user,
    profile: {
      ...complexState.user.profile,
      name: 'Bob',
    },
  },
};
```

## 🛠️ 深拷贝方案

当需要完全独立的副本时：

```javascript
// 方法1: JSON (简单但有限制)
const deepCopy1 = JSON.parse(JSON.stringify(obj));
// 限制: 不能拷贝函数、undefined、Symbol、Date等

// 方法2: 第三方库
// npm install lodash
import { cloneDeep } from 'lodash';
const deepCopy2 = cloneDeep(obj);

// 方法3: 手动递归 (自定义需求)
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(deepClone);

  const cloned = {};
  Object.keys(obj).forEach(key => {
    cloned[key] = deepClone(obj[key]);
  });
  return cloned;
}
```

## 📚 实际项目中的最佳实践

1. **优先使用浅拷贝** - 性能更好
2. **按需深拷贝** - 只在必要时使用
3. **使用 Immer.js** - 简化不可变更新
4. **结构化状态** - 避免过深的嵌套

```javascript
// 使用 Immer.js 简化更新
import produce from 'immer';

const newState = produce(oldState, draft => {
  draft.user.profile.name = 'Bob'; // 看起来像直接修改，实际是不可变更新
  draft.todos.push('新任务');
});
```
