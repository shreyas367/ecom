import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
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

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
