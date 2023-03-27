import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  debugger;
  const bookId = req.query.id;
  console.log(bookId);
  if (req.method === "DELETE") {
    const book = await prisma.book.delete({
      where: { id: bookId },
    });
    res.json(book);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
