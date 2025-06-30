import { useEffect, useState } from 'react';
import { ProjectLayout } from '../../components';
import { fetchBooksWithAuthors } from './api/simpleApi';
import BookCard from './components/BookCard';
import BookForm from './components/BookForm';

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

// 🔄 Grouping Functions
const groupBooksByAuthorLastName = (bookList: BookWithAuthor[]) => {
  return bookList.reduce((acc: Record<string, BookWithAuthor[]>, book) => {
    const nameParts = book.author.name.split(' ');
    const lastName = nameParts[nameParts.length - 1]; // Get last part of name
    const firstLetter = lastName.charAt(0).toUpperCase();

    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(book);
    return acc;
  }, {});
};

const groupBooksByYear = (bookList: BookWithAuthor[]) => {
  return bookList.reduce((acc: Record<string, BookWithAuthor[]>, book) => {
    // Group by decade for better visualization
    const decade = Math.floor(book.year / 10) * 10;
    const yearRange = `${decade}s`;

    if (!acc[yearRange]) {
      acc[yearRange] = [];
    }
    acc[yearRange].push(book);
    return acc;
  }, {});
};
export default function BookStore() {
  const [rawBooksData, setRawBooksData] = useState<BookWithAuthor[]>([]);
  const [displayList, setDisplayList] = useState<Record<string, BookWithAuthor[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isGroupByAuthor, setIsGroupByAuthor] = useState<boolean>(true);

  useEffect(() => {
    loadBooksData();
  }, []);

  // 🔄 When data or grouping method changes, update display list
  useEffect(() => {
    if (rawBooksData.length > 0) {
      updateDisplayList();
    }
  }, [rawBooksData, isGroupByAuthor]);

  const loadBooksData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🚀 Starting books and authors data fetch...');

      // 使用简化的API获取完整数据
      const result = await fetchBooksWithAuthors();
      setRawBooksData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load books data');
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayList = () => {
    let grouped: Record<string, BookWithAuthor[]>;

    if (isGroupByAuthor) {
      grouped = groupBooksByAuthorLastName(rawBooksData);
    } else {
      grouped = groupBooksByYear(rawBooksData);
    }

    // Sort groups by key and sort books within each group
    const sortedGrouped: Record<string, BookWithAuthor[]> = {};
    Object.keys(grouped)
      .sort()
      .forEach(key => {
        sortedGrouped[key] = grouped[key].sort((a, b) => a.title.localeCompare(b.title));
      });

    setDisplayList(sortedGrouped);
  };

  // 🏗️ 处理添加书籍逻辑 - 直接添加到原始数据，让useEffect处理重新分组
  const handleAddBook = (book: BookType) => {
    console.log('Adding book:', book);

    // 检查书籍是否已存在
    const existingBook = rawBooksData.find(b => b.title === book.title);
    if (existingBook) {
      alert(`The book "${book.title}" already exists!`);
      return;
    }

    // 创建新的书籍对象
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

    // 添加到原始数据中，useEffect会自动重新分组
    setRawBooksData(prevData => [...prevData, newBook]);

    console.log(`✅ Book "${book.title}" added successfully`);
    alert(`The book "${book.title}" has been successfully added!`);
  };
  const handleToggle = () => {
    setIsGroupByAuthor(prev => !prev);
    console.log(`🔄 Switching to group by ${!isGroupByAuthor ? 'Author' : 'Year'}`);
  };

  if (loading) {
    return (
      <ProjectLayout currentPath="/book-store">
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem' }}>📚</div>
          <p>Loading books...</p>
        </div>
      </ProjectLayout>
    );
  }

  if (error) {
    return (
      <ProjectLayout currentPath="/book-store">
        <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>
          <p>Error: {error}</p>
          <button onClick={loadBooksData}>Retry</button>
        </div>
      </ProjectLayout>
    );
  }

  return (
    <ProjectLayout currentPath="/book-store">
      {/* 🔄 Toggle Controls */}
      <div
        style={{
          margin: '1rem 0',
          padding: '1rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>📊 Group by:</span>
        <button
          onClick={handleToggle}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '2px solid #007bff',
            backgroundColor: isGroupByAuthor ? '#007bff' : '#fff',
            color: isGroupByAuthor ? '#fff' : '#007bff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          👤 Author Name
        </button>
        <button
          onClick={handleToggle}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '2px solid #007bff',
            backgroundColor: !isGroupByAuthor ? '#007bff' : '#fff',
            color: !isGroupByAuthor ? '#fff' : '#007bff',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📅 Publication Year
        </button>
        <span style={{ color: '#666', marginLeft: '1rem' }}>
          Currently showing: <strong>{isGroupByAuthor ? 'Author Groups' : 'Year Groups'}</strong>
        </span>
      </div>

      {/* Books Display */}
      {Object.entries(displayList).map(([key, books]) => {
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
              📚 {isGroupByAuthor ? `Author Group "${key}"` : `${key} Books`} ({books.length} books)
            </h2>
            <div
              style={{
                display: 'grid',
                gap: '1rem',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              }}
            >
              {books.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        );
      })}

      {/* Add Book Form */}
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>📝 Add New Book</h3>
        <BookForm onAdd={handleAddBook} />
      </div>

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
