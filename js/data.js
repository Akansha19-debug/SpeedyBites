// Food item data with details
const foodItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken pieces cooked in a rich and creamy tomato-based sauce.",
    price: 320,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["spicy", "curry", "lunch", "dinner"]
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Marinated cottage cheese cubes grilled to perfection with spices.",
    price: 250,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/4331490/pexels-photo-4331490.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["starter", "snack", "grilled"]
  },
  {
    id: 3,
    name: "Veg Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    price: 220,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/7437464/pexels-photo-7437464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["rice", "lunch", "dinner"]
  },
  {
    id: 4,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken pieces and spices.",
    price: 280,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["rice", "lunch", "dinner", "spicy"]
  },
  {
    id: 5,
    name: "Masala Dosa",
    description: "Crispy rice crepe served with potato filling, sambar and chutneys.",
    price: 150,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["breakfast", "south indian"]
  },
  {
    id: 6,
    name: "Samosa",
    description: "Triangular pastry filled with spiced potatoes and peas, deep-fried until crispy.",
    price: 50,
    category: "snacks",
    isVeg: true,
    image: "https://images.pexels.com/photos/12123515/pexels-photo-12123515.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["snack", "teatime", "fried"]
  },
  {
    id: 7,
    name: "Fish Curry",
    description: "Fresh fish pieces cooked in a tangy and spicy gravy with herbs.",
    price: 300,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/583903/pexels-photo-583903.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["seafood", "curry", "lunch", "dinner"]
  },
  {
    id: 8,
    name: "Chocolate Brownie",
    description: "Rich and fudgy chocolate brownie, perfect for chocolate lovers.",
    price: 120,
    category: "desserts",
    isVeg: true,
    image: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["sweet", "chocolate", "dessert"]
  },
  {
    id: 9,
    name: "Chicken Nuggets",
    description: "Crispy fried chicken nuggets served with dipping sauce.",
    price: 180,
    category: "snacks",
    isVeg: false,
    image: "https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["fried", "appetizer", "snack"]
  },
  {
    id: 10,
    name: "Mango Lassi",
    description: "Refreshing yogurt-based drink made with sweet mango pulp.",
    price: 90,
    category: "beverages",
    isVeg: true,
    image: "https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["drink", "sweet", "yogurt"]
  },
  {
    id: 11,
    name: "Garlic Naan",
    description: "Soft and fluffy flatbread topped with garlic and butter.",
    price: 60,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/2689419/pexels-photo-2689419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["bread", "side dish"]
  },
  {
    id: 12,
    name: "French Fries",
    description: "Crispy golden potato fries served with ketchup and mayonnaise.",
    price: 130,
    category: "snacks",
    isVeg: true,
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["fried", "appetizer", "side dish"]
  },
  {
    id: 13,
    name: "Gulab Jamun",
    description: "Soft milk-solid balls soaked in rose-flavored sugar syrup.",
    price: 100,
    category: "desserts",
    isVeg: true,
    image: "https://images.pexels.com/photos/11121700/pexels-photo-11121700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["sweet", "dessert", "indian"]
  },
  {
    id: 14,
    name: "Chicken Tikka",
    description: "Marinated chicken pieces grilled in a tandoor with spices.",
    price: 270,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/2673353/pexels-photo-2673353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["grilled", "starter", "spicy"]
  },
  {
    id: 15,
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with milk and aromatic spices.",
    price: 50,
    category: "beverages",
    isVeg: true,
    image: "https://images.pexels.com/photos/5501118/pexels-photo-5501118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["hot", "drink", "tea"]
  },
  {
    id: 16,
    name: "Vegetable Spring Rolls",
    description: "Crispy rolls filled with mixed vegetables and served with dipping sauce.",
    price: 150,
    category: "snacks",
    isVeg: true,
    image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["fried", "appetizer", "starter"]
  },
  {
    id: 17,
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy.",
    price: 240,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/9893169/pexels-photo-9893169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["curry", "lunch", "dinner", "healthy"]
  },
  {
    id: 18,
    name: "Tandoori Chicken",
    description: "Whole chicken marinated in yogurt and spices, cooked in a tandoor.",
    price: 350,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["grilled", "spicy", "dinner"]
  },
  {
    id: 19,
    name: "Veg Thali",
    description: "Complete meal with rice, breads, curries, and sides all in one platter.",
    price: 300,
    category: "meals",
    isVeg: true,
    image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["full meal", "lunch", "dinner", "combo"]
  },
  {
    id: 20,
    name: "Non-Veg Thali",
    description: "Complete meal with rice, breads, meat curries, and sides in one platter.",
    price: 400,
    category: "meals",
    isVeg: false,
    image: "https://images.pexels.com/photos/6260921/pexels-photo-6260921.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["full meal", "lunch", "dinner", "combo"]
  },
  {
    id: 21,
    name: "Fresh Lime Soda",
    description: "Refreshing lime juice with soda water, served sweet or salted.",
    price: 70,
    category: "beverages",
    isVeg: true,
    image: "https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["drink", "refreshing", "cold"]
  },
  {
    id: 22,
    name: "Malai Kofta",
    description: "Fried vegetable and cheese dumplings in a rich, creamy sauce.",
    price: 260,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["curry", "lunch", "dinner"]
  },
  {
    id: 23,
    name: "Mutton Curry",
    description: "Tender pieces of mutton slow-cooked with aromatic spices.",
    price: 380,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/6260918/pexels-photo-6260918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["curry", "spicy", "lunch", "dinner"]
  },
  {
    id: 24,
    name: "Ice Cream Sundae",
    description: "Assorted ice cream scoops topped with sauces, nuts, and whipped cream.",
    price: 180,
    category: "desserts",
    isVeg: true,
    image: "https://images.pexels.com/photos/3625372/pexels-photo-3625372.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["sweet", "cold", "dessert"]
  },
  {
    id: 25,
    name: "Veg Fried Rice",
    description: "Basmati rice stir-fried with mixed vegetables and soy sauce.",
    price: 190,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["rice", "stir-fried", "lunch", "dinner"]
  },
  {
    id: 26,
    name: "Chicken Fried Rice",
    description: "Basmati rice stir-fried with chicken pieces and vegetables.",
    price: 230,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["rice", "stir-fried", "lunch", "dinner"]
  },
  {
    id: 27,
    name: "Cold Coffee",
    description: "Chilled coffee blended with ice cream and milk.",
    price: 120,
    category: "beverages",
    isVeg: true,
    image: "https://images.pexels.com/photos/4886228/pexels-photo-4886228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["cold", "drink", "coffee"]
  },
  {
    id: 28,
    name: "Pav Bhaji",
    description: "Mashed vegetable curry served with buttered bread rolls.",
    price: 140,
    category: "veg",
    isVeg: true,
    image: "https://images.pexels.com/photos/5589056/pexels-photo-5589056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["street food", "spicy", "dinner"]
  },
  {
    id: 29,
    name: "Chicken Shawarma",
    description: "Grilled chicken wrapped in rumali roti with vegetables and sauce.",
    price: 170,
    category: "non-veg",
    isVeg: false,
    image: "https://images.pexels.com/photos/6941001/pexels-photo-6941001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: true,
    tags: ["wrap", "roll", "lunch"]
  },
  {
    id: 30,
    name: "Falooda",
    description: "Sweet, cold dessert drink with rose syrup, vermicelli, and ice cream.",
    price: 150,
    category: "desserts",
    isVeg: true,
    image: "https://images.pexels.com/photos/15025789/pexels-photo-15025789/free-photo-of-ice-cream-in-a-glass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    popular: false,
    tags: ["sweet", "cold", "dessert", "drink"]
  }
];

// Export the data
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { foodItems };
}