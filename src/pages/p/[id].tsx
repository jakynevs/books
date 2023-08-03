import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import { useSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { Rate } from "antd";
import globalStyles from "../../components/styles/global";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.book.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: book,
  };
};

async function deleteBook(id: string): Promise<void> {
  await fetch(`/api/book/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Book: React.FC<BookProps> = (props) => {
  const { data: session, status } = useSession();
  const setReadStatus = (str) => {
    if (str == "READ") {
      str = "Read";
    }
    if (str == "NR") {
      str = "Yet to read";
    }
    if (str == "READING") {
      str = "Reading";
    }
    return str;
  };

  if (status === "loading") {
    return <div>Authenticating...</div>;
  }
  const userHasValidSession = Boolean(session);
  // const bookBelongsToUser = session?.user?.email === props.user?.email;

  let id = props.id;
  let title = props.title;
  let author = props.author;
  let read = props.read;
  let rating = Number(props.rating);
  let thoughts = props.thoughts;

  return (
    <Layout>
      <div className="pageParent">
        <div className="pageChild">
          <h2>{title}</h2>
          <p>By {author || "Unknown"}</p>
          <p>{setReadStatus(read)}</p>
          {thoughts && <p> {thoughts}</p>}
          {read === "READ" ? (
            <div>
              <Rate
                count={4}
                allowClear={true}
                style={{ color: "#FF69B4" }}
                defaultValue={0}
                value={rating}
              />
            </div>
          ) : (
            <p className="noRating">No rating</p>
          )}
          <p></p>
          <button
            onClick={() =>
              Router.push(
                {
                  pathname: "/edit",
                  query: { id, title, author, read, rating, thoughts },
                },
                `/edit/${title}`
              )
            }
          >
            <a>Edit</a>
          </button>
          {userHasValidSession && (
            <button onClick={() => deleteBook(id)}>Delete</button>
          )}
        </div>
      </div>
      <style jsx global>
        {globalStyles}
      </style>
    </Layout>
  );
};

export default Book;
