// 📚 概念演示文件 - 理解 React 状态更新的核心概念

// ===== 🎯 浅拷贝 vs 深拷贝 详细解释 =====
console.log('=== 🎯 浅拷贝 vs 深拷贝 详细解释 ===');

// 📋 什么是浅拷贝？
/*
浅拷贝(Shallow Copy):
- 只拷贝对象的第一层属性
- 如果属性值是基本类型(string, number, boolean)，会创建新的值
- 如果属性值是引用类型(object, array)，只拷贝引用，不拷贝内容
- 多个对象共享同一个引用类型的内容
*/

// 🔍 基本数据类型 vs 引用数据类型
console.log('\n--- 数据类型对比 ---');

// 基本类型 - 值拷贝
let a = 5;
let b = a; // 拷贝值
b = 10;
console.log('基本类型 - a:', a, 'b:', b); // a: 5, b: 10 (互不影响)

// 引用类型 - 引用拷贝
let obj1 = { name: 'Alice' };
let obj2 = obj1; // 拷贝引用
obj2.name = 'Bob';
console.log('引用类型 - obj1:', obj1, 'obj2:', obj2); // 都变成 Bob

// 🚀 浅拷贝的多种语法方式
console.log('\n--- 浅拷贝的不同语法 ---');

const original = {
  name: '张三',
  age: 25,
  hobbies: ['读书', '游泳'],
  address: {
    city: '北京',
    district: '朝阳区',
  },
};

// 方法1: 展开运算符 (最常用) ⭐
const copy1 = { ...original };

// 方法2: Object.assign()
const _copy2 = Object.assign({}, original);

// 方法3: 数组的浅拷贝
const arrOriginal = [1, 2, [3, 4], { name: 'test' }];
const _arrCopy1 = [...arrOriginal]; // 展开运算符
const _arrCopy2 = Array.from(arrOriginal); // Array.from()
const _arrCopy3 = arrOriginal.slice(); // slice()

console.log('原始对象:', original);
console.log('拷贝对象:', copy1);

// 🔬 浅拷贝的行为测试
console.log('\n--- 浅拷贝行为测试 ---');

// 修改第一层属性 - 不会影响原对象 ✅
copy1.name = '李四';
copy1.age = 30;
console.log('修改基本类型后:');
console.log('原始:', original.name, original.age); // 张三, 25
console.log('拷贝:', copy1.name, copy1.age); // 李四, 30

// 修改引用类型 - 会影响原对象 ⚠️
copy1.hobbies.push('跑步');
copy1.address.city = '上海';
console.log('修改引用类型后:');
console.log('原始 hobbies:', original.hobbies); // ["读书", "游泳", "跑步"]
console.log('原始 address:', original.address); // {city: "上海", district: "朝阳区"}
console.log('拷贝 hobbies:', copy1.hobbies); // ["读书", "游泳", "跑步"]
console.log('拷贝 address:', copy1.address); // {city: "上海", district: "朝阳区"}

// 🎨 内存图解释
console.log('\n--- 内存结构解释 ---');
/*
浅拷贝的内存结构:

原始对象 original:          拷贝对象 copy1:
┌─────────────────┐         ┌─────────────────┐
│ name: "张三"     │         │ name: "李四"     │  ← 不同的值
│ age: 25         │         │ age: 30         │  ← 不同的值
│ hobbies: ───────┼────────→│ hobbies: ───────┼──┐ ← 指向同一个数组
│ address: ───────┼────────→│ address: ───────┼──┼─→ ┌─────────────┐
└─────────────────┘         └─────────────────┘  │   │ ["读书"...] │
                                                 └──→│ 共享的数组   │
                                                     └─────────────┘
*/

// 🛠️ 如何实现深拷贝？
console.log('\n--- 深拷贝方案 ---');

// 方法1: JSON.parse + JSON.stringify (简单但有限制)
const deepCopy1 = JSON.parse(JSON.stringify(original));

// 方法2: 手动递归拷贝
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));

  const cloned = {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}

const deepCopy2 = deepClone(original);

// 测试深拷贝
deepCopy1.hobbies.push('深拷贝测试1');
deepCopy2.address.city = '深圳';

console.log('深拷贝测试 - 原始对象不受影响:');
console.log('原始 hobbies:', original.hobbies);
console.log('原始 address:', original.address.city);

