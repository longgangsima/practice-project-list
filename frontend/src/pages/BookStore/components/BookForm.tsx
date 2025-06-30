import { useState } from 'react';

type Props = {
  onAdd: (book: { id: string; title: string; authorId: string; year: number }) => void;
};
export default function BookForm({ onAdd }: Props) {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    authorId: '',
    year: 0,
  });
  const handleFormOnChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const isBtnDisabled =
    formData.authorId.trim() && formData.id.trim() && formData.title.trim() && formData.year > 0;

  const handleSubmit = e => {
    e.preventDefault();
    if (isBtnDisabled) {
      onAdd(formData);
      setFormData({
        id: '',
        title: '',
        authorId: '',
        year: 0,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="id"
        type="string"
        value={formData.id}
        onChange={handleFormOnChange}
        placeholder="enter book id"
      />
      <input
        name="title"
        type="string"
        value={formData.title}
        onChange={handleFormOnChange}
        placeholder="enter book title"
      />
      <input
        name="authorId"
        type="string"
        value={formData.authorId}
        onChange={handleFormOnChange}
        placeholder="enter book authorId"
      />
      <input
        name="year"
        type="number"
        value={formData.year}
        onChange={handleFormOnChange}
        placeholder="enter book's year"
      />
      <button type="submit" disabled={!isBtnDisabled}>
        Add book
      </button>
    </form>
  );
}
