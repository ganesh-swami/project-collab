"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const demoAccounts = [
    { email: "superadmin@example.com", password: "superadmin", role: "super-admin" as const },
    { email: "admin@example.com", password: "admin", role: "admin" as const },
    { email: "user@example.com", password: "user", role: "participant" as const },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const account = demoAccounts.find((acc) => acc.email === email && acc.password === password);

    if (account) {
      const user = {
        id: `user_${Date.now()}`,
        email: account.email,
        name: account.email.split("@")[0],
        role: account.role,
      };
      dispatch(login(user));
      router.push("/dashboard");
    } else {
      setError("Invalid email or password. Check demo credentials below.");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fdf2f2] to-[#fff5f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#e83e3e] mb-2">Radiocarbon</h1>
          <p className="text-gray-600 text-sm">Team collaboration prototype</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-200 focus:border-[#e83e3e] focus:ring-[#e83e3e]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-[#e83e3e] text-center">{error}</p>}

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-[#e83e3e] hover:bg-[#d92e2e] text-white font-semibold h-12 rounded-lg transition-colors"
          >
            Log In
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-[#e83e3e] cursor-pointer hover:font-semibold transition">
            Need an account? Sign up
          </p>
        </div>

        {/* Demo Accounts Box */}
        <div className="mt-8 bg-[#fdf2f2] rounded-lg p-5 border border-[#ffdbdb]">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Quick Demo Access:</h3>
          <ul className="space-y-2 text-xs text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-[#e83e3e] font-bold">•</span>
              <span>Use email with &quot;superadmin&quot; for Super Admin role</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#e83e3e] font-bold">•</span>
              <span>Use email with &quot;admin&quot; for Admin role</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#e83e3e] font-bold">•</span>
              <span>Use any other email for Participant role</span>
            </li>
          </ul>
          <div className="mt-4 bg-white rounded border border-gray-200 p-3 space-y-1 text-xs">
            <p>
              <strong>Email:</strong> superadmin@example.com / Password: superadmin
            </p>
            <p>
              <strong>Email:</strong> admin@example.com / Password: admin
            </p>
            <p>
              <strong>Email:</strong> user@example.com / Password: user
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
