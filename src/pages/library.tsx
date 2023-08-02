import Layout from "../components/Layout";
import React from "react";
import Book, { BookProps } from "../components/Book";

type Props = {
  books: BookProps[];
};
const Library: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Books</h1>
        <main>
          {props.books.map((book) => (
            <div key={book.id} className="book">
              <Book book={book} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Library;
