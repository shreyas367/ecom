'use client';

import { useCart } from '@/context/CartContext';

type Props = {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() =>
        addToCart({
            _id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
            image: product.image|| "" ,
        })
      }
      className="bg-black text-white px-4 py-2 rounded mt-4"
    >
      Add to Cart
    </button>
  );
}
