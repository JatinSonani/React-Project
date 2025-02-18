import React, { useEffect, useState } from "react";
import { Table, Button, Image } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getBooksFromLocalStorage } from "../Services/LocalStorageData"; // Import localStorage functions
import "../Css/BookList.css";

const BookView = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    // Load books from localStorage
    setBookList(getBooksFromLocalStorage());
  }, []);

  const book = bookList.find((b) => b.id === Number(id));

  if (!book) return <h3 className="text-center mt-4">Book not found!</h3>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{book.title}</h2>
      <div className="d-flex justify-content-center mb-4">
        <Image src={book.image} alt={book.title} thumbnail style={{ maxHeight: "300px" }} />
      </div>
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>${book.price}</td>
            <td>{book.category || "Unknown"}</td>
            <td>{book.description}</td>
          </tr>
        </tbody>
      </Table>

      <div className="list-btn text-center">
        <Button onClick={() => navigate("/")}>Back to List</Button>
      </div>
    </div>
  );
};

export default BookView;
