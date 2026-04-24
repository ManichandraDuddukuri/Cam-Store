// src/components/ProductCard.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd(e) {
    e.preventDefault();
    if (!product.inStock) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="card-image-wrap">
        <img src={product.image} alt={product.name} className="card-img" loading="lazy" />
        {product.badge && (
          <span className={`badge card-badge ${!product.inStock ? "badge-out" : ""}`}>
            {product.badge}
          </span>
        )}
        {discount && <span className="discount-pill">−{discount}%</span>}
        {!product.inStock && <div className="out-overlay">Out of Stock</div>}
      </div>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-brand">{product.brand}</span>
          <span className="card-category">{product.category}</span>
        </div>
        <h3 className="card-name">{product.name}</h3>

        <div className="card-rating">
          <Stars rating={product.rating} />
          <span className="card-reviews">({product.reviews})</span>
        </div>

        <div className="card-footer">
          <div className="card-pricing">
            <span className="card-price">${product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="card-original">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            className={`add-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
            disabled={!product.inStock}
          >
            {added ? "✓" : "+"}
          </button>
        </div>
      </div>
    </Link>
  );
}

function Stars({ rating }) {
  return (
    <div className="stars" title={`${rating}/5`}>
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? "star filled" : "star"}>★</span>
      ))}
      <span className="rating-val">{rating}</span>
    </div>
  );
}
