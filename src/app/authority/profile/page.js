"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  CheckCircle,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AuthorityProfile() {
  const { data: session, update, status } = useSession();
  const [signature, setSignature] = useState("");
  const [loading, setLoading] = useState(false);

  // Load existing signature on mount
  useEffect(() => {
    if (session?.user?.signature) {
      setSignature(session.user.signature);
    }
  }, [session]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      return toast.error("Signature file must be under 1MB");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSignature(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature }),
      });

      if (res.ok) {
        toast.success("Official Signature Updated");
        update(); // Refresh NextAuth session
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading")
    return (
      <div className="h-screen bg-[#003366] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" />
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 flex items-center gap-6">
            <div className="w-16 h-16 bg-[#003366] rounded-[1.5rem] flex items-center justify-center text-[#C5A059] shadow-xl">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-[#003366] uppercase tracking-tighter">
                Authority Settings
              </h1>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.3em]">
                Credential & Signature Management
              </p>
            </div>
          </header>

          <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#C5A059]" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Account Info */}
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Full Name
                  </label>
                  <p className="text-lg font-bold text-[#003366]">
                    {session?.user?.name}
                  </p>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    Registered Email
                  </label>
                  <p className="text-sm font-medium text-slate-600 italic">
                    {session?.user?.email}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-50">
                  <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-amber-100">
                    Role: {session?.user?.role}
                  </span>
                </div>
              </div>

              {/* Signature Section */}
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block text-center">
                  Digital Certificate Signature
                </label>
                <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-6 flex flex-col items-center justify-center bg-slate-50 hover:border-[#C5A059]/30 transition-all group">
                  {signature ? (
                    <img
                      src={signature}
                      alt="Sig"
                      className="max-h-24 w-auto mb-4 grayscale hover:grayscale-0 transition-all"
                    />
                  ) : (
                    <ImageIcon size={40} className="text-slate-200 mb-4" />
                  )}
                  <input
                    type="file"
                    id="sig-input"
                    hidden
                    onChange={handleImageUpload}
                    accept="image/*"
                  />
                  <label
                    htmlFor="sig-input"
                    className="cursor-pointer text-[9px] font-black uppercase tracking-widest py-2 px-4 bg-white border border-slate-200 rounded-lg hover:shadow-md transition-all"
                  >
                    {signature ? "Change Signature" : "Upload PNG/JPG"}
                  </label>
                </div>
                <p className="text-[8px] text-slate-400 text-center font-bold italic uppercase">
                  Recommended: Transparent PNG (300x150px)
                </p>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-10 py-4 bg-[#003366] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-[#C5A059] hover:text-[#003366] transition-all disabled:opacity-50 flex items-center gap-3"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <CheckCircle size={16} />
                )}
                Update Authority Credentials
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
