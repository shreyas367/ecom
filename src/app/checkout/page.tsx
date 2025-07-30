// app/checkout/page.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    alert("✅ Order placed!\n📦 Delivery to: " + address);
    clearCart();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">🧾 Checkout</h1>

      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border p-4 rounded"
          >
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">
                ₹{item.price} × {item.quantity}
              </p>
            </div>
            <p className="font-medium text-blue-600">
              ₹{item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-bold mb-2">Total: ₹{total}</p>

        <textarea
          placeholder="Enter your delivery address..."
          className="w-full p-2 border rounded mb-4"
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleOrder}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
