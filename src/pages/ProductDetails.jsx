import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/products";
import "../styles/productdetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id, 10));
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
    const name = reviewName.trim();
    const comment = reviewComment.trim();
    if (!name || !comment) return;
    setReviews((prev) => [...prev, { name, comment }]);
    setReviewName("");
    setReviewComment("");
  };

  const handleAddToCart = () => {
    // Most contexts accept a product object — keep what worked for your cart.
    // If your CartContext expects an id, change to addToCart(product.id)
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="product-details-card">
      <div className="product-details">
        {/* Product Image */}
        <div className="product-details-img">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Product Info */}
        <div className="product-details-info">
          <h2>{product.name}</h2>
          <p className="category">{product.description || "No description available."}</p>
          <div className="price">Rs {product.price}</div>
          <p>
            <strong>Key Ingredients:</strong> {product.ingredients || "Not specified"}
          </p>

          {/* Quantity & Cart Controls */}
          <div className="quantity-control">
            {quantity > 0 && (
              <>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => decreaseQuantity(product.id)}
                >
                  −
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </>
            )}
          </div>

          {/* Place Add to Cart outside quantity-control so it's not affected by qty styling */}
          {quantity === 0 ? (
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <div style={{ marginTop: 8 }}>
              <button
                type="button"
                className="add-to-cart-btn"
                onClick={() => increaseQuantity(product.id)}
              >
                Add one more
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>

        {reviews.map((rev, index) => (
          <div key={index} className="review-card">
            <div className="review-user">{rev.name}</div>
            <div className="review-comment">"{rev.comment}"</div>
          </div>
        ))}

        {/* Review Form */}
        <form className="review-form" onSubmit={handleAddReview}>
          <label>
            Your Name
            <input
              type="text"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
            />
          </label>
          <label>
            Your Review
            <textarea
              rows={3}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="add-to-cart-btn">
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
