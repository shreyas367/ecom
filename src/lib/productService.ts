// src/lib/productService.ts
import { connectDB } from "@/lib/db";
import Product, { IProduct } from "@/models/Product";

export async function getProductById(id: string) {
  await connectDB();
  try {
    const product = await Product.findById(id).lean<IProduct>();
    if (!product) return null;

    return {
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}
