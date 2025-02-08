import React, { useState } from "react";
import { Nav, Container, Dropdown, Row, Col, ListGroup } from "react-bootstrap";
import { RiMenu2Line, RiPhoneLine } from "react-icons/ri";
import "./MainMenu.css";

const MainMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dairy & Bakery");
  const [openDropdown, setOpenDropdown] = useState(null);

  // Define categories and subcategories
  const categories = [
    {
      name: "Dairy & Bakery",
      subcategories: {
        Dairy: [
          "Milk",
          "Ice Cream",
          "Cheese",
          "Frozen Custard",
          "Frozen Yogurt",
        ],
        Bakery: [
          "Cake And Pastry",
          "Rusk Toast",
          "Bread & Buns",
          "Chocolate Brownie",
          "Cream Roll",
        ],
      },
    },
    {
      name: "Fruits & Vegetable",
      subcategories: {
        Fruits: ["Apple", "Banana", "Mango", "Grapes"],
        Vegetables: ["Carrot", "Tomato", "Spinach", "Potato"],
      },
    },
    {
      name: "Snack & Spice",
      subcategories: {
        Snacks: ["Chips", "Cookies", "Nuts"],
        Spices: ["Turmeric", "Pepper", "Cumin"],
      },
    },
    {
      name: "Juice & Drinks",
      subcategories: { Drinks: ["Orange Juice", "Apple Juice", "Lemonade"] },
    },
    { name: "View All", subcategories: {} },
  ];

  return (
    <Container className="header-container d-flex justify-content-between align-items-center mb-2">
      <Row className="w-100 align-items-center">
        {/* Left Section: Category Dropdown */}
        <Col md="auto">
          <Dropdown
            className="d-inline-block"
            onMouseEnter={() => setOpenDropdown("category")}
            onMouseLeave={() => setOpenDropdown(null)}
            show={openDropdown === "category"}
          >
            <Dropdown.Toggle
              variant="light"
              className="border px-3 py-2 rounded d-flex align-items-center"
            >
              <RiMenu2Line size={20} className="me-2" />
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="dropdown-menu p-3 category-dropdown"
              style={{ width: "450px", minHeight: "280px" }}
            >
              <Row>
                <Col md={4}>
                  <ListGroup>
                    {categories.map((category) => (
                      <ListGroup.Item
                        key={category.name}
                        action
                        className={`border-0 ${
                          selectedCategory === category.name
                            ? "text-success fw-bold border border-success"
                            : ""
                        }`}
                        onClick={() => setSelectedCategory(category.name)}
                      >
                        {category.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>

                <Col md={8}>
                  {categories
                    .filter((category) => category.name === selectedCategory)
                    .map((category) => (
                      <div key={category.name} className="d-flex gap-4">
                        {Object.keys(category.subcategories).map(
                          (subcategory) => (
                            <div key={subcategory}>
                              <h6 className="text-success fw-bold">
                                {subcategory}
                              </h6>
                              <ul className="list-unstyled">
                                {category.subcategories[subcategory].map(
                                  (item) => (
                                    <li key={item} className="text-muted">
                                      {item}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    ))}
                </Col>
              </Row>
            </Dropdown.Menu>
          </Dropdown>
        </Col>

        {/* Center Section: Navigation Links */}
        <Col>
          <Nav className="navbar navbar-expand-lg px-4 justify-content-center">
            <Nav.Link href="/">Home</Nav.Link>

            <Dropdown
              onMouseEnter={() => setOpenDropdown("categoryMenu")}
              onMouseLeave={() => setOpenDropdown(null)}
              show={openDropdown === "categoryMenu"}
            >
              <Dropdown.Toggle variant="link" className="nav-link">
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Electronics</Dropdown.Item>
                <Dropdown.Item href="#">Fashion</Dropdown.Item>
                <Dropdown.Item href="#">Books</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              onMouseEnter={() => setOpenDropdown("productsMenu")}
              onMouseLeave={() => setOpenDropdown(null)}
              show={openDropdown === "productsMenu"}
            >
              <Dropdown.Toggle variant="link" className="nav-link">
                Products
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">New Arrivals</Dropdown.Item>
                <Dropdown.Item href="#">Best Sellers</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              onMouseEnter={() => setOpenDropdown("pagesMenu")}
              onMouseLeave={() => setOpenDropdown(null)}
              show={openDropdown === "pagesMenu"}
            >
              <Dropdown.Toggle variant="link" className="nav-link">
                Pages
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">About Us</Dropdown.Item>
                <Dropdown.Item href="#">Contact</Dropdown.Item>
                <Dropdown.Item href="#">FAQ</Dropdown.Item>
                <Dropdown.Item href="#">Terms & Conditions</Dropdown.Item>
                <Dropdown.Item href="#">Privacy Policy</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              onMouseEnter={() => setOpenDropdown("blogMenu")}
              onMouseLeave={() => setOpenDropdown(null)}
              show={openDropdown === "blogMenu"}
            >
              <Dropdown.Toggle variant="link" className="nav-link">
                Blog
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Latest Posts</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown
              onMouseEnter={() => setOpenDropdown("elementsMenu")}
              onMouseLeave={() => setOpenDropdown(null)}
              show={openDropdown === "elementsMenu"}
            >
              <Dropdown.Toggle variant="link" className="nav-link">
                Elements
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Components</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>

        {/* Right Section: Contact Info */}
        <Col md="auto">
          <div className="phone-number d-flex align-items-center">
            <RiPhoneLine className="me-2" /> +123 (456) (7890)
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MainMenu;
