import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Book, { BookProps } from "../components/Book";
import prisma from "../lib/prisma";
// import styles from "../styles/css/styles.min.css";
import "../pages/_app.less";

export const getStaticProps: GetStaticProps = async () => {
  const books = await prisma.book.findMany({
    include: {
      user: {
        select: { name: true },
      },
    },
  });
  return {
    props: { books },
    revalidate: 10,
  };
};

type Props = {
  books: BookProps[];
};

const Library: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="body">
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
