"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleLoginButton } from "react-social-login-buttons";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("Invalid email or password");
        setIsLoading(false);
      } else if (result?.ok) {
        // Success! NextAuth will handle the session
        // The useAuthSync hook will sync to localStorage automatically
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/Image%20Background.png")' }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        aria-hidden
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md transition-shadow"
      >
        <header className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-sky-200">
            Welcome back
          </p>
          <h1 className="mt-2 text-3xl font-semibold">
            Sign in to Whisper Wire
          </h1>
          <p className="mt-2 text-sm text-slate-200">
            Collaborate across languages with secure, AI-ready messaging.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-500/20 border border-red-500/50 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-100"
            >
              Email
            </label>
            <motion.input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-100"
            >
              Password
            </label>
            <motion.input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              whileFocus={{
                scale: 1.02,
                borderColor: "rgba(255, 255, 255, 0.5)",
              }}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{
              scale: isLoading ? 1 : 1.02,
              boxShadow: isLoading
                ? "none"
                : "0 10px 25px -5px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="w-full rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in with Credentials"}
          </motion.button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-200">
            <span className="h-px flex-1 bg-white/20" />
            or
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <GoogleLoginButton
            onClick={() =>
              signIn("google", {
                callbackUrl: "/dashboard",
              })
            }
            text="Continue with Google"
            style={{
              width: "100%",
              justifyContent: "center",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "12px",
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
            iconSize={24}
          />
          <p className="text-center text-xs text-slate-200">
            By continuing you agree to our{" "}
            <span className="font-medium text-white">Privacy Policy</span>.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
