import React from "react";
import { Card, Button, Container } from "react-bootstrap";
import { RiShoppingBagLine } from "react-icons/ri";
import "./ProductCardThree.css";

const ProductCardThree = ({
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
        <Container className="product-three-container">
          <Card className="product-three-card shadow-sm border-1 text-center">
            <div className="product-image-container">
              <Card.Img
                variant="top"
                src={image}
                alt={title}
                className="product-three-image border-1"
              />
            </div>
            {/* {isHover&& <p>show</p>

            } */}

            <Card.Body className="card-three-body position-relative">
              <div className="cart-three-icon">
                <Button variant="light" className="rounded-circle">
                  <RiShoppingBagLine />
                </Button>
              </div>
              <p className="product-three-category">{category}</p>
              <div className="product-three-rating">
                {"⭐".repeat(Math.floor(rating))}
                {rating % 1 !== 0 ? "⭐".slice(0, 1) : ""}
                <span> ({rating.toFixed(1)})</span>
              </div>
              <Card.Title className="product-three-title">{title}</Card.Title>
              <p className="product-three-price">
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

export default ProductCardThree;
