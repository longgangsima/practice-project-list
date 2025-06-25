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

  // const handleAddBook = (book: BookType) => {
  //   console.log('book: ', book);
  //   const firstLetter = book.title.charAt(0).toUpperCase();

  //   setBookList(prevShelves => {
  //     const newShelves = { ...prevShelves };
  //     if (!newShelves[firstLetter]) {
  //       newShelves[firstLetter] = [];
  //     }
  //     const shelf = newShelves[firstLetter];
  //     const exist = shelf.some(b => b.title === book.title);
  //     if (exist) {
  //       alert(`The book ${book.title} already exist in the shelf`);
  //     } else {
  //       shelf.push(book);
  //       shelf.sort((a, b) => a.title - b.title);
  //       alert(`The book ${book.title} successfully added into shelf`);
  //     }
  //     return newShelves;
  //   });
  // };

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
