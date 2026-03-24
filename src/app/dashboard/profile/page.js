"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Camera,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Loader2,
  Lock,
  Mail,
  Save,
  Shield,
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
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
        image: session.user.image || "",
      }));
    }
  }, [session]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Filter payload so we don't send empty strings for passwords
    const payload = {
      name: formData.name,
      image: formData.image,
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
          },
        });

        toast.success("Profile updated successfully!");
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
      <main className="flex-1 p-4 md:p-12 pt-20 md:pt-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-[#003366]">
              Account Settings
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              Manage your identity and security.
            </p>
          </header>

          <form
            onSubmit={handleUpdate}
            className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-xl border border-slate-100 space-y-8"
          >
            {/* --- Photo Section --- */}
            <div className="flex flex-col items-center md:flex-row gap-8 pb-8 border-b border-slate-50">
              <div className="relative">
                <div className="w-28 h-28 rounded-[2rem] bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={48} className="text-slate-300" />
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 p-2.5 bg-[#C5A059] text-white rounded-xl shadow-lg border-4 border-white">
                  <Camera size={18} />
                </div>
              </div>

              <div className="flex-1 w-full space-y-4">
                <h3 className="text-sm font-bold text-[#003366] uppercase tracking-wider">
                  Profile Picture
                </h3>
                <CldUploadWidget
                  uploadPreset="conference_dba_uploads"
                  onSuccess={(result) =>
                    setFormData({ ...formData, image: result.info.secure_url })
                  }
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-50 hover:bg-slate-100 text-[#003366] font-bold rounded-2xl transition-all border-2 border-dashed border-slate-200"
                    >
                      <ImageIcon size={18} className="text-[#C5A059]" /> Select
                      New Image
                    </button>
                  )}
                </CldUploadWidget>
              </div>
            </div>

            {/* --- Basic Info --- */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#003366] flex items-center gap-2">
                <User size={20} className="text-[#C5A059]" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Email
                  </label>
                  <div className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 flex items-center gap-2 cursor-not-allowed">
                    <Mail size={16} /> {session?.user?.email}
                  </div>
                </div>
              </div>
            </div>

            {/* --- Security --- */}
            <div className="pt-8 border-t border-slate-50 space-y-6">
              <h2 className="text-xl font-bold text-[#003366] flex items-center gap-2">
                <Lock size={20} className="text-[#C5A059]" /> Change Password
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Password Field */}
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    placeholder="Current Password"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all pr-12"
                    value={formData.currentPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currentPassword: e.target.value,
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C5A059] transition-colors"
                  >
                    {showCurrentPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* New Password Field */}
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    placeholder="New Password"
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all pr-12"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#C5A059] transition-colors"
                  >
                    {showNewPass ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 flex items-center gap-2">
                <Shield size={14} /> Min. 8 characters with numbers & letters.
              </p>
            </div>

            <button
              disabled={loading}
              className="w-full py-5 bg-[#003366] text-white font-bold rounded-2xl shadow-lg hover:bg-[#002244] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <Save size={20} /> Update Account
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
