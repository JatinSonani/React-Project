import React, { useEffect, useState } from "react";
import { Card, Button, Form, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import "../Css/BookList.css";

const BookList = ({ books, onDelete, onUpdate }) => {
  const [bookList, setBookList] = useState(books);
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    setBookList(books);
  }, [books]);

  const handleDelete = (id) => {
    const updatedBooks = bookList.filter((book) => book.id !== id);
    setBookList(updatedBooks);
    onDelete(id);
  };

  const handleSort = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategoryFilter = (e) => {
    setCategoryFilter(e.target.value);
  };

  let filteredBooks = bookList.filter(
    (book) => categoryFilter === "All" || book.category === categoryFilter
  );

  filteredBooks = filteredBooks.sort((a, b) => {
    if (sortOrder === "asc") return a.title.localeCompare(b.title);
    if (sortOrder === "desc") return b.title.localeCompare(a.title);
    return 0;
  });

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Form.Select onChange={handleSort} value={sortOrder} className="me-2">
          <option value="asc">Sort by Title (A-Z)</option>
          <option value="desc">Sort by Title (Z-A)</option>
        </Form.Select>

        <Form.Select onChange={handleCategoryFilter} value={categoryFilter}>
          <option value="All">All Categories</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Science">Science</option>
          <option value="History">History</option>
          <option value="Biography">Biography</option>
          <option value="Fantasy">Fantasy</option>
        </Form.Select>
      </div>

      <div className="row">
        {currentBooks.length === 0 ? (
          <h3 className="text-center mt-4">No books found!</h3>
        ) : (
          currentBooks.map((book) => (
            <div key={book.id} className="col-md-4 mb-4">
              <Card
                className="shadow-sm d-flex flex-column"
                style={{ height: "650px", width: "100%" }}
              >
                <Card.Img
                  variant="top"
                  src={book.image}
                  alt={book.title}
                  style={{ height: "350px" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{book.title}</Card.Title>
                  <Card.Text>
                    <strong>Author:</strong> {book.author} <br />
                    <strong>Price:</strong> ${parseFloat(book.price).toFixed(2)}{" "}
                    <br />
                    <strong>Category:</strong> {book.category || "Unknown"}{" "}
                    <br />
                    <strong>Desc:</strong>{" "}
                    {book.description.length > 100
                      ? `${book.description.substring(0, 100)}...`
                      : book.description}
                  </Card.Text>
                  <div className="mt-auto d-flex justify-content-between">
                    <Link
                      to={`/view/${book.id}`}
                      className="btn btn-info btn-sm"
                    >
                      <FaEye /> View
                    </Link>
                    <Link
                      to={`/edit/${book.id}`}
                      className="btn btn-warning btn-sm"
                      onClick={() => onUpdate(book)}
                    >
                      <FaEdit /> Edit
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                    >
                      <FaTrash /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
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
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </div>
  );
};

export default BookList;
