import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { Container, Row, Col } from "react-bootstrap";
import "./ProductList.css";

const ProductList = () => {
  const [products] = useState([
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/9.jpg",
      category: "Snacks",
      rating: 5.0,
      title: "Best snacks with hazelnut 200gm",
      price: 145,
      originalPrice: 150,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/2.jpg",
      category: "Fruits",
      rating: 4.5,
      title: "Fresh organic apple 1kg simla marming",
      price: 120.25,
      originalPrice: 123.25,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/3.jpg",
      category: "Fruits",
      rating: 3.2,
      title: "Organic fresh vanilla farm watermelon 5kg",
      price: 50.3,
      originalPrice: 72.6,
    },
    {
      image:
        "https://maraviyainfotech.com/projects/carrot/carrot-v2/carrot-html/assets/img/product/10.jpg",
      category: "Snacks",
      rating: 5.0,
      title: "Sweet crunchy nut mix 250gm pack",
      price: 120.25,
      originalPrice: 123.25,
    },
  ]);

  return (
    <>
      <div className="product-dec">
        <div className="container d-flex justify-content-between align-items-center py-2">
        <h3 className="mb-0">Product</h3>
        <p className="product-home mb-0">
          Home <span>- Product</span>
        </p>
        </div>
      </div>
    <Container className="product-container">
      <div className="product-section text-center">
        <h2 className="section-title">Style 1</h2>
        <p className="section-subtitle">
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
    </>
  );
};

export default ProductList;
