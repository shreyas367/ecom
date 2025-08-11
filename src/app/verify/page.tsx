"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        return;
      }

      try {
        const res = await fetch("/api/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        if (res.ok) {
          setStatus("success");
          setTimeout(() => {
            router.push("/sign-in"); // redirect after success
          }, 1000);
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded shadow-md w-full max-w-md text-center">
        {status === "loading" && <p>Verifying your email...</p>}
        {status === "success" && <p className="text-green-600">✅ Email verified! Redirecting...</p>}
        {status === "error" && <p className="text-red-600">❌ Invalid or expired verification link.</p>}
      </div>
    </div>
  );
}
