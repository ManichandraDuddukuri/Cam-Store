// src/components/CartDrawer.jsx
import { useCart } from "../hooks/useCart";
import "./CartDrawer.css";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQty, clearCart, totalPrice } = useCart();

  return (
    <>
      <div className={`drawer-overlay ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`cart-drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <h2>Your Cart <span className="drawer-count">({cart.length})</span></h2>
          <button className="drawer-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="drawer-empty">
            <span className="empty-icon">📷</span>
            <p>Your cart is empty</p>
            <small>Add some gear to get started</small>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {cart.map((item) => (
                <div className="drawer-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="drawer-img" />
                  <div className="drawer-item-info">
                    <p className="drawer-item-name">{item.name}</p>
                    <p className="drawer-item-price">${(item.price * item.qty).toLocaleString()}</p>
                    <div className="qty-controls">
                      <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6 6 18M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="drawer-total">
                <span>Total</span>
                <strong>${totalPrice.toLocaleString()}</strong>
              </div>
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Checkout →
              </button>
              <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
