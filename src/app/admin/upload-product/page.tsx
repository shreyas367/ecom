'use client';

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function UploadProductPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    brand: "",
    stock: "1",
  });

  if (!session || session.user.role !== "admin") {
    return <p className="text-center mt-20">Access denied. Admins only.</p>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({ ...form, price: +form.price, stock: +form.stock }),
    });

    if (res.ok) {
      alert("Product uploaded");
      router.push("/");
    } else {
      alert("Error uploading product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10 space-y-4">
      {Object.keys(form).map((key) => (
        <input
          key={key}
          type="text"
          placeholder={key}
          value={(form as any)[key]}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, [key]: e.target.value }))
          }
          className="w-full p-2 border"
        />
      ))}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">
        Upload Product
      </button>
    </form>
  );
}
