import { getProductById } from "@/lib/productService";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetailPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) return notFound();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-96 object-cover mb-4"
      />
      <p className="text-lg text-blue-600 font-bold mb-2">₹{product.price}</p>
      <p className="text-gray-700">{product.description}</p>
      <button className="bg-black text-white px-4 py-2 rounded mt-4">
        Add to Cart
      </button>
    </div>
  );
}
