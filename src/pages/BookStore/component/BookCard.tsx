export default function BookCard({ book }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '0.5rem',
      }}
    >
      {book.title}
    </div>
  );
}
