import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import "../Css/Header.css";

const Header = () => {
  return (
    <div className="header-container">
      <Navbar expand="lg" className="bg-light shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
            <img
              src="https://websitedemos.net/earth-store-02/wp-content/uploads/sites/1171/2022/11/EARTH-STORE-200x35.png"
              alt="Book Store Logo"
              height="35"
            />
          </Navbar.Brand>

          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-success fw-bold">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/add" className="text-dark fw-bold">
              Add Book
            </Nav.Link>
           
            <Nav.Link as={Link} to="/contact" className="text-dark fw-bold">
              Contact
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center ms-3">
            <Link to="/cart" className="position-relative text-dark me-3">
              <FaShoppingBag size={24} />
              <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                0
              </Badge>
            </Link>

            <Link to="/profile" className="text-dark">
              <FaUser size={24} />
            </Link>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
