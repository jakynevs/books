import React from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";

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
  const bookBelongsToUser = session?.user?.email === props.user?.email;

  let id = props.id;
  let title = props.title;
  let author = props.author;
  let read = props.read;
  let thoughts = props.thoughts;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {author || "Unknown"}</p>
        <p>{setReadStatus(read)}</p>
        {thoughts && <p> {thoughts}</p>}
        <p></p>
        <Link
          href={{
            pathname: "/edit",
            query: { id, title, author, read, thoughts },
          }}
        >
          <button>
            <a>Edit</a>
          </button>
        </Link>
        {userHasValidSession && bookBelongsToUser && (
          <button onClick={() => deleteBook(id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Book;
