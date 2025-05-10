import { useState } from "react";
import { searchGoogleBooks } from "../utility/googleBooks";
import Book, { BookProps } from "../components/Book";
import { Hits, InstantSearch, SearchBox } from "react-instantsearch";
import {
  algoliaIndexName,
  searchClient,
  uploadBooksToAlgolia,
} from "../utility/algolia";
import algoliasearch from "algoliasearch/lite";

const SearchGoogleBooks: React.FC = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<BookProps[]>([]);
  const [uploadedBooksToAlgolia, setUploadedBooksToAlgolia] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      const fetchedBooks = await searchGoogleBooks(value);
      setBooks(fetchedBooks);
      if (!uploadedBooksToAlgolia) {
        uploadBooksToAlgolia(fetchedBooks);
      }
      setUploadedBooksToAlgolia(true);
    } else {
      setBooks([]);
    }
  };

  return (
    <div>
      {/* <InstantSearch indexName={algoliaIndexName} searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={({ hit }) => <div>{hit.title}</div>} />
      </InstantSearch> */}
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={handleSearch}
      />
      <div>
        {books.length > 0 ? (
          books.map((book) => <Book key={book.id} book={book} />)
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchGoogleBooks;
