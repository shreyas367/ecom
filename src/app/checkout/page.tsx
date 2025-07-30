"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState(session?.user?.email || "");
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (!session) return router.push("/sign-in");
    if (!address) return alert("Please enter address");

    const res = await fetch("/api/place-order", {
      method: "POST",
      body: JSON.stringify({
        userId: session.user.id,
        email,
        address,
        items: cart,
        total,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Order placed! Check your email.");
      clearCart(); // clear cart after order
      router.push("/thank-you");
    } else {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <label htmlFor="email" className="block font-medium mb-1">Email:</label>
<input
  id="email"
  type="email"
  className="w-full border p-2 mb-4"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="you@example.com"
/>

<label htmlFor="address" className="block font-medium mb-1">Shipping Address:</label>
<textarea
  id="address"
  className="w-full border p-2 mb-4"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="123 Main St, City, ZIP"
/>


      <h3 className="text-lg font-semibold mb-2">Total: ₹{total}</h3>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={placeOrder}
      >
        Place Order
      </button>
    </div>
  );
}
