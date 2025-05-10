import algoliasearch from "algoliasearch";
import { BookProps } from "../components/Book";

// ---------- Frontend Search Client ----------
const searchClient = algoliasearch(
  process.env.ALGOLIA_ID as string,
  process.env.ALGOLIA_SEARCH_API_KEY as string
);

// ---------- Admin Upload Client (Server-side Only) ----------
const adminClient = algoliasearch(
  process.env.ALGOLIA_ID as string,
  process.env.ALGOLIA_WRITE_API_KEY as string
);
const algoliaIndexName = "books";
const algoliaIndex = adminClient.initIndex(algoliaIndexName);

const uploadBooksToAlgolia = async (books: BookProps[]) => {
  const formattedBooks = books.map((book) => ({
    ...book,
    objectID: book.id,
  }));
  try {
    // Upload data to the books index
    const result = await algoliaIndex.saveObjects(formattedBooks);
    console.log("Books uploaded:", result);
  } catch (error) {
    console.error("Error uploading to Algolia:", error);
  }
};

export { searchClient, uploadBooksToAlgolia, algoliaIndexName };
