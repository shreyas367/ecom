// src/app/product/[id]/page.tsx

import { getProductById } from "@/lib/productService";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img src={product.image} alt={product.title} className="w-full h-96 object-contain" />
      <p className="text-lg mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">₹{product.price}</p>
      <button className="bg-black text-white px-4 py-2 rounded mt-4">
        Add to Cart
      </button>
    </div>
  );
}
