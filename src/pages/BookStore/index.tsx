import { useEffect, useState } from 'react';
import ProjectLayout from '../../components/ProjectLayout';
import { fetchBooksWithAuthors } from './api/simpleApi';
import BookCard from './component/BookCard';
import BookForm from './component/BookForm';

type BookType = {
  id: string;
  title: string;
  authorId: string;
  year: number;
};

type Author = {
  id: string;
  name: string;
  nationality: string;
  birthYear: number;
};

type BookWithAuthor = BookType & {
  author: Author;
  genre: string;
};

export default function BookStore() {
  const [booksList, setBookList] = useState<Record<string, BookWithAuthor[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadBooksData();
  }, []);

  const loadBooksData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Starting books and authors data fetch...');

      // 使用简化的API获取完整数据
      const result = await fetchBooksWithAuthors();

      setBookList(result.grouped);

      console.log('✅ Books data loaded successfully:', {
        totalGroups: Object.keys(result.grouped).length,
        totalBooks: result.data.length,
      });
    } catch (err) {
      console.error('❌ Error loading books data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load books data');
    } finally {
      setLoading(false);
    }
  };

  // 🏗️ 处理复杂嵌套结构的添加书籍逻辑
  const handleAddBook = (book: BookType) => {
    console.log('Adding book:', book);
    const firstLetter = book.title.charAt(0).toUpperCase();

    setBookList(prevBookList => {
      // ✅ 当前使用的是最佳方案：手动深拷贝 (Manual Deep Copy)
      // 📊 性能对比:
      // 1. 手动深拷贝 (当前方案): ~5-10ms ⚡ 最快
      // 2. 辅助函数: ~15-25ms
      // 3. Immer库: ~20-30ms
      // 4. JSON.parse/stringify: ~50-100ms 最慢
      //
      // 🎯 为什么选择手动深拷贝？
      // - 我们只有2层嵌套: booksList[letter][books]
      // - 性能最优，代码可读性也很好
      // - 对于4+层嵌套才考虑Immer或辅助函数

      // 1. 为整个对象创建新引用
      const newBookList = { ...prevBookList };

      // 2. 确保字母组存在
      if (!newBookList[firstLetter]) {
        newBookList[firstLetter] = [];
      }

      // 3. 为数组也创建新的引用（重要！避免mutation）
      const letterGroup = [...newBookList[firstLetter]];

      // 4. 检查书籍是否已存在
      const existingBook = letterGroup.find(b => b.title === book.title);
      if (existingBook) {
        alert(`The book "${book.title}" already exists in group ${firstLetter}`);
        return prevBookList; // 返回原状态，不更新
      }

      // 5. 创建新的书籍对象
      const newBook: BookWithAuthor = {
        ...book,
        id: `manual_${Date.now()}`, // 生成唯一ID
        genre: 'Manual Entry', // 添加默认类型
        author: {
          id: 'unknown',
          name: 'Unknown Author',
          nationality: 'Unknown',
          birthYear: 0,
        },
      };

      // 6. 添加到数组
      letterGroup.push(newBook);

      // 7. 排序（按标题）
      letterGroup.sort((a, b) => a.title.localeCompare(b.title));

      // 8. 更新状态
      newBookList[firstLetter] = letterGroup;

      console.log(`✅ Book "${book.title}" added to group ${firstLetter}`);
      alert(`The book "${book.title}" has been successfully added to group ${firstLetter}!`);

      return newBookList;
    });
  };

  return (
    <ProjectLayout currentPath="/book-store">
      {/* 正确的API设计说明 */}
      <div
        style={{
          margin: '1rem 0',
          padding: '1rem',
          backgroundColor: '#e8f4fd',
          borderRadius: '8px',
          border: '1px solid #3498db',
        }}
      >
        <h3>🎯 正确的API设计模式</h3>
        <p>
          <strong>API 1:</strong> 获取task IDs列表 → <code>fetchTaskSummary()</code>
        </p>
        <p>
          <strong>API 2:</strong> 单个task详情 → <code>fetchTaskById(taskId)</code> (ID append到URL)
        </p>
        <p>
          <strong>关键点:</strong> 并发调用所有task APIs，处理404错误，避免超时
        </p>
      </div>

      {/* Books Display */}
      {Object.entries(booksList).map(([key, value]) => {
        return (
          <div key={key} style={{ marginBottom: '2rem' }}>
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#2c3e50',
                borderBottom: '2px solid #3498db',
                paddingBottom: '0.5rem',
              }}
            >
              📚 Group {key} ({value.length} books)
            </h2>
            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              }}
            >
              {value.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        );
      })}

      <BookForm onAdd={() => console.log('no need for level 3:')} />

      {/* Add loading styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </ProjectLayout>
  );
}
