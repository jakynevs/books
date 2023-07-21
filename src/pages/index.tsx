import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Book, { BookProps } from "../components/Book";
import prisma from "../../lib/prisma";

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
      <style jsx>{`
        .book {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .book:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .book + .book {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Library;
