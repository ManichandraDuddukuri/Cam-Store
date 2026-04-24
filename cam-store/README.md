# 📷 CamStore — React Camera E-Commerce

A responsive, dark-themed camera store built with React. Features a live product catalog, shopping cart, dynamic filtering, and product detail pages.

## ✨ Features
- **Catalog** with category filter, price range slider, in-stock toggle, sort options, and search
- **Product Detail** pages with specs, qty selector, and add-to-cart
- **Cart Drawer** with live qty controls, persistent storage (localStorage), and running total
- **Simulated JSON API** — swap `src/data/products.js` fetch for a real endpoint
- **Responsive** mobile-first layout
- **Dark aesthetic** with smooth animations and hover effects

## 🚀 Local Development

```bash
npm install
npm start
```

## 🌐 Deploy to GitHub Pages

### Step 1 — Update `package.json`
Replace the `homepage` field with your own:
```json
"homepage": "https://<YOUR_USERNAME>.github.io/cam-store"
```

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/<YOUR_USERNAME>/cam-store.git
git push -u origin main
```

### Step 3 — Deploy
```bash
npm run deploy
```

This runs `npm run build` then pushes the `build/` folder to the `gh-pages` branch automatically.

### Step 4 — Enable GitHub Pages
1. Go to your repo → **Settings** → **Pages**
2. Set source to **Deploy from a branch** → branch: `gh-pages`, folder: `/ (root)`
3. Save — your site will be live in ~1 minute at the homepage URL.

> **Note:** The app uses `HashRouter` (URLs like `/#/product/1`) so GitHub Pages routing works without a custom 404 redirect.

## 📁 Project Structure

```
cam-store/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / .css
│   │   ├── CartDrawer.jsx / .css
│   │   ├── ProductCard.jsx / .css
│   │   └── Footer.jsx / .css
│   ├── data/
│   │   └── products.js       ← mock API, swap for real fetch
│   ├── hooks/
│   │   └── useCart.js        ← cart context + reducer + localStorage
│   ├── pages/
│   │   ├── Catalog.jsx / .css
│   │   ├── ProductDetail.jsx / .css
│   │   └── About.jsx / .css
│   ├── App.jsx
│   ├── index.js
│   └── index.css
└── package.json
```

## 🔌 Connecting a Real API

In `src/data/products.js`, replace the `fetchProducts` function:

```js
export async function fetchProducts() {
  const res = await fetch("https://your-api.com/products");
  return res.json();
}
```

Make sure your API returns objects matching the product schema used in the components.
