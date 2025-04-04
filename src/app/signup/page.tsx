"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { siGoogle, siGithub } from "simple-icons/icons";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "", name: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/auth");
    } else {
      const errorText = await res.text();
      setError(errorText || "Signup failed—try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[rgb(var(--gray-900))]">
      <div className="bg-[rgb(var(--gray-800)/50)] backdrop-blur-lg p-8 rounded-xl border border-[rgb(var(--gray-700)/50)] shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-[rgb(var(--amber))] mb-6 text-center">Sign Up</h1>
        {error && (
          <div className="mb-4 p-4 bg-[rgb(var(--red-500)/20)] border border-[rgb(var(--red-500)/50)] rounded-lg text-[rgb(var(--red-300))] text-center">
            {error}
          </div>
        )}
        <div className="space-y-4">
          <Button
            className="w-full bg-[rgb(var(--gray-700))] text-white hover:bg-[rgb(var(--gray-600))] border border-[rgb(var(--gray-600))]"
            onClick={() => signIn("google", { callbackUrl: "/my" })}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: siGoogle.svg }} />
            Sign up with Google
          </Button>
          <Button
            className="w-full bg-[rgb(var(--gray-700))] text-white hover:bg-[rgb(var(--gray-600))] border border-[rgb(var(--gray-600))]"
            onClick={() => signIn("github", { callbackUrl: "/my" })}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor" dangerouslySetInnerHTML={{ __html: siGithub.svg }} />
            Sign up with GitHub
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[rgb(var(--gray-600))]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[rgb(var(--gray-800)/50)] px-2 text-[rgb(var(--gray-400))]">or</span>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[rgb(var(--teal))]">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" className="bg-[rgb(var(--gray-700))] text-white border-[rgb(var(--gray-600))] placeholder-[rgb(var(--gray-400))]" {...field} />
                    </FormControl>
                    <FormMessage className="text-[rgb(var(--red-400))]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[rgb(var(--teal))]">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" className="bg-[rgb(var(--gray-700))] text-white border-[rgb(var(--gray-600))] placeholder-[rgb(var(--gray-400))]" {...field} />
                    </FormControl>
                    <FormMessage className="text-[rgb(var(--red-400))]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[rgb(var(--teal))]">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="bg-[rgb(var(--gray-700))] text-white border-[rgb(var(--gray-600))] placeholder-[rgb(var(--gray-400))]" {...field} />
                    </FormControl>
                    <FormMessage className="text-[rgb(var(--red-400))]" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[rgb(var(--amber))] text-gray-900 hover:bg-[rgb(var(--amber))] hover:bg-opacity-80">
                Sign up with Email
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}