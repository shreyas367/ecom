'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy-load Three.js background for performance
const SpaceBackground = dynamic(() => import("@/components/SpaceBackground"), { ssr: false });

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push("/");
    else alert("Invalid credentials");
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    await signIn(provider, { callbackUrl: "/" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
    >
      <SpaceBackground />

      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur shadow-xl rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md space-y-6 z-10"
      >
        <h2 className="text-2xl font-bold text-center">Sign In</h2>

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          type="email"
          placeholder="Email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors duration-200"
        >
          Sign In
        </button>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors duration-200"
          >
            Google
          </button>

          <button
            type="button"
            onClick={() => handleOAuthLogin("github")}
            className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition-colors duration-200"
          >
            GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </motion.div>
  );
}
