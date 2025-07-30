import Link from "next/link";

type ProductProps = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ _id, title, price, image }: ProductProps) {
  return (
    <Link href={`/product/${_id}`} className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-2 rounded" />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-blue-600 font-bold">₹{price}</p>
    </Link>
  );
}
