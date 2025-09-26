import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../styles/header.css";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import CartSidebar from "../components/cartsidebar";

function Header() {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 🔽 control dropdown open/close in side menu
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  return (
    <header className="header">
      {/* Top bar */}
      <div className="header-top">
        <p>FREE SHIPPING ON ORDERS OVER PKR 5000</p>
      </div>

      {/* Main header */}
      <div className="header-main">
        {/* Hamburger */}
        <button
          className="hamburger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Logo */}
        <div className="header-logo">
          <Link to="/">THE BODY SHOP</Link>
        </div>

        {/* Cart */}
        <div className="header-icons">
          <button onClick={() => setIsCartOpen(true)} className="cart-btn">
            <FaShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="cart-badge">{cartItems.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out menu */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
          ✕
        </button>
        <nav>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop All</Link>

        {/* Collapsible Categories */}
        <div 
          className="menu-item" 
          onClick={() => setCategoriesOpen(!categoriesOpen)}
        >
          <span>
            Categories {categoriesOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
          </span>
        </div>

        {categoriesOpen && (
          <div className="dropdown-links">
            <Link to="/shop/skincare" onClick={() => setIsMenuOpen(false)}>Skincare</Link>
            <Link to="/shop/haircare" onClick={() => setIsMenuOpen(false)}>Haircare</Link>
            <Link to="/shop/body" onClick={() => setIsMenuOpen(false)}>Body Care</Link>
            <Link to="/shop/fragrance" onClick={() => setIsMenuOpen(false)}>Fragrance</Link>
            <Link to="/shop/gift" onClick={() => setIsMenuOpen(false)}>Gift Sets</Link>
            <Link to="/shop/homeliving" onClick={() => setIsMenuOpen(false)}>Home & Living</Link>
          </div>
        )}

        {/* Extra nav links */}
        <Link to="/shop/new" onClick={() => setIsMenuOpen(false)}>New Arrivals</Link>
        <Link to="/shop/limited" onClick={() => setIsMenuOpen(false)}>Limited</Link>
        <Link to="/shop/clearance" onClick={() => setIsMenuOpen(false)}>Clearance</Link>
        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
      </nav>

      </div>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}

export default Header;
