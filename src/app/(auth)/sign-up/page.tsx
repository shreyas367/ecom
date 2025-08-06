'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
const FloatingCube = () => {
  return (
    <motion.div
      animate={{
        rotate: [0, 360, 360],
        x: [0, 10, -10, 0],
        y: [0, -10, 10, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-2xl"
      style={{
        transformStyle: "preserve-3d",
      }}
    />
  );
};



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
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4"
    >
       <div className="absolute top-10 left-10">
    <FloatingCube />
  </div>
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700">Create Account</h2>

        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-md text-lg font-semibold"
          type="submit"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-indigo-600 font-medium hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </motion.div>
  );
}
