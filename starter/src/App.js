import "./App.css";
import * as BooksAPI from "./BooksAPI";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SearchPage from "./SearchPage";
import NotFound from "./NotFound";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBooks(books);
    });
  }, []);

  const moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      setBooks(books.filter((b) => b.id !== book.id).concat(book));
    });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home books={books} moveBook={moveBook} />} />
        <Route
          path="search"
          element={<SearchPage booksOnShelf={books} moveBook={moveBook} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
