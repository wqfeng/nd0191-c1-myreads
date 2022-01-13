import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";
import PropTypes from "prop-types";

export default function SearchPage({ booksOnShelf, moveBook }) {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchBooks = (query, booksOnShelf) => {
    BooksAPI.search(query, 20)
      .then((books) => {
        if (!books.error) {
          books.forEach((book) => {
            booksOnShelf.forEach((x) => {
              if (x.id === book.id) {
                book.shelf = x.shelf;
              }
            });
          });
          setSearchResults(books);
        } else {
          setSearchResults([]);
        }
      })
      .catch((e) => {
        setSearchResults([]);
      });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              searchBooks(event.target.value, booksOnShelf);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        {searchResults.length > 0 ? (
          <ol className="books-grid">
            {searchResults &&
              searchResults.map((book) => (
                <li key={book.id}>
                  <Book book={book} moveBook={moveBook} />
                </li>
              ))}
          </ol>
        ) : (
          <p>Type in valid keywords to search.</p>
        )}
      </div>
    </div>
  );
}

SearchPage.propTypes = {
  booksOnShelf: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBook: PropTypes.func.isRequired,
};
