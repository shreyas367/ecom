"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const { data: session } = useSession();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-black">
          🛍️ ShopSmart
        </Link>

        <div className="flex items-center gap-6 relative">
          <Link
            href="/products"
            className="text-gray-700 hover:text-black transition"
          >
            Products
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-black" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Buttons or User Dropdown */}
          {session?.user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex  items-center gap-1 px-3 py-1.5 bg-black-100 hover:bg-gray-200 rounded text-black"
              >
                <User className="w-4 h-4" />
                {session.user.name || "Account"}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {session.user.email}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-900 text-sm"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
