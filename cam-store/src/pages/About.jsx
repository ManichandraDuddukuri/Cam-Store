// src/pages/About.jsx
import "./About.css";

export default function About() {
  return (
    <main className="about-page container fade-up">
      <div className="about-hero">
        <p className="hero-eyebrow">Our Story</p>
        <h1 className="about-title">Gear for those who<br /><em>see differently</em></h1>
      </div>

      <div className="about-grid">
        <div className="about-text">
          <p>CamStore was founded by photographers for photographers. We believe the right gear shouldn't come with friction — just great products, honest pricing, and real expertise.</p>
          <p>From DSLRs to mirrorless systems, film cameras to action cams, we stock only what we'd carry ourselves. Every product is tested, every spec is accurate, every price is fair.</p>
        </div>

        <div className="about-stats">
          {[
            { val: "12+", label: "Years in business" },
            { val: "500+", label: "Products stocked" },
            { val: "98%", label: "Customer satisfaction" },
            { val: "24h", label: "Support response" },
          ].map(({ val, label }) => (
            <div className="stat-box" key={label}>
              <span className="stat-val">{val}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-values">
        {[
          { icon: "🎯", title: "Curated Selection", desc: "We only list products we genuinely recommend. No filler, no fake reviews." },
          { icon: "🔍", title: "Spec Accuracy", desc: "Every spec is sourced directly from manufacturers and verified by our team." },
          { icon: "🚚", title: "Fast Shipping", desc: "Free shipping on orders over $500. Most orders ship same day." },
          { icon: "🤝", title: "Expert Support", desc: "Real photographers answer your questions. No bots, no scripts." },
        ].map(({ icon, title, desc }) => (
          <div className="value-card" key={title}>
            <span className="value-icon">{icon}</span>
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
