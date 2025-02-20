import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import BookList from "./Components/BookList";
import BookForm from "./Components/BookForm";
import BookView from "./Components/BookView";
import Banner from "./Components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";

// Function to load books from localStorage
const loadFromLocalStorage = () => {
  const storedBooks = localStorage.getItem("books");
  return storedBooks ? JSON.parse(storedBooks) : [];
};

// Function to save books to localStorage
const saveToLocalStorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

const App = () => {
  const [books, setBooks] = useState(loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage(books);
  }, [books]);

  const handleSave = (book) => {
    setBooks((prevBooks) => {
      let updatedBooks;
      if (book.id) {
        updatedBooks = prevBooks.map((b) => (b.id === book.id ? book : b));
      } else {
        const newBook = { ...book, id: prevBooks.length ? prevBooks[prevBooks.length - 1].id + 1 : 1 };
        updatedBooks = [...prevBooks, newBook];
      }
      saveToLocalStorage(updatedBooks);
      return updatedBooks;
    });
  };

  const handleDelete = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    saveToLocalStorage(updatedBooks);
  };

  return (
    <Router>
      <Header />
      <Banner imageUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f" />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<BookList books={books} onDelete={handleDelete} />} />
          <Route path="/add" element={<BookForm books={books} onSave={handleSave} />} />
          <Route path="/edit/:id" element={<BookForm books={books} onSave={handleSave} />} />
          <Route path="/view/:id" element={<BookView books={books} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
