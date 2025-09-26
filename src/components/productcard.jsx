import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/productcard.css";

function ProductCard({ product }) {
  const { addToCart, cartItems, increaseQuantity, decreaseQuantity } = useCart();

  // Find if product is already in cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="product-card">
      {/* Image Section */}
      <div className="product-img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="product-img" />
        </Link>
      </div>

      {/* Card Content */}
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-title">
          {product.name}
        </Link>

        {/* Price */}
        <p className="product-price">
          <span className="current-price">Rs. {product.price}</span>
          {product.originalPrice && (
            <span className="old-price">Rs. {product.originalPrice}</span>
          )}
        </p>

        {/* Add to Cart / Quantity Control */}
        {quantity === 0 ? (
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart({ ...product, quantity: 1 })}
          >
            Add to Cart
          </button>
        ) : (
          <div className="quantity-control">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="qty-btn"
            >
              −
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              onClick={() => increaseQuantity(product.id)}
              className="qty-btn"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
