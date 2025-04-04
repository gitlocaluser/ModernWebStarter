"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function My() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-gray-200/10 backdrop-blur-lg p-8 rounded-xl border border-gray-300/20 shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-amber-600 mb-6 text-center">Welcome to /my</h1>
        {session ? (
          <div className="space-y-4">
            <p className="text-teal-800">Hey, {session.user?.name || session.user?.email}</p>
            <Button
              className="w-full bg-amber-600 text-white hover:bg-amber-700"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </Button>
          </div>
        ) : (
          <p className="text-gray-600">Not signed in.</p>
        )}
      </div>
    </div>
  );
}