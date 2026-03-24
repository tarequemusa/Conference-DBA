"use client";
import { CheckCircle2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) router.push("/login");
    else setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-[900px] w-full bg-white rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-slate-200">
        {/* Left Side: Branding/Info */}
        <div className="md:w-5/12 bg-[#003366] p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold leading-tight">
              Join SCM 2026 Conference
            </h2>
            <p className="mt-4 text-slate-300">
              Submit your research and join a global network of supply chain
              experts.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              "Abstract Submission",
              "Peer Review Tracking",
              "Early Bird Access",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <CheckCircle2 className="text-[#C5A059] w-5 h-5" /> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-7/12 p-12">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-800">
              Researcher Registration
            </h3>
            <p className="text-slate-500 text-sm">
              Fill in the details to create your portal profile
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="text"
                required
                placeholder="Full Name"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none"
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none"
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
              <input
                type="password"
                required
                placeholder="Secure Password"
                className="w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] outline-none"
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#C5A059] text-[#003366] py-4 rounded-xl font-bold shadow-lg hover:bg-white hover:text-[#C5A059] border-2 border-transparent hover:border-[#C5A059] transition-all"
            >
              {loading ? "Creating Account..." : "Register Now"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#003366] font-bold hover:underline"
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
