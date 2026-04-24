// src/data/products.js
// Simulates a live JSON API response — replace fetch URL with a real endpoint when ready

export const CATEGORIES = ["All", "DSLR", "Mirrorless", "Film", "Action", "Lenses", "Accessories"];

export const products = [
  {
    id: 1,
    name: "Canon EOS R5",
    brand: "Canon",
    category: "Mirrorless",
    price: 3899,
    originalPrice: 4299,
    rating: 4.9,
    reviews: 312,
    inStock: true,
    quantity: 8,
    badge: "Best Seller",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80",
    specs: { megapixels: "45MP", video: "8K RAW", iso: "100-51200", fps: "20fps" },
    description: "Full-frame mirrorless powerhouse with 45MP sensor and 8K video."
  },
  {
    id: 2,
    name: "Sony A7 IV",
    brand: "Sony",
    category: "Mirrorless",
    price: 2498,
    originalPrice: 2799,
    rating: 4.8,
    reviews: 521,
    inStock: true,
    quantity: 15,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=500&q=80",
    specs: { megapixels: "33MP", video: "4K60", iso: "100-51200", fps: "10fps" },
    description: "Hybrid photography powerhouse balancing stills and video."
  },
  {
    id: 3,
    name: "Nikon Z6 III",
    brand: "Nikon",
    category: "Mirrorless",
    price: 2196,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 198,
    inStock: true,
    quantity: 6,
    badge: "New",
    image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&q=80",
    specs: { megapixels: "24.5MP", video: "6K RAW", iso: "100-64000", fps: "20fps" },
    description: "Partially stacked sensor for blazing speed and stunning video."
  },
  {
    id: 4,
    name: "Canon EOS 90D",
    brand: "Canon",
    category: "DSLR",
    price: 1199,
    originalPrice: 1399,
    rating: 4.6,
    reviews: 445,
    inStock: true,
    quantity: 12,
    badge: null,
    image: "https://images.unsplash.com/photo-1584038877214-c3f35c28f7c7?w=500&q=80",
    specs: { megapixels: "32.5MP", video: "4K", iso: "100-25600", fps: "10fps" },
    description: "The definitive APS-C DSLR for enthusiast photographers."
  },
  {
    id: 5,
    name: "Fujifilm X-T5",
    brand: "Fujifilm",
    category: "Mirrorless",
    price: 1699,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 276,
    inStock: true,
    quantity: 9,
    badge: "Fan Favorite",
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500&q=80",
    specs: { megapixels: "40MP", video: "6.2K", iso: "125-12800", fps: "15fps" },
    description: "Compact retro body packing a 40MP sensor with film simulations."
  },
  {
    id: 6,
    name: "GoPro Hero 12",
    brand: "GoPro",
    category: "Action",
    price: 399,
    originalPrice: 449,
    rating: 4.5,
    reviews: 892,
    inStock: true,
    quantity: 34,
    badge: null,
    image: "https://images.unsplash.com/photo-1547619292-240b769f7b39?w=500&q=80",
    specs: { megapixels: "27MP", video: "5.3K60", iso: "100-6400", fps: "240fps" },
    description: "Waterproof action camera for extreme adventures."
  },
  {
    id: 7,
    name: "Pentax K-3 Mark III",
    brand: "Pentax",
    category: "DSLR",
    price: 1996,
    originalPrice: 2199,
    rating: 4.6,
    reviews: 134,
    inStock: false,
    quantity: 0,
    badge: "Out of Stock",
    image: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=500&q=80",
    specs: { megapixels: "25.73MP", video: "4K", iso: "100-1600000", fps: "12fps" },
    description: "APS-C flagship DSLR with cutting-edge sensor technology."
  },
  {
    id: 8,
    name: "Sony FE 85mm f/1.4",
    brand: "Sony",
    category: "Lenses",
    price: 1798,
    originalPrice: 1998,
    rating: 4.9,
    reviews: 389,
    inStock: true,
    quantity: 7,
    badge: "Premium",
    image: "https://images.unsplash.com/photo-1606986628253-0a3f43439e4a?w=500&q=80",
    specs: { mount: "Sony E", aperture: "f/1.4", filter: "77mm", weight: "820g" },
    description: "Exceptional portrait lens with creamy bokeh and razor sharpness."
  },
  {
    id: 9,
    name: "Leica M11",
    brand: "Leica",
    category: "Film",
    price: 8995,
    originalPrice: 8995,
    rating: 4.8,
    reviews: 67,
    inStock: true,
    quantity: 3,
    badge: "Luxury",
    image: "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=500&q=80",
    specs: { megapixels: "60MP", video: "None", iso: "64-50000", fps: "4.5fps" },
    description: "The rangefinder legend, now with a 60MP BSI sensor."
  },
  {
    id: 10,
    name: "Peak Design Capture Clip",
    brand: "Peak Design",
    category: "Accessories",
    price: 79,
    originalPrice: 99,
    rating: 4.7,
    reviews: 1203,
    inStock: true,
    quantity: 55,
    badge: "Sale",
    image: "https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=500&q=80",
    specs: { material: "Aluminum", weight: "88g", compatibility: "Universal", warranty: "Lifetime" },
    description: "Fastest, most secure camera carry system on the planet."
  },
  {
    id: 11,
    name: "DJI Osmo Pocket 3",
    brand: "DJI",
    category: "Action",
    price: 519,
    originalPrice: 599,
    rating: 4.8,
    reviews: 456,
    inStock: true,
    quantity: 20,
    badge: "Hot",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80",
    specs: { megapixels: "1inch", video: "4K120", iso: "100-6400", fps: "120fps" },
    description: "Tiny 3-axis gimbal camera with a 1-inch sensor."
  },
  {
    id: 12,
    name: "Canon RF 50mm f/1.2L",
    brand: "Canon",
    category: "Lenses",
    price: 2299,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 211,
    inStock: true,
    quantity: 5,
    badge: "L-Series",
    image: "https://images.unsplash.com/photo-1580745089573-9f4cf8c21bb9?w=500&q=80",
    specs: { mount: "Canon RF", aperture: "f/1.2", filter: "77mm", weight: "1050g" },
    description: "The fastest 50mm for the RF system, optically superb."
  }
];

// Simulate an async API fetch
export async function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 600);
  });
}

export async function fetchProductById(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const p = products.find((p) => p.id === Number(id));
      p ? resolve(p) : reject(new Error("Product not found"));
    }, 400);
  });
}
