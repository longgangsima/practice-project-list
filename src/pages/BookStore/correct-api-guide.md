# 🎯 正确的 API 设计模式 - 基于真实面试题

## 📋 问题描述

**面试题要求:**

1. 调用两个 API 获取数据
2. 第一个 API 返回总数据，包含 task IDs 列表
3. 第二个 API 是单个 task API，需要把 ID append 到 URL 末尾调用
4. 某些 task ID 会返回 404，需要处理
5. 最终合并所有数据并处理

## ❌ 常见错误

### 1. 顺序调用导致超时

```javascript
// ❌ 错误做法 - 顺序调用会很慢
for (const taskId of taskIds) {
  const task = await fetchTaskById(taskId); // 一个一个等待
}
// 如果有10个task，每个500ms，总共需要5秒！
```

### 2. 忘记处理 404 错误

```javascript
// ❌ 错误做法 - 没有处理404
const tasks = await Promise.all(
  taskIds.map(id => fetchTaskById(id)) // 一个404就全部失败
);
```

### 3. 没有合理的并发限制

```javascript
// ❌ 可能有问题 - 无限制并发
const tasks = await Promise.all(
  taskIds.map(id => fetchTaskById(id)) // 100个并发请求可能被服务器拒绝
);
```

## ✅ 正确的解决方案

### 1. API 设计

```typescript
// API 1: 获取task IDs列表
interface TaskSummary {
  taskIds: string[]; // ["task_b1", "task_b2", "task_404_1"]
  totalTasks: number;
  description: string;
}

// API 2: 单个task详情 (ID append到URL)
// GET /api/tasks/task_b1
// GET /api/tasks/task_404_1  -> 404
interface TaskDetail {
  id: string;
  title: string;
  // ... other fields
}
```

### 2. 并发调用处理 404

```typescript
export const fetchAllTasksConcurrently = async () => {
  // 1. 获取task IDs
  const summaryResponse = await fetchTaskSummary();
  const taskIds = summaryResponse.data.taskIds;

  // 2. 并发调用，每个单独处理错误
  const taskPromises = taskIds.map(async taskId => {
    try {
      const response = await fetchTaskById(taskId);
      return { success: true, taskId, data: response.data };
    } catch (error) {
      // 单个404不影响其他请求
      return { success: false, taskId, error: error.message };
    }
  });

  // 3. 等待所有请求完成
  const results = await Promise.all(taskPromises);

  // 4. 分离成功和失败的结果
  const tasks = results.filter(r => r.success).map(r => r.data);

  const errors = results.filter(r => !r.success).map(r => `${r.taskId}: ${r.error}`);

  return { tasks, errors };
};
```

### 3. 带限制的并发（生产环境推荐）

```typescript
export const fetchAllTasksWithLimit = async (limit = 5) => {
  const summaryResponse = await fetchTaskSummary();
  const taskIds = summaryResponse.data.taskIds;
  const results = [];

  // 分批处理，每批最多5个并发
  for (let i = 0; i < taskIds.length; i += limit) {
    const batch = taskIds.slice(i, i + limit);

    const batchPromises = batch.map(async taskId => {
      try {
        const response = await fetchTaskById(taskId);
        return { success: true, taskId, data: response.data };
      } catch (error) {
        return { success: false, taskId, error: error.message };
      }
    });

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
  }

  return results;
};
```

## 📊 性能对比

| 方法        | 10 个任务耗时 | 优点               | 缺点             |
| ----------- | ------------- | ------------------ | ---------------- |
| 顺序调用    | ~5000ms       | 简单，服务器压力小 | 非常慢，容易超时 |
| 无限制并发  | ~500ms        | 最快               | 可能被服务器限制 |
| 限制并发(5) | ~1000ms       | 平衡速度和压力     | 稍微复杂         |

## 🎯 关键学习点

### 1. Promise.all vs 顺序 await

```javascript
// ❌ 顺序 - 慢
for (const id of ids) {
  await fetchTask(id); // 总时间 = 所有请求时间之和
}

// ✅ 并发 - 快
await Promise.all(
  ids.map(id => fetchTask(id)) // 总时间 ≈ 最慢的一个请求时间
);
```

### 2. 错误处理模式

```javascript
// ❌ 一个失败全部失败
const tasks = await Promise.all(ids.map(id => fetchTask(id)));

// ✅ 单独处理每个错误
const results = await Promise.all(
  ids.map(async id => {
    try {
      return { success: true, data: await fetchTask(id) };
    } catch (error) {
      return { success: false, error };
    }
  })
);
```

### 3. 数据合并和处理

```javascript
// 合并API数据
const tasksWithDetails = validTasks.map(task => ({
  ...task,
  author: authorsMap.get(task.authorId),
}));

// 分组处理
const grouped = tasksWithDetails.reduce((acc, task) => {
  const key = getGroupKey(task);
  if (!acc[key]) acc[key] = [];
  acc[key].push(task);
  return acc;
}, {});
```

## 🚀 实际应用技巧

1. **总是处理网络错误** - 单个 API 失败不应该影响整个流程
2. **合理控制并发数** - 避免服务器过载
3. **记录详细日志** - 帮助调试和监控
4. **设置超时时间** - 避免无限等待
5. **缓存策略** - 相同的 API 可以缓存结果

## 🧪 测试你的理解

在我们的 demo 中：

1. 打开浏览器控制台
2. 点击"运行性能比较"
3. 观察不同方法的耗时差异
4. 查看详细的 API 调用日志

这就是为什么在面试中，理解并发编程和错误处理如此重要！
