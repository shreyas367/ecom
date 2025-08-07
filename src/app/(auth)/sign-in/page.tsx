'use client'

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import SpaceBackground from '@/components/SpaceBackground';


export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) router.push('/');
    else alert('Invalid credentials');
  };

  return (
    <>
      <SpaceBackground />
      
      <div className="min-h-screen flex flex-col justify-center items-center">
       
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-sm w-full space-y-4 border border-white/20"
        >
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 rounded border border-gray-300 bg-white/80 placeholder-gray-500"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <motion.input
            whileFocus={{ scale: 1.02 }}
            className="w-full p-3 rounded border border-gray-300 bg-white/80 placeholder-gray-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold"
            type="submit"
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full bg-red-500 text-white py-3 rounded font-semibold"
          >
            Continue with Google
          </motion.button>

          <p className="text-center text-sm text-white">
            Don't have an account?{' '}
            <a href="/sign-up" className="underline text-blue-300">Sign up</a>
          </p>
        </motion.form>
      </div>
    </>
  );
}
