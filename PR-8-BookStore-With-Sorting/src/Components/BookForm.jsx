import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const loadFromLocalStorage = () => {
  const storedBooks = localStorage.getItem("books");
  return storedBooks ? JSON.parse(storedBooks) : [];
};

const saveToLocalStorage = (books) => {
  localStorage.setItem("books", JSON.stringify(books));
};

const BookForm = ({ books, onSave, categories }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const bookList = books || loadFromLocalStorage();

  const existingBook =
    bookList.find((b) => b.id === Number(id)) || {
      title: "",
      author: "",
      price: "",
      image: "",
      description: "",
      category: "",
    };

  const [book, setBook] = useState(existingBook);
  const [error, setError] = useState("");

  useEffect(() => {
    setBook(existingBook);
  }, [id, bookList]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.description || !book.price || !book.image || !book.category) {
      setError("All fields are required.");
      return;
    }

    if (isNaN(book.price) || Number(book.price) <= 0) {
      setError("Price must be a valid number greater than 0.");
      return;
    }

    let updatedBooks;
    if (book.id) {
      updatedBooks = bookList.map((b) => (b.id === book.id ? book : b));
    } else {
      const newBook = { ...book, id: bookList.length ? bookList[bookList.length - 1].id + 1 : 1 };
      updatedBooks = [...bookList, newBook];
    }

    saveToLocalStorage(updatedBooks);
    onSave && onSave(book);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit} className="shadow p-4 rounded">
      {error && <Alert variant="danger">{error}</Alert>}
      <h2 className="text-center fs-1">{id ? "Edit Book" : "Add Book"}</h2>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={book.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" name="author" value={book.author} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select name="category" value={book.category} onChange={handleChange}>
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price ($)</Form.Label>
        <Form.Control type="text" name="price" value={book.price} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" name="image" value={book.image} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" name="description" value={book.description} onChange={handleChange} />
      </Form.Group>

      <Button type="submit" variant="success">{id ? "Update Book" : "Save Book"}</Button>
    </Form>
  );
};

export default BookForm;
