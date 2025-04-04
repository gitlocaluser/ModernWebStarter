"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800/10 backdrop-blur-md border-b border-gray-300/20 shadow-lg">
        <h1 className="text-2xl font-bold text-amber-600">My SaaS</h1>
        <Link href="/auth">
          <Button variant="outline" className="bg-gray-200/20 border-gray-300/30 text-teal-800 hover:bg-gray-200/30">
            Log In
          </Button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 p-8 text-center">
          <div className="bg-gray-200/10 backdrop-blur-lg p-8 rounded-xl border border-gray-300/20 shadow-2xl max-w-3xl">
            <h2 className="text-5xl font-bold text-amber-600 drop-shadow-md">
              Shape [Your Thing] in 3D
            </h2>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl">
              A standout tool for [your app’s purpose]. Kick off with a free trial.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-amber-600 text-white shadow-lg hover:bg-amber-700">
                  Sign Up
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="lg" variant="outline" className="bg-gray-200/20 border-gray-300/30 text-teal-800 hover:bg-gray-200/30">
                  Log In
                </Button>
              </Link>
            </div>
          </div>

          {/* Fake Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-200/10 backdrop-blur-md p-6 rounded-lg border border-gray-300/20 shadow-xl transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-teal-700">Feature One</h3>
              <p className="mt-2 text-gray-600">Render your [thing] with bold 3D flair.</p>
            </div>
            <div className="bg-gray-200/10 backdrop-blur-md p-6 rounded-lg border border-gray-300/20 shadow-xl transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-teal-700">Feature Two</h3>
              <p className="mt-2 text-gray-600">Smooth [action] in a glassy shell.</p>
            </div>
            <div className="bg-gray-200/10 backdrop-blur-md p-6 rounded-lg border border-gray-300/20 shadow-xl transform hover:scale-105 transition-transform">
              <h3 className="text-xl font-semibold text-teal-700">Feature Three</h3>
              <p className="mt-2 text-gray-600">Push your [goal] to new heights.</p>
            </div>
          </div>
        </main>

      {/* Footer */}
      <footer className="p-4 text-center text-gray-500 bg-gray-200/10 backdrop-blur-md border-t border-gray-300/20">
        © {currentYear} My SaaS. All rights reserved.
      </footer>
    </div>
  );
}