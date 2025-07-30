import { getProductById } from '@/lib/productService';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

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

      {/* ✅ Client-side Add to Cart button */}
      <AddToCartButton
        product={{
          id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
        }}
      />
    </div>
  );
}
