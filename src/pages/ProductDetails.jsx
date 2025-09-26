import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import products from "../data/products";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } = useCart();

  if (!product) return <h2 className="text-center mt-5">Product not found</h2>;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Reviews
  const [reviews, setReviews] = useState([
    { name: "guest678", comment: "Loved the texture, my skin feels amazing!" },
    { name: "guest037", comment: "Affordable and works like magic. Highly recommend!" },
  ]);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const handleAddReview = (e) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      setReviews([...reviews, { name: reviewName, comment: reviewComment }]);
      setReviewName("");
      setReviewComment("");
    }
  };

  return (
    <Container className="my-5">
      <Row className="g-5">
        {/* Product Image */}
        <Col md={6} className="d-flex justify-content-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "450px", objectFit: "cover" }}
          />
        </Col>

        {/* Product Details */}
        <Col md={6}>
          <h2 className="fw-bold">{product.name}</h2>
          <p className="text-muted">
            {product.description || "No description available."}
          </p>
          <h4 className="text-success fw-bold">Rs {product.price}</h4>
          <p>
            <strong>Key Ingredients:</strong>{" "}
            {product.ingredients || "Not specified"}
          </p>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            className="me-3 mb-2"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            Add to Cart
          </Button>

          {/* Quantity Counter (only shows if in cart) */}
          {quantity > 0 && (
            <div className="d-inline-flex align-items-center">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => decreaseQuantity(product.id)}
              >
                −
              </Button>
              <span className="mx-2 fw-bold">{quantity}</span>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </Button>
            </div>
          )}
        </Col>
      </Row>

      {/* Reviews Section */}
      <Row className="mt-5">
        <Col md={8} className="mx-auto">
          <h3 className="mb-4 text-center">Customer Reviews</h3>

          {reviews.map((rev, index) => (
            <Card key={index} className="mb-3 shadow-sm border-0">
              <Card.Body>
                <Card.Title className="fw-bold">{rev.name}</Card.Title>
                <Card.Text>"{rev.comment}"</Card.Text>
              </Card.Body>
            </Card>
          ))}

          <Card className="mt-4 shadow-sm border-0">
            <Card.Body>
              <h5 className="mb-3">Leave a Review</h5>
              <Form onSubmit={handleAddReview}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Your Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button type="submit" variant="success">
                  Submit Review
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
