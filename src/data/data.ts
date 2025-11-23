import { Product, Category } from "../types";

export const CATEGORIES: Category[] = [
  { id: "1", name: "Appetizers" },
  { id: "2", name: "Main Course" },
  { id: "3", name: "Dessert" },
];

export const PRODUCTS: Product[] = [
  // Appetizers
  {
    id: "101",
    name: "Chicken Caesar Salad",
    price: 7.5,
    categoryId: "1",
    image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400",
    inStock: false,
  },
  {
    id: "102",
    name: "Buffalo Wings",
    price: 8.99,
    categoryId: "1",
    image: "", // No image - will show placeholder icon
    inStock: true,
  },
  {
    id: "103",
    name: "Loaded Nachos",
    price: 7.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "104",
    name: "Tomato Basil Soup",
    price: 5.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "105",
    name: "Chicken Noodle Soup",
    price: 6.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "106",
    name: "Mozzarella Sticks",
    price: 6.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "107",
    name: "Spinach Artichoke Dip",
    price: 7.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "108",
    name: "Chicken Quesadilla",
    price: 8.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "109",
    name: "Calamari Rings",
    price: 9.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  {
    id: "110",
    name: "Stuffed Mushrooms",
    price: 6.99,
    categoryId: "1",
    image: "",
    inStock: true,
  },
  // Main Course
  {
    id: "201",
    name: "Grilled Salmon",
    price: 18.99,
    categoryId: "2",
    image: "",
    inStock: true,
  },
  {
    id: "202",
    name: "Ribeye Steak",
    price: 24.99,
    categoryId: "2",
    image: "",
    inStock: true,
  },
  {
    id: "203",
    name: "Chicken Parmesan",
    price: 16.99,
    categoryId: "2",
    image: "",
    inStock: true,
  },
  // Dessert
  {
    id: "301",
    name: "Chocolate Lava Cake",
    price: 6.5,
    categoryId: "3",
    image: "",
    inStock: true,
  },
  {
    id: "302",
    name: "Cheesecake",
    price: 7.5,
    categoryId: "3",
    image: "",
    inStock: true,
  },
];
