import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import BookList from "./Components/BookList";
import BookForm from "./Components/BookForm";
import BookView from "./Components/BookView";
import Banner from "./Components/Banner";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  // Books data including image, price, and description
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      price: "$10.99",
      image: "https://m.media-amazon.com/images/I/71V1cA2fiZL._AC_UF1000,1000_QL80_.jpg ",
      description: "A classic novel set in the 1920s.",
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      price: "$8.99",
      image: "https://www.maplepress.co.in/cdn/shop/products/9789352230761_700x700.jpg?v=1624804888",
      description: "A dystopian novel about totalitarianism.",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      price: "$12.99",
      image: "https://m.media-amazon.com/images/I/81gepf1eMqL._SL1500_.jpg",
      description: "A novel about racial injustice in the Deep South.",
    },
  ]);

  // Function to handle adding/editing books
  const handleSave = (book) => {
    setBooks((prevBooks) => {
      if (book.id) {
        // Update existing book
        return prevBooks.map((b) => (b.id === book.id ? book : b));
      } else {
        // Add new book with unique ID
        const newBook = { ...book, id: prevBooks.length ? prevBooks[prevBooks.length - 1].id + 1 : 1 };
        return [...prevBooks, newBook];
      }
    });
  };

  // Function to handle deleting books
  const handleDelete = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <Router>
      <Header />
      {/* Dynamic Banner with a default image */}
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
