// src/pages/Checkout.jsx
import { useCart } from "../context/CartContext";
import { useState } from "react";
import "../styles/checkout.css";

export default function Checkout() {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Order Placed:", {
      ...formData,
      paymentMethod,
      cartItems,
      total,
    });

    alert("Order placed successfully!");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        {/* Customer Info */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Billing Information</h2>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>

          {/* Payment Options */}
          <h2>Payment Method</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={paymentMethod === "bank"}
                onChange={() => setPaymentMethod("bank")}
              />
              Bank Transfer
            </label>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Your Order</h2>
          {cartItems.length === 0 ? (
            <p>No items in cart.</p>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="summary-item">
                  <div className="summary-item-info">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="summary-item-img"
                    />
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                  </div>
                  <span>Rs. {item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
          <hr />
          <p className="order-total">
            <strong>Total: Rs. {total}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
