import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Home({ books, moveBook }) {
  const currentlyReading = books.filter(
    (book) => book["shelf"] === "currentlyReading"
  );
  const wantToRead = books.filter((book) => book["shelf"] === "wantToRead");
  const read = books.filter((book) => book["shelf"] === "read");

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            title="Currently Reading"
            books={currentlyReading}
            moveBook={moveBook}
          />
          <BookShelf
            title="Want to Read"
            books={wantToRead}
            moveBook={moveBook}
          />
          <BookShelf title="Read" books={read} moveBook={moveBook} />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  moveBook: PropTypes.func.isRequired,
};
