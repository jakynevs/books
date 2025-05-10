import axios from "axios";
import { BookProps } from "../components/Book";

export const searchGoogleBooks = async (query: string) => {
  const res = await axios.get("https://www.googleapis.com/books/v1/volumes", {
    params: {
      q: query,
      maxResults: 10,
    },
  });

  return res.data.items.map((book: any) => mapGoogleBooksToProps(book));
};

const mapGoogleBooksToProps = (book: any): BookProps => {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown Author",
    thoughts: book.volumeInfo.description || "No description available",
    rating: book.volumeInfo.averageRating || 0,
    read: "UNREAD",
    user: null,
  };
};
