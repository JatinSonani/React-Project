
import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { RiShoppingBagLine, RiHeartLine } from "react-icons/ri";
import "./ProductCard.css";

const ProductCard = ({
  image = "",
  category = "",
  rating = 0,
  title = "",
  price = "",
  originalPrice = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container className="product-container">
      <Card className="product-card shadow-sm border-1 text-center">
        <div
          className="product-image-container position-relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Card.Img
            variant="top"
            src={image}
            alt={title}
            className="product-image border-1"
          />
          {isHovered && (
            <Button variant="light" className="wishlist-icon rounded-circle">
              <RiHeartLine />
            </Button>
            
          )}
        </div>
        <Card.Body className="card-body position-relative">
          <div className="cart-icon">
            <Button variant="light" className="rounded-circle">
              <RiShoppingBagLine />
            </Button>
          </div>
          <p className="product-category">{category}</p>
          <div className="product-rating">
            {"⭐".repeat(Math.floor(rating))}
            {rating % 1 !== 0 ? "⭐".slice(0, 1) : ""}
            <span> ({rating.toFixed(1)})</span>
          </div>
          <Card.Title className="product-title">{title}</Card.Title>
          <p className="product-price">
            <strong>${price}</strong>{" "}
            <span className="original-price">${originalPrice}</span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductCard;
