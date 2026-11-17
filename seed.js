
import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";

import Category from "./models/categoryModel.js";
import Product from "./models/productModel.js";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Men Clothing", slug: "men-clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
];

const products = [
  {
    name: "Runfalcon Running Shoes",
    brand: "Adidas",
    slug: "adidas-shoes",
    description: "Comfortable Adidas running shoes.",
    price: 3499,
    category: "Shoes",
    quantity: 25,
    image: "adidas-shoes.jpg",
  },
  {
    name: "Wayfarer Sunglasses",
    brand: "Ray-Ban",
    slug: "black-sunglass",
    description: "Classic black sunglasses.",
    price: 2999,
    category: "Accessories",
    quantity: 30,
    image: "black-sunglass.jpg",
  },
  {
    name: "Tune Wireless Headphones",
    brand: "JBL",
    slug: "jbl-headphone",
    description: "Wireless headphones with JBL sound.",
    price: 2799,
    category: "Electronics",
    quantity: 20,
    image: "jbl-headphone.jpg",
  },
  {
    name: "Go Bluetooth Speaker",
    brand: "JBL",
    slug: "jbl-speaker",
    description: "Portable JBL Bluetooth speaker.",
    price: 3999,
    category: "Electronics",
    quantity: 15,
    image: "jbl-speaker.jpg",
  },
  {
    name: "511 Slim Fit Jeans",
    brand: "Levi's",
    slug: "levis-jeans",
    description: "Classic blue denim jeans.",
    price: 2999,
    category: "Men Clothing",
    quantity: 20,
    image: "levis-jeans.jpg",
  },
  {
    name: "ColorFit Smartwatch",
    brand: "Noise",
    slug: "noise-smartwatch",
    description: "Smartwatch with fitness tracking.",
    price: 1999,
    category: "Electronics",
    quantity: 15,
    image: "noise-smartwatch.jpg",
  },
  {
    name: "Essentials T-Shirt",
    brand: "Puma",
    slug: "puma-tshirt",
    description: "Comfortable Puma casual T-shirt.",
    price: 999,
    category: "Men Clothing",
    quantity: 30,
    image: "puma-tshirt.jpg",
  },
  {
    name: "Casual White Sneakers",
    brand: "Puma",
    slug: "white-sneaker",
    description: "Stylish white casual sneakers.",
    price: 2499,
    category: "Shoes",
    quantity: 20,
    image: "white-sneaker.jpg",
  },

  {
    name: "Wireless Keyboard",
    brand: "Logitech",
    slug: "logitech-keyboardwireless",
    description: "Wireless keyboard for comfortable typing.",
    price: 1499,
    category: "Electronics",
    quantity: 20,
    image: "logitech-keyboardwireless.jpg",
  },
  {
    name: "AirPods",
    brand: "Apple",
    slug: "airpods",
    description: "Wireless earbuds with premium sound quality.",
    price: 4999,
    category: "Electronics",
    quantity: 15,
    image: "airpods.jpg",
  },
  {
    name: "Wireless Mouse",
    brand: "Logitech",
    slug: "logitech-mouse",
    description: "Smooth and comfortable wireless mouse.",
    price: 799,
    category: "Electronics",
    quantity: 25,
    image: "logitech-mouse.jpg",
  },
  {
    name: "Running Shoes",
    brand: "Nike",
    slug: "nike-shoes",
    description: "Lightweight Nike running shoes.",
    price: 3499,
    category: "Shoes",
    quantity: 20,
    image: "nike-shoes.jpg",
  },
  {
    name: "Smart LED Bulb",
    brand: "Philips",
    slug: "philips-smartbulb",
    description: "Energy-efficient Philips smart LED bulb.",
    price: 599,
    category: "Electronics",
    quantity: 30,
    image: "philips-smartbulb.jpg",
  },
  {
    name: "Leather Wallet",
    brand: "Woodland",
    slug: "woodland-wallet",
    description: "Stylish and durable Woodland wallet.",
    price: 899,
    category: "Accessories",
    quantity: 25,
    image: "woodland-wallet.jpg",
  },

];

async function seedDatabase() {
  try {
    const imageDir = path.join(
      process.cwd(),
      "client",
      "public",
      "images"
    );

    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    // Create or find categories
    const categoryMap = {};

    for (const item of categories) {
      const category = await Category.findOneAndUpdate(
        { slug: item.slug },
        { $setOnInsert: item },
        { upsert: true, new: true }
      );

      categoryMap[item.name] = category._id;
    }

    // Insert products with their images
    for (const item of products) {
      const imagePath = path.join(imageDir, item.image);

      if (!fs.existsSync(imagePath)) {
        throw new Error(`Image not found: ${item.image}`);
      }

      const imageBuffer = fs.readFileSync(imagePath);

      await Product.findOneAndUpdate(
        { slug: item.slug },
        {
          $set: {
            name: item.name,
            brand: item.brand,
            description: item.description,
            price: item.price,
            category: categoryMap[item.category],
            quantity: item.quantity,
            shipping: true,
            photo: {
              data: imageBuffer,
              contentType: "image/jpeg",
            },
          },
        },
        { upsert: true, new: true, runValidators: true }
      );

      console.log(`${item.brand} - ${item.name} added`);
    }

    console.log("All 8 products added successfully!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
