// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      id: string;
      name: string;
      email: string;
    };
  }
}
