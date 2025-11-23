import { Product, Category } from "../types";

export const CATEGORIES: Category[] = [
  { id: "1", name: "Appetizers" },
  { id: "2", name: "Main Course" },
  { id: "3", name: "Dessert" },
  { id: "4", name: "Drinks" },
];

export const PRODUCTS: Product[] = [
  {
    id: "101",
    name: "Buffalo Wings",
    price: 8.99,
    categoryId: "1",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400",
    inStock: true,
  },
  {
    id: "102",
    name: "Chicken Caesar Salad",
    price: 7.5,
    categoryId: "1",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
    inStock: true,
  },
  {
    id: "103",
    name: "Loaded Nachos",
    price: 7.99,
    categoryId: "1",
    image: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400",
    inStock: false, // To test the stock indicator
  },
  {
    id: "104",
    name: "Tomato Basil Soup",
    price: 5.99,
    categoryId: "1",
    image: "https://images.unsplash.com/photo-1547592166-23acbe3a624b?w=400",
    inStock: true,
  },
  {
    id: "201",
    name: "Chicken Quesadilla",
    price: 8.99,
    categoryId: "2",
    image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400",
    inStock: true,
  },
  {
    id: "202",
    name: "Calamari Rings",
    price: 9.99,
    categoryId: "2",
    image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=400",
    inStock: true,
  },
  {
    id: "203",
    name: "Stuffed Mushrooms",
    price: 6.99,
    categoryId: "2",
    image: "https://images.unsplash.com/photo-1608039783021-6116a558f0c5?w=400",
    inStock: true,
  },
  {
    id: "301",
    name: "Chocolate Lava Cake",
    price: 6.5,
    categoryId: "3",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
    inStock: true,
  },
];
