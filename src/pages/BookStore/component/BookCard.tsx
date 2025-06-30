type Author = {
  id: string;
  name: string;
  nationality: string;
  birthYear: number;
};

type BookWithAuthor = {
  id: string;
  title: string;
  authorId: string;
  year: number;
  genre: string;
  author: Author;
};

type Props = {
  book: BookWithAuthor;
};

export default function BookCard({ book }: Props) {
  return (
    <div
      style={{
        border: '1px solid #e1e8ed',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '1rem',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <h3
          style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.2rem',
            color: '#2c3e50',
            fontWeight: '600',
          }}
        >
          📖 {book.title}
        </h3>
        <p
          style={{
            margin: '0',
            color: '#7f8c8d',
            fontSize: '0.9rem',
            fontStyle: 'italic',
          }}
        >
          {book.genre}
        </p>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <p
          style={{
            margin: '0 0 0.25rem 0',
            color: '#34495e',
            fontSize: '1rem',
            fontWeight: '500',
          }}
        >
          👤 {book.author.name}
        </p>
        <p
          style={{
            margin: '0',
            color: '#95a5a6',
            fontSize: '0.85rem',
          }}
        >
          🌍 {book.author.nationality} • Born {book.author.birthYear}
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '0.5rem',
          borderTop: '1px solid #ecf0f1',
        }}
      >
        <span
          style={{
            color: '#3498db',
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          📅 {book.year}
        </span>
        <span
          style={{
            color: '#95a5a6',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
          }}
        >
          ID: {book.id}
        </span>
      </div>
    </div>
  );
}
