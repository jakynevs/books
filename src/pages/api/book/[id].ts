import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const bookId = req.query.id;
  if (req.method === "DELETE") {
    const book = await prisma.book.delete({
      where: { id: bookId },
    });
    res.json(book);
    return;
  }
  if (req.method === "PUT") {
    const { id, title, author, read, rating, thoughts } = req.body;
    const updateBook = await prisma.book.update({
      where: {
        id: id,
      },
      data: {
        id: id,
        title: title,
        author: author,
        read: read,
        rating: rating,
        thoughts: thoughts,
      },
    });
    res.json(updateBook);
    return;
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
