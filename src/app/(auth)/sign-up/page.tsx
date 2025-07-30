// src/app/(auth)/sign-up/page.tsx
'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/sign-in");
    } else {
      alert("User already exists or error occurred");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-20 space-y-4">
      <input
        className="w-full p-2 border"
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full p-2 border"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="bg-blue-600 text-white px-4 py-2" type="submit">
        Sign Up
      </button>
    </form>
  );
}
