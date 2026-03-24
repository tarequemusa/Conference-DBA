import { AlertCircle, Check, Clock, CreditCard, Lock } from "lucide-react";

const STEPS = [
  { id: "ABSTRACT_SUBMISSION", label: "Abstract Submission" },
  { id: "INITIAL_EVALUATION", label: "Initial Evaluation" },
  { id: "ACCEPTANCE_NOTIFICATION", label: "Acceptance" },
  { id: "PAYMENT_PENDING", label: "Registration & Payment" },
  { id: "FULL_PAPER_SUBMISSION", label: "Full Paper" },
  { id: "IN_DEPTH_REVIEW", label: "In-Depth Review" },
  { id: "REVISION_REQUIRED", label: "Revision Request" },
  { id: "FINAL_DECISION", label: "Final Decision" },
  { id: "PUBLICATION_OPPORTUNITY", label: "Publication" },
  { id: "RECOGNITION", label: "Recognition" },
];

export default function ReviewProcessTracker({ currentStatus, abstractId }) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStatus);

  const handlePayment = async () => {
    console.log("Initiating payment for abstract:", abstractId);
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ abstractId }),
    });
    const { url } = await res.json();
    if (url) window.location.href = url;
  };

  return (
    <div className="py-10 px-4">
      <div className="relative flex justify-between items-start">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 -z-10" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-[#C5A059] transition-all duration-1000 ease-in-out -z-10"
          style={{
            width: `${Math.max(0, (currentIndex / (STEPS.length - 1)) * 100)}%`,
          }}
        />

        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const isLocked = index > currentIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center w-full max-w-[100px]"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-md
                ${
                  isCompleted
                    ? "bg-[#C5A059] border-[#C5A059] text-white"
                    : isActive
                      ? "bg-white border-[#003366] text-[#003366] ring-4 ring-blue-50"
                      : "bg-white border-slate-200 text-slate-300"
                }`}
              >
                {isCompleted ? (
                  <Check size={20} strokeWidth={3} />
                ) : isActive ? (
                  <div className="relative flex items-center justify-center">
                    {/* Visual Radar Pulse */}
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#003366] opacity-20 animate-ping"></span>
                    <Clock size={18} className="relative z-10" />
                  </div>
                ) : step.id === "PAYMENT_PENDING" ? (
                  <CreditCard size={18} />
                ) : isLocked ? (
                  <Lock size={16} />
                ) : (
                  <Clock size={18} />
                )}
              </div>

              <span
                className={`mt-4 text-[10px] font-bold uppercase tracking-tighter text-center leading-tight
                ${isActive ? "text-[#003366]" : "text-slate-400"}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {currentStatus === "PAYMENT_PENDING" && (
        <div className="mt-12 p-6 bg-[#fdfaf3] border border-[#f0e6ce] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#C5A059] text-[#003366] rounded-2xl">
              <AlertCircle size={28} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-[#003366]">
                Action Required: Registration Fee
              </h4>
              <p className="text-sm text-slate-600">
                Your abstract has been accepted! Please settle the fees to
                proceed.
              </p>
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="whitespace-nowrap px-8 py-4 bg-[#003366] text-white font-bold rounded-2xl shadow-xl hover:bg-[#002244] transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <CreditCard size={20} />
            Pay Registration Fee
          </button>
        </div>
      )}
    </div>
  );
}
