"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Camera,
  CheckCircle2,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  PenTool,
  Save,
  User,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    signature: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        image: session.user.image || "",
        signature: session.user.signature || "",
      }));
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: formData.name,
      image: formData.image,
      signature: formData.signature,
    };

    if (formData.newPassword.trim() !== "") {
      payload.currentPassword = formData.currentPassword;
      payload.newPassword = formData.newPassword;
    }

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        await update({
          ...session,
          user: {
            ...session?.user,
            name: formData.name,
            image: formData.image,
            signature: formData.signature,
          },
        });

        toast.success("Identity records updated!");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
        }));
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- COMMAND CENTER HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059] shadow-inner">
              <User size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                Account Settings
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Identity & Digital Credentials
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            <CheckCircle2 size={14} /> Encrypted Session
          </div>
        </header>

        <div className="p-6 md:p-12 overflow-y-auto custom-scrollbar">
          <form
            onSubmit={handleUpdate}
            className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100 space-y-12 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* --- Profile Photo Section --- */}
              <div className="space-y-6">
                <h3 className="text-xs font-black text-[#003366] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Camera size={16} className="text-[#C5A059]" /> Avatar
                  Identity
                </h3>
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={40} className="text-slate-200" />
                      )}
                    </div>
                  </div>
                  <CldUploadWidget
                    uploadPreset="conference_dba_uploads"
                    onSuccess={(result) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: result.info.secure_url,
                      }))
                    }
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-[#003366] text-white rounded-xl hover:bg-[#C5A059] transition-all shadow-lg"
                      >
                        Upload Photo
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              {/* --- NEW: Signature Section --- */}
              <div className="space-y-6">
                <h3 className="text-xs font-black text-[#003366] uppercase tracking-[0.2em] flex items-center gap-2">
                  <PenTool size={16} className="text-[#C5A059]" /> Official
                  Signature
                </h3>
                <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-xl bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')]">
                      {formData.signature ? (
                        <img
                          src={formData.signature}
                          alt="Signature"
                          className="w-full h-full object-contain p-2 mix-blend-multiply contrast-125"
                        />
                      ) : (
                        <ImageIcon
                          size={32}
                          className="text-slate-200 opacity-50"
                        />
                      )}
                    </div>
                  </div>
                  <CldUploadWidget
                    uploadPreset="conference_dba_uploads"
                    onSuccess={(result) =>
                      setFormData((prev) => ({
                        ...prev,
                        signature: result.info.secure_url,
                      }))
                    }
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="text-[10px] font-black uppercase tracking-widest px-6 py-3 border-2 border-[#003366] text-[#003366] rounded-xl hover:bg-[#003366] hover:text-white transition-all"
                      >
                        Upload Sign
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>

            {/* --- Basic Info --- */}
            <div className="space-y-8">
              <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter flex items-center gap-3">
                <User size={22} className="text-[#C5A059]" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#C5A059] outline-none transition-all font-bold text-[#003366]"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Email (Immutable)
                  </label>
                  <div className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 flex items-center gap-3 cursor-not-allowed font-bold">
                    <Mail size={16} /> {session?.user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Security --- */}
            <div className="space-y-8 pt-4">
              <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter flex items-center gap-3">
                <Lock size={22} className="text-[#C5A059]" /> Security Protocol
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#C5A059] outline-none transition-all pr-14 font-bold"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C5A059] transition-colors"
                  >
                    {showCurrentPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    placeholder="New Secure Password"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-[#C5A059] outline-none transition-all pr-14 font-bold"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C5A059] transition-colors"
                  >
                    {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 bg-[#001A41] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#001A41] active:scale-[0.98] transition-all flex items-center justify-center gap-4 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Deploy Profile Changes
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
