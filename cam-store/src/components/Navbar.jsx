// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartDrawer from "./CartDrawer";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  }

  return (
    <>
      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="logo">
            <span className="logo-icon">⬡</span>
            <span>CAM<strong>STORE</strong></span>
          </Link>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cameras, lenses…"
              className="search-input"
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </form>

          <nav className="nav-links">
            <Link to="/" className="nav-link">Catalog</Link>
            <Link to="/about" className="nav-link">About</Link>
            <button className="cart-btn" onClick={() => setDrawerOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
            </button>
          </nav>
        </div>
      </header>
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
