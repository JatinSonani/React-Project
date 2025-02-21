import React from "react";
import { Navbar, Nav, Container, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "../Css/Header.css";

const Header = ({ onSearch, searchQuery }) => {
  return (
    <div className="header-container">
      <Navbar expand="lg" className="transparent-header shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <img
              src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png"
              alt="Book Store Logo"
              height="35"
            />
          </Navbar.Brand>

          <Form className="d-flex ms-auto search-bar">
            <FormControl
              type="search"
              placeholder="Search Books..."
              className="me-2 search-input"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            <FaSearch className="search-icon" />
          </Form>

          <Nav className="ms-3">
            <Nav.Link as={Link} to="/" className="text-success fw-bold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add" className="text-dark fw-bold">
              Add Book
            </Nav.Link>
            <Nav.Link as={Link} to="/view" className="text-dark fw-bold">
              View Books
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
