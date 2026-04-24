// PJ Ours — static UI config. Dynamic data (MENU, OUTLETS, POPULAR) comes from backend API.

// Category display order (fallback when backend is loading)
export const CATEGORIES = [
  "Juice",
  "Fusion Shake",
  "Avil Milk",
  "Milk Shake",
  "Desserts",
  "Ice Cream Shakes",
  "Falooda",
  "Ice Cream",
  "Fruit Soda",
  "Mocktail",
  "Mojito",
];

// Category badges / tints for the menu UI
export const CATEGORY_META = {
  "Juice":            { icon: "🍊", tint: "from-orange-100 to-amber-50" },
  "Fusion Shake":     { icon: "🥭", tint: "from-yellow-100 to-orange-50" },
  "Avil Milk":        { icon: "🥛", tint: "from-rose-100 to-amber-50" },
  "Milk Shake":       { icon: "🍫", tint: "from-amber-100 to-yellow-50" },
  "Desserts":         { icon: "🍨", tint: "from-pink-100 to-rose-50" },
  "Ice Cream Shakes": { icon: "🍦", tint: "from-indigo-100 to-rose-50" },
  "Falooda":          { icon: "🍧", tint: "from-fuchsia-100 to-pink-50" },
  "Ice Cream":        { icon: "🍨", tint: "from-sky-100 to-indigo-50" },
  "Fruit Soda":       { icon: "🫧", tint: "from-lime-100 to-emerald-50" },
  "Mocktail":         { icon: "🍹", tint: "from-emerald-100 to-lime-50" },
  "Mojito":           { icon: "🌿", tint: "from-green-100 to-emerald-50" },
};

// Fallback images for popular items that don't yet have an uploaded image_url
export const FALLBACK_POPULAR_IMAGES = [
  "https://images.unsplash.com/photo-1712056407284-c1eda76e7bcd",
  "https://images.pexels.com/photos/15141036/pexels-photo-15141036.jpeg",
  "https://images.unsplash.com/photo-1748718825814-fa2d2a3f641e",
  "https://images.unsplash.com/photo-1630823185508-53c3c6566660",
  "https://images.unsplash.com/photo-1758980960366-d344cfddd004",
];

export const REVIEWS = [
  {
    name: "Anjali R.",
    rating: 5,
    text: "Great quality juice and shakes at affordable rates… good portion and consistency. Avocado shake is a must-try!",
    tag: "Regular visitor",
  },
  {
    name: "Rahul M.",
    rating: 5,
    text: "Friendly staff and quick service… great refreshing spot after college. Their mojitos hit different in summer.",
    tag: "Student",
  },
  {
    name: "Fathima K.",
    rating: 4,
    text: "Good varieties of shakes, juices and faloodas… perfect place to chill with friends. Love the Pineapple Mastani.",
    tag: "Hangout crew",
  },
  {
    name: "Vishnu P.",
    rating: 4,
    text: "Budget friendly and huge menu. The Tender Chocolate Avil Milk is unreal. Quick service even on weekends.",
    tag: "Foodie",
  },
];

export const REVIEW_KEYWORDS = [
  "Budget friendly",
  "Variety shakes",
  "Good ambience",
  "Quick service",
  "Fresh fruits",
  "Near West Fort",
];

// Helper: resolve an image URL returned by the backend (may be a relative /api path or absolute http URL)
export function resolveImageUrl(url) {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.REACT_APP_BACKEND_URL || "";
  return `${base}${url}`;
}
