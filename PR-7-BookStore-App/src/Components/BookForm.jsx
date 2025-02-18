import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const BookForm = ({ books, onSave }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const existingBook =
    books.find((b) => b.id === Number(id)) || { title: "", author: "", price: "", image: "", description: "" };

  const [book, setBook] = useState(existingBook);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.description || !book.price || !book.image) {
      setError("All fields are required.");
      return;
    }

    onSave(book);
    navigate("/");
  };

  return (
    <Form onSubmit={handleSubmit} className="shadow p-4 rounded">
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={book.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" name="author" value={book.author} onChange={handleChange} />
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

      <Button type="submit" variant="success">Save Book</Button>
    </Form>
  );
};

export default BookForm;
