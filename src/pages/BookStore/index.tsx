import { useEffect, useState } from 'react';
import ProjectLayout from '../../components/ProjectLayout';
import BookCard from './component/BookCard';
import BookForm from './component/BookForm';
import data from './data.json';

type BookType = {
  id: string;
  title: string;
  authorId: string;
  year: number;
};

export default function BookStore() {
  const [booksList, setBookList] = useState(data.booklist);
  const [group, setGroup] = useState<string>('');

  useEffect(() => {
    const initialGroup = Object.keys(data.booklist)[0];
    setGroup(initialGroup);
  }, []);

  const handleAddBook = (book: BookType) => {
    console.log('book: ', book);
    const firstLetter = book.title.charAt(0).toUpperCase();

    setBookList(prevShelves => {
      const newShelves = { ...prevShelves };
      if (!newShelves[firstLetter]) {
        newShelves[firstLetter] = [];
      }
      const shelf = newShelves[firstLetter];
      const exist = shelf.some(b => b.title === book.title);
      if (exist) {
        alert(`The book ${book.title} already exist in the shelf`);
      } else {
        shelf.push(book);
        shelf.sort((a, b) => a.title - b.title);
        alert(`The book ${book.title} successfully added into shelf`);
      }
      return newShelves;
    });
  };

  return (
    <ProjectLayout currentPath="/book-store">
      {Object.entries(booksList).map(([key, value], index) => {
        console.log('value: ', value);
        return (
          <div key={key + index}>
            <div onClick={() => console.log('first: ', key)}>Group name: {key}</div>
            {value.map(book => {
              return <BookCard key={book.id} book={book} />;
            })}
          </div>
        );
      })}
      <BookForm onAdd={handleAddBook} />
    </ProjectLayout>
  );
}
