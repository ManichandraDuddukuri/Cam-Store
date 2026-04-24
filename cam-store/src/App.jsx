// src/App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./hooks/useCart";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}