// 🎯 React中为什么要用浅拷贝？
console.log('\n--- React中的应用 ---');
/*
React使用浅拷贝的原因:
1. 性能: 浅拷贝比深拷贝快很多
2. 引用比较: React通过对象引用来判断是否需要重新渲染
3. 不可变性: 确保状态更新时创建新的对象引用

示例:
const [state, setState] = useState({ count: 0, data: [] });

// ❌ 错误 - 直接修改不会触发重新渲染
state.count = 1;
setState(state);

// ✅ 正确 - 浅拷贝创建新引用
setState({ ...state, count: 1 });

// ✅ 也正确 - 函数式更新
setState(prev => ({ ...prev, count: prev.count + 1 }));
*/

// 🚨 浅拷贝的常见陷阱
console.log('\n--- 常见陷阱 ---');

const userState = {
  profile: { name: '用户', avatar: 'url' },
  preferences: { theme: 'dark', language: 'zh' },
  data: [1, 2, 3],
};

// ❌ 陷阱1: 以为浅拷贝就安全了
const newState = { ...userState };
newState.profile.name = '新用户'; // 影响原对象！

// ✅ 正确: 需要拷贝嵌套对象
const _correctState = {
  ...userState,
  profile: { ...userState.profile, name: '新用户' },
};

// ❌ 陷阱2: 数组方法的混淆
const numbers = [1, 2, 3];
const newNumbers1 = numbers.push(4); // 返回长度,不是新数组
const newNumbers2 = [...numbers, 4]; // 正确的浅拷贝

console.log('数组陷阱:', newNumbers1, newNumbers2);

// ===== 1. 引用类型的演示 =====
console.log('=== 1. 引用类型演示 ===');
const originalData = {
  A: [{ title: 'Apple' }],
  B: [{ title: 'Banana' }],
};

const shelfA = originalData['A']; // 获取数组引用
shelfA.push({ title: 'Ant' }); // 直接修改

console.log('修改后的原始数据:', originalData);
// 结果: 'A' 数组被修改了！

// ===== 2. 展开运算符演示 =====
console.log('\n=== 2. 展开运算符演示 ===');
const books = {
  A: ['Apple', 'Ant'],
  B: ['Banana'],
};

// 浅拷贝
const newBooks = { ...books };
newBooks['C'] = ['Cat']; // 添加新属性

console.log('原始:', books); // 没有 'C'
console.log('拷贝:', newBooks); // 有 'C'

// 但是数组还是共享的
newBooks['A'].push('Airplane');
console.log('修改数组后，原始数据:', books['A']); // 也被修改了！

// ===== 3. Array.some() 演示 =====
console.log('\n=== 3. Array.some() 演示 ===');
const bookList = [
  { title: 'Apple', id: 1 },
  { title: 'Banana', id: 2 },
  { title: 'Cat', id: 3 },
];

// 检查是否存在 - 多种方法对比
const hasApple = bookList.some(book => book.title === 'Apple');
const hasDog = bookList.some(book => book.title === 'Dog');

console.log('有Apple吗?', hasApple); // true
console.log('有Dog吗?', hasDog); // false

// 🔍 其他数组方法的替代方案
console.log('\n=== 数组查找方法对比 ===');

// 方法1: find() - 返回找到的元素，没找到返回undefined
const foundApple = bookList.find(book => book.title === 'Apple');
const foundDog = bookList.find(book => book.title === 'Dog');

console.log('find Apple:', foundApple); // { title: 'Apple', id: 1 }
console.log('find Dog:', foundDog); // undefined

// 使用find检查存在性
const hasAppleByFind = bookList.find(book => book.title === 'Apple') !== undefined;
const hasDogByFind = !!bookList.find(book => book.title === 'Dog'); // 使用!!转换为boolean

console.log('用find检查Apple存在:', hasAppleByFind); // true
console.log('用find检查Dog存在:', hasDogByFind); // false

// 方法2: includes() - 检查数组是否包含某个值(适用于基本类型数组)
const titleList = bookList.map(book => book.title);
console.log('书名列表:', titleList); // ['Apple', 'Banana', 'Cat']

const hasAppleByIncludes = titleList.includes('Apple');
const hasDogByIncludes = titleList.includes('Dog');

console.log('用includes检查Apple:', hasAppleByIncludes); // true
console.log('用includes检查Dog:', hasDogByIncludes); // false

// 方法3: filter() - 返回所有匹配的元素
const appleBooks = bookList.filter(book => book.title === 'Apple');
const dogBooks = bookList.filter(book => book.title === 'Dog');

