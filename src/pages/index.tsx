import { GetStaticProps } from "next";
import prisma from "../../lib/prisma";
import Library from "../components/Library"
import Layout from "../components/Layout";

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

export default function Home({ books }) {
  return (
    <Layout>
      <Library books={books} />
    </Layout>
  );
}
