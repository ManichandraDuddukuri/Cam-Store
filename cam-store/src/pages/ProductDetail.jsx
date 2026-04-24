// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../data/products";
import { useCart } from "../hooks/useCart";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(setProduct)
      .catch(() => setError("Product not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="spinner" style={{ marginTop: 120 }} />;
  if (error) return (
    <div className="detail-error">
      <p>😕 {error}</p>
      <Link to="/" className="btn btn-primary">Back to Catalog</Link>
    </div>
  );

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const specEntries = Object.entries(product.specs);

  return (
    <main className="detail-page container">
      <Link to="/" className="breadcrumb">← Back to Catalog</Link>

      <div className="detail-grid fade-up">
        {/* Image */}
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
          {product.badge && (
            <span className={`badge detail-badge ${!product.inStock ? "badge-out" : ""}`}>{product.badge}</span>
          )}
          {discount && <span className="discount-pill">−{discount}%</span>}
        </div>

        {/* Info */}
        <div className="detail-info">
          <div className="detail-brand-row">
            <span className="detail-brand">{product.brand}</span>
            <span className="detail-category">{product.category}</span>
          </div>

          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating-row">
            <DetailStars rating={product.rating} />
            <span className="detail-reviews">{product.reviews} reviews</span>
          </div>

          <p className="detail-description">{product.description}</p>

          {/* Specs */}
          <div className="specs-grid">
            {specEntries.map(([key, val]) => (
              <div className="spec-cell" key={key}>
                <span className="spec-key">{key}</span>
                <span className="spec-val">{val}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="detail-price-row">
            <span className="detail-price">${product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="detail-original">${product.originalPrice.toLocaleString()}</span>
            )}
            {discount && <span className="detail-save">Save {discount}%</span>}
          </div>

          {/* Stock */}
          <div className={`stock-indicator ${product.inStock ? "in" : "out"}`}>
            <span className="stock-dot" />
            {product.inStock ? `In Stock (${product.quantity} left)` : "Out of Stock"}
          </div>

          {/* Quantity + Add */}
          {product.inStock && (
            <div className="detail-actions">
              <div className="qty-selector">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <input
                  type="number" min={1} max={product.quantity}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Math.min(product.quantity, Number(e.target.value))))}
                />
                <button onClick={() => setQty(Math.min(product.quantity, qty + 1))}>+</button>
              </div>
              <button className={`btn btn-primary add-cart-btn ${added ? "added" : ""}`} onClick={handleAdd}>
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>
          )}

          <div className="detail-perks">
            <span>🚚 Free shipping over $500</span>
            <span>↩ 30-day returns</span>
            <span>🔒 Secure checkout</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function DetailStars({ rating }) {
  return (
    <div className="detail-stars">
      {[1,2,3,4,5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "var(--accent)" : "var(--border)", fontSize: 18 }}>★</span>
      ))}
      <span style={{ marginLeft: 6, fontSize: 14, color: "var(--muted)" }}>{rating}</span>
    </div>
  );
}
