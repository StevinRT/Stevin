// PJ Ours — Menu data & outlet info
// Prices in INR. Parcel charge: ₹5 per item quantity (calculated at checkout).

export const OUTLETS = [
  {
    id: "eastfort",
    name: "East Fort",
    fullAddress: "East Fort, Thrissur, Kerala",
    whatsapp: "919590012678", // +91 95900 12678
    mapQuery: "East+Fort+Thrissur+Kerala",
    hours: "10:00 AM – 10:30 PM",
  },
  {
    id: "westfort",
    name: "West Fort",
    fullAddress: "West Fort Junction, Thrissur, Kerala",
    whatsapp: "917012611090", // +91 70126 11090
    mapQuery: "West+Fort+Thrissur+Kerala",
    hours: "10:00 AM – 10:30 PM",
  },
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

// Helper to create an item with a stable id
let _id = 0;
const mk = (category, name, price) => ({
  id: `item-${++_id}`,
  category,
  name,
  price,
});

export const MENU = [
  // Juice
  mk("Juice", "Anar", 60),
  mk("Juice", "Apple", 50),
  mk("Juice", "Carrot", 40),
  mk("Juice", "Cucumber", 40),
  mk("Juice", "Cucumber Lemon", 40),
  mk("Juice", "Gooseberry & Kanthari", 60),
  mk("Juice", "Grape", 40),
  mk("Juice", "Guava Lemon", 40),
  mk("Juice", "Kiwi", 80),
  mk("Juice", "Lemon (Fresh)", 30),
  mk("Juice", "Lemon Soda (Chilli)", 30),
  mk("Juice", "Lemon Grape", 40),
  mk("Juice", "Lemon Mint", 40),
  mk("Juice", "Lemon Pineapple", 40),
  mk("Juice", "Mango", 60),
  mk("Juice", "Mosambi", 50),
  mk("Juice", "Muskmelon (Shamam)", 40),
  mk("Juice", "Orange", 50),
  mk("Juice", "Orange Lemon", 50),
  mk("Juice", "Papaya", 40),
  mk("Juice", "Passion Fruit", 70),
  mk("Juice", "Pineapple", 50),
  mk("Juice", "Strawberry", 60),
  mk("Juice", "Water Melon", 40),

  // Fusion Shake
  mk("Fusion Shake", "Apple Chickoo", 60),
  mk("Fusion Shake", "Apple Papaya", 60),
  mk("Fusion Shake", "Badam Pista", 60),

  // Avil Milk
  mk("Avil Milk", "Chickoo Chocolate", 60),
  mk("Avil Milk", "Chickoo Sharjah", 60),
  mk("Avil Milk", "Chickoo Custard Apple", 60),
  mk("Avil Milk", "Chocolate Caramel", 60),
  mk("Avil Milk", "Chocolate Oreo", 60),
  mk("Avil Milk", "Chocolate Sharjah", 60),
  mk("Avil Milk", "Grape Pineapple", 60),
  mk("Avil Milk", "Kitkat Oreo", 60),
  mk("Avil Milk", "Oreo Caramel", 60),
  mk("Avil Milk", "Oreo Sharjah", 60),
  mk("Avil Milk", "Papaya Chickoo", 60),
  mk("Avil Milk", "Papaya Mango", 60),
  mk("Avil Milk", "Papaya Sharjah", 60),
  mk("Avil Milk", "Saudi Caramel", 60),
  mk("Avil Milk", "Sharjah Saudi", 60),
  mk("Avil Milk", "Tender Butter", 80),
  mk("Avil Milk", "Tender Cashew", 80),
  mk("Avil Milk", "Tender Chickoo", 80),
  mk("Avil Milk", "Tender Dates", 80),
  mk("Avil Milk", "Tender Mango", 80),
  mk("Avil Milk", "Tender Caramel", 80),
  mk("Avil Milk", "Tender Chocolate", 80),

  // Milk Shake
  mk("Milk Shake", "Apple", 50),
  mk("Milk Shake", "Avocado (Butter)", 60),
  mk("Milk Shake", "Avocado Honey", 90),
  mk("Milk Shake", "Badam", 40),
  mk("Milk Shake", "Banana", 40),
  mk("Milk Shake", "Blueberry", 60),
  mk("Milk Shake", "Boost", 60),
  mk("Milk Shake", "Brownie", 60),
  mk("Milk Shake", "Butterscotch", 50),

  // Desserts (these are shakes/dessert drinks per the menu)
  mk("Desserts", "Caramel", 50),
  mk("Desserts", "Cherry (Kashmiri)", 40),
  mk("Desserts", "Chickoo", 50),
  mk("Desserts", "Chocolate", 40),
  mk("Desserts", "Coffee Blast", 60),
  mk("Desserts", "Cold Coffee", 50),
  mk("Desserts", "Custard Apple", 50),
  mk("Desserts", "Dark Fantasy", 45),
  mk("Desserts", "Dates (Saudi)", 40),
  mk("Desserts", "Dry Fruits", 60),
  mk("Desserts", "Grape", 40),
  mk("Desserts", "Guava", 40),
  mk("Desserts", "Horlicks", 50),
  mk("Desserts", "Ice Apple (Pananongu)", 50),
  mk("Desserts", "Jack Fruit", 55),
  mk("Desserts", "Malai Kulfi", 80),
  mk("Desserts", "Kiwi", 80),
  mk("Desserts", "Lotus Biscoff", 85),
  mk("Desserts", "Mango", 60),
  mk("Desserts", "Mixed Fruit", 50),
  mk("Desserts", "Muskmelon (Shamam)", 40),
  mk("Desserts", "Oreo", 40),
  mk("Desserts", "Papaya", 40),
  mk("Desserts", "Peanut Butter", 80),
  mk("Desserts", "Pineapple", 40),
  mk("Desserts", "Pista", 40),
  mk("Desserts", "Pomegranate", 60),
  mk("Desserts", "Strawberry", 50),
  mk("Desserts", "Special Dry Fruits", 90),
  mk("Desserts", "Vanilla", 40),
  mk("Desserts", "Tender Coconut", 70),

  // Ice Cream Shakes
  mk("Ice Cream Shakes", "Black Currant", 90),
  mk("Ice Cream Shakes", "Butterscotch", 90),
  mk("Ice Cream Shakes", "Choco Chips", 90),
  mk("Ice Cream Shakes", "Chocolate", 90),
  mk("Ice Cream Shakes", "English Delight", 90),
  mk("Ice Cream Shakes", "Fig Dates And Honey", 90),
  mk("Ice Cream Shakes", "Mango", 90),
  mk("Ice Cream Shakes", "Mocha", 90),
  mk("Ice Cream Shakes", "Pineapple", 90),
  mk("Ice Cream Shakes", "Pista", 90),
  mk("Ice Cream Shakes", "Red Velvet", 90),
  mk("Ice Cream Shakes", "Strawberry", 90),
  mk("Ice Cream Shakes", "Vancho", 90),
  mk("Ice Cream Shakes", "Vanilla", 90),
  mk("Ice Cream Shakes", "Banana Mastani", 90),
  mk("Ice Cream Shakes", "Mango Mastani", 90),
  mk("Ice Cream Shakes", "Papaya Mastani", 90),
  mk("Ice Cream Shakes", "Pineapple Mastani", 90),
  mk("Ice Cream Shakes", "Avocado Galaxy", 100),
  mk("Ice Cream Shakes", "Banana Galaxy", 100),
  mk("Ice Cream Shakes", "Caramel Galaxy", 100),
  mk("Ice Cream Shakes", "Chickoo Galaxy", 100),
  mk("Ice Cream Shakes", "Grape Galaxy", 100),
  mk("Ice Cream Shakes", "Mango Galaxy", 100),
  mk("Ice Cream Shakes", "Oreo Galaxy", 100),
  mk("Ice Cream Shakes", "Papaya Galaxy", 100),
  mk("Ice Cream Shakes", "Pineapple Galaxy", 100),
  mk("Ice Cream Shakes", "Saudi Galaxy", 100),
  mk("Ice Cream Shakes", "Tender Galaxy", 100),

  // Falooda
  mk("Falooda", "Cake Falooda", 150),
  mk("Falooda", "Chocolate Falooda", 140),
  mk("Falooda", "Dry Fruits Falooda", 150),
  mk("Falooda", "Gulab Jam Falooda", 150),
  mk("Falooda", "Mango Falooda", 140),
  mk("Falooda", "Royal Falooda", 150),
  mk("Falooda", "Strawberry Falooda", 140),
  mk("Falooda", "Pineapple Falooda", 140),
  mk("Falooda", "Fruit Punch Falooda", 160),
  mk("Falooda", "Kulfi Falooda", 160),

  // Ice Cream
  mk("Ice Cream", "Chocolate Brownie Magic", 120),
  mk("Ice Cream", "Caramel Mocha Sundae", 120),
  mk("Ice Cream", "Double Chocolate Cookie Fiesta", 120),
  mk("Ice Cream", "Dry Fruits with Cake", 120),
  mk("Ice Cream", "Wafer Crown with Cookie", 120),
  mk("Ice Cream", "Dark Vanila With Coffee Fills", 120),
  mk("Ice Cream", "Fruit Salad", 70),
  mk("Ice Cream", "Sizzling Brownie Vanila", 120),
  mk("Ice Cream", "Chocolate Sizzler", 160),
  mk("Ice Cream", "Strawberry Sizzler", 160),
  mk("Ice Cream", "Single Scoop", 30),
  mk("Ice Cream", "Double Scoop", 50),

  // Fruit Soda
  mk("Fruit Soda", "Anar Soda", 40),
  mk("Fruit Soda", "Apple Soda", 40),
  mk("Fruit Soda", "Carrot Soda", 40),
  mk("Fruit Soda", "Grape Soda", 40),
  mk("Fruit Soda", "Guava Soda", 40),
  mk("Fruit Soda", "Mango Soda", 40),
  mk("Fruit Soda", "Mosambi Soda", 40),
  mk("Fruit Soda", "Orange Soda", 40),
  mk("Fruit Soda", "Passion Fruit Soda", 50),
  mk("Fruit Soda", "Pineapple Soda", 40),
  mk("Fruit Soda", "Shamam Soda", 40),

  // Mocktail
  mk("Mocktail", "Carrot Pineapple", 60),
  mk("Mocktail", "Grape Pineapple", 60),
  mk("Mocktail", "Mosambi Orange", 60),
  mk("Mocktail", "Papaya Pineapple", 60),
  mk("Mocktail", "Papaya Carrot", 60),
  mk("Mocktail", "Shamam Mango", 60),
  mk("Mocktail", "Shamam Papaya", 60),
  mk("Mocktail", "Water Melon Carrot", 60),

  // Mojito
  mk("Mojito", "Blue Curacao", 80),
  mk("Mojito", "Blueberry", 80),
  mk("Mojito", "Green Apple", 80),
  mk("Mojito", "Green Seed", 80),
  mk("Mojito", "Hot Gooseberry (spicy)", 80),
  mk("Mojito", "Kiwi", 80),
  mk("Mojito", "Litchi", 80),
  mk("Mojito", "Mango Slice", 80),
  mk("Mojito", "Mexican", 80),
  mk("Mojito", "Mint", 80),
  mk("Mojito", "Red Flame", 80),
  mk("Mojito", "Red Freeze", 80),
  mk("Mojito", "Valencia (Orange)", 80),
  mk("Mojito", "Virgin", 50),
  mk("Mojito", "Wineyard (Grape)", 80),
  mk("Mojito", "Yellow Flower (Pineapple)", 80),
];

// Popular items highlighted on the landing page
export const POPULAR_ITEM_NAMES = [
  "Avocado (Butter)",
  "Pineapple Mastani",
  "Oreo",
  "Royal Falooda",
  "Mint",
];

// Image pool (Unsplash / Pexels) — reused across popular cards
export const POPULAR_IMAGES = {
  "Avocado (Butter)": "https://images.unsplash.com/photo-1712056407284-c1eda76e7bcd",
  "Pineapple Mastani": "https://images.pexels.com/photos/15141036/pexels-photo-15141036.jpeg",
  "Oreo": "https://images.unsplash.com/photo-1748718825814-fa2d2a3f641e",
  "Royal Falooda": "https://images.unsplash.com/photo-1630823185508-53c3c6566660",
  "Mint": "https://images.unsplash.com/photo-1758980960366-d344cfddd004",
};

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
