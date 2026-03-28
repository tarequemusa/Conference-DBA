"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Calendar as CalIcon,
  DollarSign,
  Loader2,
  Power,
  Save,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function SystemSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [config, setConfig] = useState({
    isSubmissionOpen: true,
    conferenceDate: "",
    registrationFee: 0,
  });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.conferenceDate) {
          data.conferenceDate = new Date(data.conferenceDate)
            .toISOString()
            .split("T")[0];
        }
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        body: JSON.stringify({
          ...config,
          conferenceDate: new Date(config.conferenceDate).toISOString(),
          registrationFee: parseFloat(config.registrationFee),
        }),
      });
      if (res.ok) toast.success("GLOBAL SETTINGS SYNCHRONIZED");
      else throw new Error();
    } catch (err) {
      toast.error("FAILED TO UPDATE SYSTEM");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-[#001A41] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
        <p className="text-[10px] text-white font-black uppercase tracking-[0.3em] mt-4">
          Loading Core Config...
        </p>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* --- DARK COMMAND HEADER --- */}
        <header className="h-32 bg-[#001A41] flex items-center justify-between px-12 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <Settings size={28} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none">
                System Settings
              </h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-2 opacity-80">
                Global Conference Infrastructure
              </p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-[#C5A059] text-[#001A41] font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-white transition-all shadow-xl disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <Save size={16} />
            )}
            Save Configuration
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* PORTAL STATUS CARD */}
            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div
                  className={`p-4 rounded-2xl ${config.isSubmissionOpen ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}
                >
                  <Power size={24} />
                </div>
                <div>
                  <h2 className="font-black text-[#003366] uppercase tracking-tight">
                    Submission Portal
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">
                    Toggle ability for researchers to upload new abstracts.
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setConfig({
                    ...config,
                    isSubmissionOpen: !config.isSubmissionOpen,
                  })
                }
                className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors focus:outline-none ${config.isSubmissionOpen ? "bg-emerald-500" : "bg-slate-300"}`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${config.isSubmissionOpen ? "translate-x-9" : "translate-x-1"}`}
                />
              </button>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DATE CONFIG */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                <h3 className="text-xs font-black text-[#003366] uppercase tracking-[0.2em] flex items-center gap-2">
                  <CalIcon size={16} className="text-[#C5A059]" /> Event
                  Timeline
                </h3>
                <input
                  type="date"
                  value={config.conferenceDate}
                  onChange={(e) =>
                    setConfig({ ...config, conferenceDate: e.target.value })
                  }
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 ring-[#C5A059] outline-none font-bold text-[#003366]"
                />
              </div>

              {/* FEE CONFIG */}
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6">
                <h3 className="text-xs font-black text-[#003366] uppercase tracking-[0.2em] flex items-center gap-2">
                  <DollarSign size={16} className="text-[#C5A059]" />{" "}
                  Registration Fee (USD)
                </h3>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                    $
                  </span>
                  <input
                    type="number"
                    value={config.registrationFee}
                    onChange={(e) =>
                      setConfig({ ...config, registrationFee: e.target.value })
                    }
                    className="w-full pl-10 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 ring-[#C5A059] outline-none font-bold text-[#003366]"
                  />
                </div>
              </div>
            </div>

            {/* SECURITY NOTICE */}
            <div className="p-6 bg-[#001A41] rounded-[2rem] text-white/80 flex items-center gap-4 border border-white/10 shadow-2xl">
              <ShieldCheck className="text-[#C5A059]" size={24} />
              <p className="text-[10px] font-black uppercase tracking-widest leading-loose">
                System Notice: These changes take effect immediately across all
                researcher dashboards. Closing the portal will prevent any
                further database writes for new submissions.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
