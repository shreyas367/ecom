import ProductCard from "@/components/ProductCard";

type Product = {
  _id: string;
  title: string;
  price: number;
  image: string;
};

export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });
  const products: Product[] = await res.json();

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🛍 Latest Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} {...product} />
        ))}
      </div>
    </main>
  );
}
