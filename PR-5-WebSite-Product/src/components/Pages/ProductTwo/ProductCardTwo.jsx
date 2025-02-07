import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { RiShoppingBagLine } from "react-icons/ri";
import "./ProductCardTwo.css";

const ProductCardTwo = ({
  image = "",
  category = "",
  rating = 0, // Default value to prevent undefined errors
  title = "",
  price = "",
  originalPrice = "",
}) => {
  return (
    <>
      
      <div>
        <Container className="product-two-container">
          <Card className="product-two-card shadow-sm border-1 text-center">
            <div className="product-two-image-container">
              <Card.Img
                variant="top"
                src={image}
                alt={title}
                className="product-two-image border-1"
              />
            </div>
            {/* {isHover&& <p>show</p>

            } */}

            <Card.Body className="card-two-body position-relative">
              <div className="cart-two-icon">
                <Button variant="light" className="rounded-circle">
                  <RiShoppingBagLine />
                </Button>
              </div>
              <p className="product-two-category">{category}</p>
              <div className="product-two-rating">
                {"⭐".repeat(Math.floor(rating))}
                {rating % 1 !== 0 ? "⭐".slice(0, 1) : ""}
                <span> ({rating.toFixed(1)})</span>
              </div>
              <Card.Title className="product-two-title">{title}</Card.Title>
              <p className="product-two-price">
                <strong>${price}</strong>{" "}
                <span className="original-price">${originalPrice}</span>
              </p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default ProductCardTwo;
