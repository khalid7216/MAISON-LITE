export const PRODUCTS = [
  { id: 1,  name: "Obsidian Slip Dress",       price: 289, orig: 389, cat: "Dresses",     badge: "New",        rating: 4.8, reviews: 42, emoji: "👗", hue: "#6b2d4e" },
  { id: 2,  name: "Midnight Tailored Blazer",  price: 445, orig: null,cat: "Outerwear",   badge: "Bestseller", rating: 4.9, reviews: 87, emoji: "🥼", hue: "#1a1a2e" },
  { id: 3,  name: "Cashmere Veil Turtleneck",  price: 198, orig: null,cat: "Tops",        badge: "",           rating: 4.7, reviews: 56, emoji: "👕", hue: "#2c2418" },
  { id: 4,  name: "Palazzo Wide-Leg Trousers", price: 262, orig: 312, cat: "Bottoms",     badge: "Sale",       rating: 4.6, reviews: 33, emoji: "👖", hue: "#1a2030" },
  { id: 5,  name: "Linen Atelier Dress",       price: 225, orig: null,cat: "Dresses",     badge: "",           rating: 4.5, reviews: 29, emoji: "👔", hue: "#2a1f14" },
  { id: 6,  name: "Onyx Kitten Mules",         price: 178, orig: null,cat: "Shoes",       badge: "New",        rating: 4.8, reviews: 61, emoji: "👠", hue: "#0d0d0d" },
  { id: 7,  name: "Graphite Merino Coat",      price: 680, orig: null,cat: "Outerwear",   badge: "",           rating: 4.9, reviews: 44, emoji: "🧥", hue: "#1c1c1c" },
  { id: 8,  name: "18K Gold Sculptured Cuff",  price: 295, orig: null,cat: "Accessories", badge: "",           rating: 4.4, reviews: 18, emoji: "📿", hue: "#3d2e00" },
  { id: 9,  name: "Satin Bias-Cut Skirt",      price: 195, orig: 280, cat: "Bottoms",     badge: "Sale",       rating: 4.6, reviews: 37, emoji: "🩱", hue: "#2d1a2e" },
  { id: 10, name: "Ivory Silk Blouse",         price: 165, orig: null,cat: "Tops",        badge: "New",        rating: 4.7, reviews: 51, emoji: "👚", hue: "#2a2218" },
  { id: 11, name: "Pointed Leather Boots",     price: 420, orig: null,cat: "Shoes",       badge: "Bestseller", rating: 4.9, reviews: 92, emoji: "👢", hue: "#1a0d00" },
  { id: 12, name: "Baroque Silk Scarf",        price: 145, orig: null,cat: "Accessories", badge: "New",        rating: 4.5, reviews: 28, emoji: "🧣", hue: "#1a1400" },
];

export const ORDERS = [
  { id: "#ME-8821", customer: "Valentina Cruz",  date: "Feb 15, 2026", total: 734,  status: "Delivered",  items: 3, avatar: "V" },
  { id: "#ME-8820", customer: "Sofia Marchetti", date: "Feb 14, 2026", total: 289,  status: "Shipped",    items: 1, avatar: "S" },
  { id: "#ME-8819", customer: "Anya Petrova",    date: "Feb 13, 2026", total: 1125, status: "Processing", items: 4, avatar: "A" },
  { id: "#ME-8818", customer: "Mei Lin Zhang",   date: "Feb 12, 2026", total: 445,  status: "Delivered",  items: 2, avatar: "M" },
  { id: "#ME-8817", customer: "Isabelle Moreau", date: "Feb 11, 2026", total: 273,  status: "Cancelled",  items: 1, avatar: "I" },
  { id: "#ME-8816", customer: "Emma Laurent",    date: "Feb 10, 2026", total: 892,  status: "Delivered",  items: 3, avatar: "E" },
];

export const CUSTOMERS = [
  { id: 1, name: "Valentina Cruz",  email: "v.cruz@email.com",   joined: "Jan 2026", orders: 8,  spent: 2340, tier: "VIP" },
  { id: 2, name: "Sofia Marchetti", email: "sofia@email.com",    joined: "Dec 2025", orders: 3,  spent: 890,  tier: "Active" },
  { id: 3, name: "Anya Petrova",    email: "anya.p@email.com",   joined: "Nov 2025", orders: 12, spent: 5670, tier: "Elite" },
  { id: 4, name: "Mei Lin Zhang",   email: "mei.z@email.com",    joined: "Feb 2026", orders: 1,  spent: 445,  tier: "New" },
  { id: 5, name: "Isabelle Moreau", email: "i.moreau@email.com", joined: "Oct 2025", orders: 6,  spent: 1840, tier: "Active" },
];

export const REV_DATA   = [28400, 34200, 39800, 53300, 47100, 48290];
export const REV_LABELS = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];

export const NAV_CATEGORIES = ["All", "Dresses", "Outerwear", "Tops", "Bottoms", "Shoes", "Accessories"];
