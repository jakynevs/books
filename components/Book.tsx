import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type BookProps = {
  id: string;
  title: string;
  author: string;
  read: string;
  user: {
    name: string;
  } | null;
  thoughts: string;
};

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  const userName = book.user ? book.user.name : "Unknown";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${book.id}`)}>
      <h2>{book.title}</h2>
      <small>By {book.author}</small>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Book;
