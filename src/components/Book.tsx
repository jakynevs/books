import React from "react";
import Router from "next/router";
import { Rate } from "antd";
import globalStyles from "../components/styles/global";

export type BookProps = {
  id: string;
  title: string;
  author: string;
  thoughts: string;
  rating: number;
  read: string;
  user: {
    name: string;
  } | null;
};

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  const userName = book.user ? book.user.name : "Unknown";
  return (
    <div onClick={() => Router.push("/p/[id]", `/p/${book.id}`)}>
      <h2>{book.title}</h2>
      <small>By {book.author}</small>
      {book.read === "READ" && (
        <div>
          <Rate
            count={4}
            allowClear={true}
            style={{ color: "#96e7f1" }}
            defaultValue={0}
            value={book.rating}
          />
        </div>
      )}

      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export default React.memo(Book);
