"use client";

import { signIn } from "next-auth/react";
import { GoogleLoginButton } from "react-social-login-buttons";

export default function LoginPage() {
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

      <section className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-md">
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

        <form className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-100"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
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
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-slate-300 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/40"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 transition hover:bg-white"
          >
            Sign in with Credentials
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-slate-200">
            <span className="h-px flex-1 bg-white/20" />
            or
            <span className="h-px flex-1 bg-white/20" />
          </div>
          <GoogleLoginButton
            onClick={() => signIn("google")}
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
      </section>
    </main>
  );
}
