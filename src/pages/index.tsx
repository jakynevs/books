import { GetStaticProps } from "next";
import prisma from "../../lib/prisma";
import Library from "./library";

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

export default Library;
