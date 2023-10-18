import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {

  const { title, author, read, rating, thoughts, userId } = req.body;
  
  if (userId) {
  const newRecord = await prisma.book.create({
    data: {
      title: title,
      author: author,
      read: read ? read : "NR",
      rating: rating,
      thoughts: thoughts,
      userId: userId
    },
    
  });
  res.json(newRecord);
} else {
    res.status(401).send("Unauthorised - No 'userId'")
  }
} 

