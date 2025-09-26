import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/productcard";
import "../styles/shop.css";
import products from "../data/products";

function Shop() {
  const { category } = useParams();

  
  const categoryMap = {
    skincare: "Skincare",
    haircare: "Haircare",
    body: "Bodycare",
    fragrance: "Fragrance",
    gift: "Gifts",
    homeliving: "Home & Living",
  };

  const selectedCategory = category ? categoryMap[category] : null;

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <div className="shop container">
      <h1 className="shop-title">
        {selectedCategory ? `${selectedCategory} Products` : "Shop All Products"}
      </h1>
      <div className="shop-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filteredProducts.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}

export default Shop;
