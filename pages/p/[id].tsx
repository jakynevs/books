import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
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

async function publishBook(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "POST",
  });
  await Router.push("/");
}

const Book: React.FC<BookProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating...</div>;
  }
  const userHasValidSession = Boolean(session);
  const bookBelongsToUser = session?.user?.email === props.user?.email;

  let title = props.title;
  let author = props.author;
  let read = props.read;

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {author || "Unknown"}</p>
        <ReactMarkdown children={read} />
        {userHasValidSession && bookBelongsToUser && (
          <button onClick={() => publishBook(props.id)}>Publish</button>
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
