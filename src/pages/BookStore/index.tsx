import { useEffect, useState } from 'react';
import ProjectLayout from '../../components/ProjectLayout';
import BookCard from './component/BookCard';
import data from './data.json';

type BookType = {
  id: string;
  title: string;
  authorId: string;
  year: number;
};

export default function BookStore() {
  /**
   * 给一个data.json, 写一个Card组件，把书的list按照名字首字母group
   * （data已经是group好的）内容render出来
   *
   * A(selected): aa,bb
   * B:
   */

  const [booksList, setBookList] = useState([] as BookType[]);
  const [group, setGroup] = useState<string>('');
  console.log('group: ', group);

  useEffect(() => {
    const initialGroup = Object.keys(data.booklist)[0];
    setGroup(initialGroup);
  }, []);

  return (
    <ProjectLayout currentPath="/book-store">
      {Object.entries(data.booklist).map(([key, value], index) => {
        console.log('key + index: ', key + index);
        return (
          <div key={key + index}>
            <div onClick={() => console.log('first: ', key)}>Group name: {key}</div>
            {value.map(book => {
              return <BookCard book={book} />;
            })}
          </div>
        );
      })}
    </ProjectLayout>
  );
}
