// src/lib/productService.ts

import {connectDB} from "@/lib/db";
import Product from "@/models/Product";

export async function getProductById(id: string) {
  await connectDB();
  try {
    const product = await Product.findById(id);
    if (!product) return null;
    return {
      ...product,
      _id: product._id.toString(),
    };
  } catch {
    return null;
  }
}
