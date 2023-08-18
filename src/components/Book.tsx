import React from "react";
import Router from "next/router";
import { Rate } from "antd";
import globalStyles from "../components/styles/global";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const handleClick = () => {
    Router.push("/p/[id]", `/p/${book.id}`);
  };
  return (
    <div onClick={session && handleClick}>
      <h2>{book.title}</h2>
      <p>By {book.author}</p>
      {book.read === "READ" ? (
        <div>
          <Rate
            count={4}
            allowClear={true}
            style={{ color: "#FF69B4" }}
            defaultValue={0}
            value={book.rating}
          />
        </div>
      ) : (
        <p className="noRating">No rating</p>
      )}

      <style jsx global>
        {globalStyles}
      </style>
    </div>
  );
};

export default React.memo(Book);
