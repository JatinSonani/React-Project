import React, { useState } from "react";
import { Form, FormControl, Button, InputGroup, Dropdown, Container, Row, Col } from "react-bootstrap";
import { RiHeart3Line, RiShoppingCartLine, RiUser3Line } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const [category, setCategory] = useState("Electronics");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setShowDropdown(false);
  };

  return (
    <Container className="header-container">
      <Row className="d-flex flex-wrap">
        <Col sm="12">
          <div className="top-header d-flex justify-content-between align-items-center">
            {/* Logo */}
            <a href="#" className="cr-logo">
              <img
                src="https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/logo/logo.png"
                alt="Logo"
                className="logo"
              />
            </a>

            {/* Search Bar */}
            <Form className="cr-search mx-3 search-bar">
              <InputGroup className="search-input">
                <FormControl
                  type="text"
                  placeholder="Search For items..."
                  className="border-0 shadow-none search-input-field"
                />

                {/* Category Dropdown */}
                <Dropdown
                  show={showDropdown}
                  onToggle={(isOpen) => setShowDropdown(isOpen)}
                  className="category-dropdown-container"
                >
                  <Dropdown.Toggle
                    variant="light"
                    className="category-dropdown"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {category}
                  </Dropdown.Toggle>

                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={() => handleSelect("Electronics")}>Electronics</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect("Fashion")}>Fashion</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSelect("Books")}>Books</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Search Button */}
                <Button variant="success" className="search-button">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            {/* User Options */}
            <div className="d-flex cr-right-bar gap-4 user-icons">
              <a href="/account" className="cr-right-bar-item text-dark text-decoration-none">
                <RiUser3Line />
                <span> Account</span>
              </a>
              <a href="/wishlist" className="cr-right-bar-item text-dark text-decoration-none">
                <RiHeart3Line />
                <span> Wishlist</span>
              </a>
              <a href="/cart" className="cr-right-bar-item text-dark text-decoration-none">
                <RiShoppingCartLine />
                <span> Cart</span>
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
