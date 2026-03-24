"use client";
import confetti from "canvas-confetti"; // Import the library
import { ChevronLeft, Send, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EvaluatePaper({ params }) {
  const router = useRouter();
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSuccess = () => {
    // 1. Fire the professional confetti burst
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      // Use conference colors: Blue and Gold
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ["#003366", "#C5A059"],
      });
    }, 250);

    // 2. Show toast and redirect after a short delay
    toast.success("Evaluation Completed Successfully!");
    setTimeout(() => {
      router.push("/reviewer/pending");
    }, 2000);
  };

  const submitReview = async () => {
    if (score === 0 || comments.length < 10) {
      return toast.error("Please provide a score and detailed comments.");
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/reviewer/submit-feedback`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId: params.id,
          rating: score,
          comments: comments,
          recommendation: score >= 4 ? "ACCEPT" : "REVISE",
          isFinalDecision: true,
        }),
      });

      if (res.ok) {
        handleSuccess();
      } else {
        toast.error("Failed to save evaluation.");
      }
    } catch (err) {
      toast.error("Connection error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-slate-500 hover:text-[#003366] font-bold mb-8 transition-colors"
      >
        <ChevronLeft size={20} /> Back to List
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-8 md:p-12 border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-[#fdfaf3] text-[#C5A059] rounded-2xl">
            <Star size={32} fill="currentColor" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#003366]">
              Peer Review Assessment
            </h2>
            <p className="text-slate-400 font-medium">
              Paper ID: {params.id.slice(-8)}
            </p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Scoring UI */}
          <section>
            <label className="block text-sm font-bold text-[#003366] uppercase tracking-widest mb-4">
              Scientific Quality Score
            </label>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setScore(num)}
                  className={`w-14 h-14 rounded-2xl font-bold text-xl transition-all duration-300 border-2 
                    ${
                      score === num
                        ? "bg-[#003366] border-[#003366] text-white scale-110 shadow-lg"
                        : "bg-white border-slate-100 text-slate-300 hover:border-[#C5A059] hover:text-[#C5A059]"
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </section>

          {/* Comments UI */}
          <section>
            <label className="block text-sm font-bold text-[#003366] uppercase tracking-widest mb-4">
              Constructive Feedback
            </label>
            <textarea
              className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2rem] h-48 outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all resize-none font-medium"
              placeholder="Minimum 10 characters required..."
              onChange={(e) => setComments(e.target.value)}
            />
          </section>

          <button
            disabled={isSubmitting}
            onClick={submitReview}
            className="w-full py-5 bg-[#C5A059] text-[#003366] font-extrabold rounded-[1.5rem] hover:bg-[#b8924d] shadow-xl shadow-[#C5A059]/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? (
              "Syncing with Database..."
            ) : (
              <>
                <Send size={20} /> Submit Evaluation
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
