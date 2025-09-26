// CartSidebar.jsx
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/cartSidebar.css"; // create a CSS file for styling

export default function CartSidebar({ isOpen, onClose }) {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">Rs. {item.price}</p>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="cart-footer">
          <p className="total">Total: Rs. {total}</p>

          <button
            className="checkout-btn"
            onClick={() => {
              onClose(); // close sidebar
              navigate("/cart"); // ✅ navigate directly
            }}
          >
            View Cart
          </button>

          <button
            className="checkout-btn"
            onClick={() => {
              onClose(); // close sidebar
              navigate("/checkout"); // ✅ navigate directly
            }}
          >
            Proceed to Checkout
          </button>
          
        </div>
      </div>
    </>
  );
}
