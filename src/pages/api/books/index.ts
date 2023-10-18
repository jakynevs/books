import prisma from "../../../../lib/prisma";

export default async function handler(req, res) {
    const userId = req.query.userId;
    const books = await prisma.book.findMany({
      where: {
        userId: userId,
      },
    });
  
    res.json(books);
  }