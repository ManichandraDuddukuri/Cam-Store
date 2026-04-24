// src/pages/Catalog.jsx
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchProducts, CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Catalog.css";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "A → Z" },
];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [priceMax, setPriceMax] = useState(10000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    list = list.filter((p) => p.price <= priceMax);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case "price-asc":  return list.sort((a,b) => a.price - b.price);
      case "price-desc": return list.sort((a,b) => b.price - a.price);
      case "rating":     return list.sort((a,b) => b.rating - a.rating);
      case "name":       return list.sort((a,b) => a.name.localeCompare(b.name));
      default:           return list;
    }
  }, [products, category, sort, priceMax, inStockOnly, searchQuery]);

  return (
    <main className="catalog-page">
      {/* Hero */}
      <section className="catalog-hero">
        <div className="container">
          <p className="hero-eyebrow">Professional Gear</p>
          <h1 className="hero-title">
            Capture Every<br /><em>Perfect Moment</em>
          </h1>
          <p className="hero-sub">
            {products.length} cameras, lenses & accessories — in stock and ready to ship
          </p>
        </div>
      </section>

      <div className="container catalog-layout">
        {/* Sidebar filters */}
        <aside className="sidebar">
          <div className="filter-group">
            <h4 className="filter-label">Category</h4>
            <div className="category-pills">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  className={`pill ${category === c ? "active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-label">Max Price <span className="filter-val">${priceMax.toLocaleString()}</span></h4>
            <input
              type="range" min={50} max={10000} step={50}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="range-slider"
            />
            <div className="range-labels"><span>$50</span><span>$10,000</span></div>
          </div>

          <div className="filter-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
              <span>In Stock Only</span>
            </label>
          </div>

          <button className="btn btn-ghost reset-btn" onClick={() => {
            setCategory("All"); setSort("featured"); setPriceMax(10000); setInStockOnly(false);
          }}>
            Reset Filters
          </button>
        </aside>

        {/* Grid */}
        <div className="catalog-main">
          <div className="catalog-toolbar">
            <p className="result-count">
              {searchQuery && <span>Results for "<strong>{searchQuery}</strong>" — </span>}
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="sort-select">
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div className="spinner" />
          ) : filtered.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <p>No products found</p>
              <small>Try adjusting your filters</small>
            </div>
          ) : (
            <div className="product-grid">
              {filtered.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 0.05}s` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
