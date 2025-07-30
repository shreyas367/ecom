// src/models/Product.ts
import mongoose, { Schema, Document, models } from "mongoose";

// Define the TypeScript interface
export interface IProduct extends Document {
  _id:string,
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    image: String,
    category: String,
    brand: String,
    stock: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model<IProduct>("Product", productSchema);
export default Product;
