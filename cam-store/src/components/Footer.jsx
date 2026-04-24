// src/components/Footer.jsx
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">⬡</span>
          <span className="footer-name">CAM<strong>STORE</strong></span>
          <p>Professional cameras & gear for every level.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Catalog</Link>
          <Link to="/about">About</Link>
          <span className="footer-copy">© {new Date().getFullYear()} CamStore</span>
        </div>
      </div>
    </footer>
  );
}
