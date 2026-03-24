"use client";
import { AlertCircle, CheckCircle, FileText, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function AbstractForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    abstract: "",
  });

  const charLimit = 300;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return alert("Please login to submit");

    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/abstracts/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId: session.user.id }),
      });

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Abstract submitted successfully! Redirecting to dashboard...",
        });
        setFormData({ title: "", authors: "", abstract: "" });
        setTimeout(() => (window.location.href = "/dashboard"), 2000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white rounded-[2rem] shadow-xl border border-slate-100">
      <div className="mb-8 flex items-center gap-4">
        <div className="bg-[#003366] p-3 rounded-2xl text-white">
          <FileText size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#003366]">
            Paper Submission
          </h2>
          <p className="text-slate-500 text-sm">
            Submit your research abstract for ICEBTM 2025
          </p>
        </div>
      </div>

      {message.text && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="text-sm font-medium">{message.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Paper Title
          </label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all"
            placeholder="Enter full title of your research"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
            Authors & Affiliations
          </label>
          <input
            required
            type="text"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all"
            placeholder="e.g. John Doe (EWU), Jane Smith (DU)"
            value={formData.authors}
            onChange={(e) =>
              setFormData({ ...formData, authors: e.target.value })
            }
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
              Short Abstract
            </label>
            <span
              className={`text-xs font-bold ${formData.abstract.length > charLimit ? "text-red-500" : "text-slate-400"}`}
            >
              {formData.abstract.length} / {charLimit} Characters
            </span>
          </div>
          <textarea
            required
            maxLength={charLimit}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#C5A059] outline-none transition-all h-32 resize-none"
            placeholder="Provide a brief summary of your work..."
            value={formData.abstract}
            onChange={(e) =>
              setFormData({ ...formData, abstract: e.target.value })
            }
          ></textarea>
          <p className="mt-2 text-[10px] text-slate-400 italic italic font-medium">
            *Note: Full paper submission will be required after abstract
            acceptance.
          </p>
        </div>

        <button
          disabled={loading || formData.abstract.length > charLimit}
          className="w-full bg-[#003366] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Submit Abstract"} <Send size={18} />
        </button>
      </form>
    </div>
  );
}
