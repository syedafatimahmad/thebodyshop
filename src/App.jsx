import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/checkout";

function App() {
  return (
    <>
      
      {/* Background Video */}
      <div className="video-background">
        <video autoPlay muted loop playsInline>
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
      </div>

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />


          {/* Fallback for unknown routes */}
          <Route path="*" element={<h2 style={{ padding: "2rem" }}>Page Not Found</h2>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
