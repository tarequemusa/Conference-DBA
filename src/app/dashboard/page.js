"use client";
import ReviewProcessTracker from "@/components/dashboard/ReviewProcessTracker";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  ArrowRight,
  Bell,
  CalendarClock,
  CreditCard,
  FileText,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [abstracts, setAbstracts] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    } else if (status === "authenticated") {
      if (session?.user?.role === "ADMIN") return router.push("/admin");
      if (session?.user?.role === "REVIEWER") return router.push("/reviewer");
      if (session?.user?.role === "AUTHORITY") return router.push("/authority");

      fetchAbstracts();
    }
  }, [status, session, router]);

  const fetchAbstracts = async () => {
    try {
      const res = await fetch("/api/user/abstracts");
      const data = await res.json();
      if (res.ok) setAbstracts(data);
    } catch (err) {
      toast.error("Database connection error");
    } finally {
      setLoadingData(false);
    }
  };

  const handlePaymentInitiation = async (abstractId) => {
    const loadingToast = toast.loading("PREPARING SECURE GATEWAY...", {
      style: {
        background: "#003366",
        color: "#fff",
        border: "1px solid #C5A059",
      },
    });

    try {
      const res = await fetch("/api/user/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ abstractId }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.dismiss(loadingToast);
        router.push(data.checkoutUrl);
      } else {
        toast.error(data.error || "Payment Failed", { id: loadingToast });
      }
    } catch (err) {
      toast.error("Connection Error", { id: loadingToast });
    }
  };

  if (status === "loading" || loadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#003366]">
        <Loader2 className="animate-spin text-[#C5A059]" size={40} />
      </div>
    );
  }

  const latestAbstract = abstracts[0];

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-12 custom-scrollbar">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#003366] uppercase tracking-tighter">
              Researcher Workspace
            </h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1 italic">
              Manage your submissions
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/submit")}
            className="flex items-center gap-2 px-6 py-3 bg-[#C5A059] text-[#003366] font-black uppercase text-[11px] tracking-widest rounded-2xl shadow-lg hover:scale-105 transition-all"
          >
            <PlusCircle size={20} /> Submit Abstract
          </button>
        </header>

        {/* PAYMENT CARD (Conditional) */}
        {latestAbstract?.status === "ACCEPTANCE_NOTIFICATION" && (
          <div className="mb-8 bg-[#003366] rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-[#C5A059]/20 transition-all duration-700"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="p-5 bg-[#C5A059] text-[#003366] rounded-[2rem] shadow-xl">
                  <CreditCard size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2">
                    Registration Open
                  </h2>
                  <p className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.2em]">
                    Final step to confirm your slot
                  </p>
                </div>
              </div>
              <button
                onClick={() => handlePaymentInitiation(latestAbstract.id)}
                className="w-full md:w-auto px-10 py-5 bg-white text-[#003366] font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[#C5A059] transition-all flex items-center justify-center gap-3 shadow-lg group"
              >
                Pay Registration Fee{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition-transform"
                />
              </button>
            </div>
          </div>
        )}

        {/* TRACKER SECTION */}
        <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl p-8 md:p-10 mb-8 relative overflow-hidden">
          {latestAbstract ? (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#003366] uppercase tracking-tighter">
                  Live Status
                </h2>
                <span
                  className={`px-4 py-1.5 text-[10px] font-black rounded-full border uppercase tracking-widest ${latestAbstract.status === "CONFIRMED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-blue-50 text-blue-600 border-blue-100"}`}
                >
                  {latestAbstract.status.replace(/_/g, " ")}
                </span>
              </div>
              <ReviewProcessTracker
                currentStatus={latestAbstract.status}
                abstractId={latestAbstract.id}
              />
            </>
          ) : (
            <div className="py-12 text-center opacity-40 italic">
              No abstracts submitted.
            </div>
          )}
        </section>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Submissions", val: abstracts.length, icon: FileText },
            { label: "Deadlines", val: "May 20", icon: CalendarClock },
            {
              label: "Alerts",
              val: latestAbstract?.status === "CONFIRMED" ? "00" : "01",
              icon: Bell,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-5"
            >
              <div className="p-4 bg-slate-50 text-[#003366] rounded-2xl">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-2xl font-black text-[#003366]">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
