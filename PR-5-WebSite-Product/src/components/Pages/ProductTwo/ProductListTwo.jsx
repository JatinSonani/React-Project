import React, { useState } from "react";
import ProductCard from "./ProductCardTwo";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductListTwo.css";

const ProductListTwo = () => {
  const [products] = useState([
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/1.jpg",
      category: "Organic Fresh Lemon",
      rating: 5.0,
      title: "Lorem imsum dolor adipisicing elit.",
      price: 120.25,
      originalPrice: 123.25,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/2.jpg",
      category: "Organic Fresh apple juice",
      rating: 5.0,
      title: "Lorem imsum dolor adipisicing elit.",
      price: 120.25,
      originalPrice: 123.25,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/3.jpg",
      category: "Organic Fresh venila farm watermelon 5kg",
      rating: 5.0,
      title: "Lorem imsum dolor adipisicing elit.",
      price: 120.25,
      originalPrice: 123.25,
    },
    
  ]);

  return (
    <Container className="product-two-container">
      <div className="product-two-section text-center">
        <h2 className="section-two-title">Style 2</h2>
        <p className="section-two-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore lacus vel facilisis.
        </p>
      </div>
      <Row className="g-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <ProductCard {...product} /> {/* Pass product data correctly */}
            </Col>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductListTwo;
