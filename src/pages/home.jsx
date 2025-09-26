import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/home.css";
import products from "../data/products";
import { useCart } from "../context/CartContext"; // ✅ import context

function Home() {
  
  const newArrivals = products.filter(p => p.tags.includes("new"));
  const limitedEdition = products.filter(p => p.tags.includes("limited"));
  const clearanceSale = products.filter(p => p.tags.includes("clearance"));

  return (
    <div className="home">
      {/* HERO SECTION */}
      <section className="hero">
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop
        >
          <SwiperSlide>
            <div className="hero-slide">
              <img src="/images/banner1.jpg" alt="Banner 1" />
              <div className="hero-content">
                <h1>Glow Naturally</h1>
                <p>Discover our Vitamin C Collection for radiant skin.</p>
                <Link to="/shop" className="hero-btn">Shop Now</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-slide">
              <img src="/images/banner2.jpg" alt="Banner 2" />
              <div className="hero-content">
                <h1>Feel Refreshed</h1>
                <p>Our Tea Tree range is perfect for clear, healthy skin.</p>
                <Link to="/shop" className="hero-btn">Shop Now</Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero-slide">
              <img src="/images/banner3.jpg" alt="Banner 3" />
              <div className="hero-content">
                <h1>Indulge Yourself</h1>
                <p>Pamper your skin with our Shea Body Butter.</p>
                <Link to="/shop" className="hero-btn">Shop Now</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* PRODUCT SECTIONS */}
      <ProductSection title="New Arrivals" link="/shop/new" products={newArrivals} />
      <ProductSection title="Limited Edition" link="/shop/limited" products={limitedEdition} />
      <ProductSection title="Clearance Sale" link="/shop/clearance" products={clearanceSale} isClearance />
    </div>
  );
}

/* 🔹 Product Section with Add to Cart */
function ProductSection({ title, link, products, isClearance = false }) {
  const { addToCart, increaseQuantity, decreaseQuantity, cartItems } = useCart();

  return (
    <section className="product-section">
      <div className="section-header">
        <h2>{title}</h2>
        <Link to={link}>View All →</Link>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {products.map((item) => {
          const cartItem = cartItems.find((ci) => ci.id === item.id);
          const quantity = cartItem ? cartItem.quantity : 0;

          return (
            <SwiperSlide key={item.id}>
              <div className="product-card">
                <img src={item.image} alt={item.name} />
                <p className="product-name">{item.name}</p>

                {!isClearance && <p className="product-price">Rs {item.price}</p>}

                {isClearance && (
                  <>
                    <p className="product-discount">Rs {item.price}</p>
                    <p className="product-original">Rs {item.originalPrice}</p>
                  </>
                )}

                {/* 🔹 Add to Cart OR Quantity Counter */}
                {quantity === 0 ? (
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="quantity-control">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

export default Home;
