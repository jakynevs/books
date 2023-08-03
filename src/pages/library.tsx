import React from "react";
import Book, { BookProps } from "../components/Book";

type Props = {
  books: BookProps[];
};
const Library: React.FC<Props> = (Props) => {
  return (
    <div className="page">
      <h1>Books</h1>
      <main>
        {Props.books.map((book) => (
          <div key={book.id} className="book">
            <Book book={book} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Library;
