import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Required fields in body: author
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, author, thoughts } = req.body;

  const session = await getSession({ req });
  const result = await prisma.book.create({
    data: {
      title: title,
      author: author,
      thoughts: thoughts,
      user: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
