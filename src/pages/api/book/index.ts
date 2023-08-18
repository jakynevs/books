import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const { title, author, read, rating, thoughts } = req.body;

  const result = await prisma.book.create({
    data: {
      title: title,
      author: author,
      read: read ? read : "NR",
      rating: rating,
      thoughts: thoughts,
    },
  });
  res.json(result);
}
