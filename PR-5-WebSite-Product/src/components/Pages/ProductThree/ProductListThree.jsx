import React, { useState } from "react";
import ProductCard from "./ProductCardThree";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductListThree.css";

const ProductListThree = () => {
  const [products] = useState([
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/1.jpg",
      category: "Organic Fresh Lemon",
      rating: 5.0,
      title: "Lorem ipsum dolor impicit adipisicing elit.",
      price: 145,
      originalPrice: 150,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/2.jpg",
      category: "Organic Fresh apple juice",
      rating: 4.5,
      title: "Lorem ipsum dolor impicit adipisicing elit.",
      price: 120.25,
      originalPrice: 123.25,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/3.jpg",
      category: "Organic watermelon 5kg",
      rating: 3.2,
      title: "Lorem ipsum dolor impicit adipisicing elit.",
      price: 50.3,
      originalPrice: 72.6,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/4.jpg",
      category: "Organic fresh venila farm",
      rating: 5.0,
      title: "Lorem ipsum dolor impicit adipisicing elit.",
      price: 120.25,
      originalPrice: 123.25,
    },
  ]);

  return (
    <Container className="product-three-container">
      <div className="product-three-section text-center">
        <h2 className="section-three-title">Style 3</h2>
        <p className="section-three-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore lacus vel facilisis.
        </p>
      </div>
      <Row className="g-4">
        {products.length > 0 ? (
          products.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
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

export default ProductListThree;
