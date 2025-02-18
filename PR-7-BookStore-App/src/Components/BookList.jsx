import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "../Css/BookList.css";

const BookList = ({ books, onDelete }) => {
  return (
    <div className="row">
      {books.map((book) => (
        <div key={book.id} className="col-md-4 mb-4">
          <Card className="shadow-sm d-flex flex-column" style={{ minHeight: "600px" }}>
            <Card.Img variant="top" src={book.image} alt={book.title} style={{ height: "400px", objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column">
              <div>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>
                  <strong>Author:</strong> {book.author} <br />
                  <strong>Price:</strong> {book.price} <br />
                  {book.description}
                </Card.Text>
              </div>
              <div className="mt-auto d-flex justify-content-between">
                <Link to={`/view/${book.id}`} className="btn px-4 py-2  btn-sm">
                  <FaEye /> View
                </Link>
                <Link to={`/edit/${book.id}`} className="btn px-4 py-2  btn-sm">
                  <FaEdit /> Edit
                </Link>
                <Button size="md"  onClick={() => onDelete(book.id)} className="btn px-4 py-2  btn-sm">
                  <FaTrash /> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BookList;