console.log('filter Apple结果:', appleBooks); // [{ title: 'Apple', id: 1 }]
console.log('filter Dog结果:', dogBooks); // []

// 使用filter检查存在性
const hasAppleByFilter = bookList.filter(book => book.title === 'Apple').length > 0;
const hasDogByFilter = bookList.filter(book => book.title === 'Dog').length > 0;

console.log('用filter检查Apple存在:', hasAppleByFilter); // true
console.log('用filter检查Dog存在:', hasDogByFilter); // false

// 方法4: findIndex() - 返回找到元素的索引，没找到返回-1
const appleIndex = bookList.findIndex(book => book.title === 'Apple');
const dogIndex = bookList.findIndex(book => book.title === 'Dog');

console.log('Apple的索引:', appleIndex); // 0
console.log('Dog的索引:', dogIndex); // -1

// 使用findIndex检查存在性
const hasAppleByIndex = bookList.findIndex(book => book.title === 'Apple') !== -1;
const hasDogByIndex = bookList.findIndex(book => book.title === 'Dog') !== -1;

console.log('用findIndex检查Apple存在:', hasAppleByIndex); // true
console.log('用findIndex检查Dog存在:', hasDogByIndex); // false

// 方法5: every() - 检查是否所有元素都满足条件
const allBooksHaveTitle = bookList.every(book => book.title && book.title.length > 0);
const allBooksAreApple = bookList.every(book => book.title === 'Apple');

console.log('所有书都有标题吗?', allBooksHaveTitle); // true
console.log('所有书都是Apple吗?', allBooksAreApple); // false

// 📊 性能和使用场景对比
console.log('\n=== 方法对比总结 ===');
console.log('some()     - 性能: ⚡ 快 | 用途: 检查是否存在 | 返回: boolean');
console.log('find()     - 性能: ⚡ 快 | 用途: 获取第一个匹配元素 | 返回: 元素或undefined');
console.log('filter()   - 性能: 🐌 慢 | 用途: 获取所有匹配元素 | 返回: 数组');
console.log('findIndex()- 性能: ⚡ 快 | 用途: 获取元素位置 | 返回: 索引或-1');
console.log('includes() - 性能: ⚡ 快 | 用途: 检查基本类型值 | 返回: boolean');
console.log('every()    - 性能: ⚡ 快 | 用途: 检查所有元素条件 | 返回: boolean');

// 🎯 实际应用建议
console.log('\n=== 实际应用建议 ===');
console.log('✅ 只需要知道是否存在 → 用 some()');
console.log('✅ 需要获取元素本身 → 用 find()');
console.log('✅ 需要获取元素位置 → 用 findIndex()');
console.log('✅ 需要获取所有匹配项 → 用 filter()');
console.log('✅ 检查基本类型数组 → 用 includes()');
console.log('✅ 检查所有元素条件 → 用 every()');

// 🔥 React中的常见用法
console.log('\n=== React中的常见用法 ===');

// 检查购物车中是否有某商品
const cartItems = [
  { id: 1, name: 'iPhone', price: 999 },
  { id: 2, name: 'MacBook', price: 1999 },
];

// ✅ 推荐: 使用some检查存在性
const hasIPhone = cartItems.some(item => item.name === 'iPhone');
console.log('购物车有iPhone吗?', hasIPhone);

// ✅ 推荐: 使用find获取具体商品
const iPhone = cartItems.find(item => item.name === 'iPhone');
console.log('iPhone商品信息:', iPhone);

// ✅ 推荐: 使用filter获取价格范围商品
const expensiveItems = cartItems.filter(item => item.price > 1500);
console.log('昂贵商品:', expensiveItems);

// ===== 4. 函数式状态更新演示 =====
console.log('\n=== 4. 函数式状态更新演示 ===');

// 模拟 React 的 setState
function mockSetState(updateFunction) {
  const currentState = { count: 5, items: ['a', 'b'] };

  console.log('当前状态:', currentState);

  // 调用更新函数
  const newState = updateFunction(currentState);

  console.log('新状态:', newState);
  console.log('返回值类型:', typeof newState);

  return newState;
}

// 正确的用法 - 有return
mockSetState(prevState => {
  const newState = { ...prevState };
  newState.count += 1;
  return newState; // 必须返回新状态
});

// 错误的用法 - 没有return
const result = mockSetState(prevState => {
  const newState = { ...prevState };
  newState.count += 1;
  // 忘记 return - 返回 undefined
});

console.log('忘记return的结果:', result);
