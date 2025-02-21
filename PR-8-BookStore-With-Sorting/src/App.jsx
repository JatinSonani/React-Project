import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import BookList from "./Components/BookList";
import BookForm from "./Components/BookForm";
import BookView from "./Components/BookView";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/Header.css";

const loadFromLocalStorage = () => {
  const storedBooks = localStorage.getItem("books");
  return storedBooks ? JSON.parse(storedBooks) : [];
};

const saveToLocalStorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

const CustomPagination = ({
  totalBooks,
  booksPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  if (totalPages <= 1) return null; // Hide pagination if only one page

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.Prev
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      />
      {[...Array(totalPages)].map((_, index) => (
        <Pagination.Item
          key={index}
          active={index + 1 === currentPage}
          onClick={() => setCurrentPage(index + 1)}
        >
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
};

const App = () => {
  const [books, setBooks] = useState(loadFromLocalStorage());
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Fantasy",
  ];

  useEffect(() => {
    saveToLocalStorage(books);
  }, [books]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <Router>
      <Header onSearch={handleSearch} className="transparent-header" />

      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={<BookList books={currentBooks} onSort={handleSort} />}
          />
          <Route
            path="/add"
            element={<BookForm books={books} categories={categories} />}
          />
          <Route
            path="/edit/:id"
            element={<BookForm books={books} categories={categories} />}
          />
          <Route path="/view/:id" element={<BookView books={books} />} />
        </Routes>
        <CustomPagination
          totalBooks={filteredBooks.length}
          booksPerPage={booksPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Router>
  );
};

export default App;
