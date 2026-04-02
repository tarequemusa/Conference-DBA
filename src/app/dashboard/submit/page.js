"use client";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  Check,
  ChevronDown,
  FileText,
  Info,
  Loader2,
  PlusCircle,
  Search,
  Send,
  Tag,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const SUB_THEMES = [
  "Strategic Issues in Supply Chain Management",
  "Global Supply Chain Integration",
  "Industrial Application of Supply Chain Management",
  "Supply Chain Sustainability",
  "Circular Economy",
  "Supply Chain Digtization/AI application in SCM",
  "Supply Chain Management and SDGs",
  "Geo Politics, Geo Economy and SCM",
  "Supply Chain Finance",
  "Supply Chain Optimization",
  "Talent Management in SCM",
  "Outsourcing Logistics Services",
  "Responsible and Ethical SCM",
  "Building Adaptive and Risk-Intelligent Supply Chains",
];

export default function SubmitAbstract() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [themeSearch, setThemeSearch] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: "",
    subTheme: "",
    coAuthors: [],
    authorInput: "",
    abstract: "",
  });

  const CHARACTER_LIMIT = 500;

  // 🚀 Logic: Handle Co-Author Tags
  const handleAuthorKeyDown = (e) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const val = formData.authorInput.trim();
      if (val && !formData.coAuthors.includes(val)) {
        setFormData({
          ...formData,
          coAuthors: [...formData.coAuthors, val],
          authorInput: "",
        });
      }
    }
  };

  const removeAuthor = (index) => {
    setFormData({
      ...formData,
      coAuthors: formData.coAuthors.filter((_, i) => i !== index),
    });
  };

  // 🚀 Logic: Filtered Themes
  const filteredThemes = useMemo(() => {
    return SUB_THEMES.filter((t) =>
      t.toLowerCase().includes(themeSearch.toLowerCase()),
    );
  }, [themeSearch]);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = true;
    if (!formData.subTheme) newErrors.subTheme = true;
    if (!formData.abstract.trim()) newErrors.abstract = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/abstracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title.trim(),
          subTheme: formData.subTheme,
          coAuthors: formData.coAuthors.join(", "),
          abstract: formData.abstract.trim(),
        }),
      });

      if (res.ok) {
        toast.success("Abstract submitted successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Submission failed.");
      }
    } catch (err) {
      toast.error("Server connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-28 md:h-32 bg-[#001A41] flex items-center justify-between px-6 md:px-12 shadow-2xl shrink-0 z-20">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="p-2 md:p-3 bg-white/5 border border-white/10 rounded-2xl text-[#C5A059]">
              <PlusCircle size={24} />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter">
                Submit Research
              </h1>
              <p className="text-[8px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1">
                DBA CONFERENCE 2026
              </p>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-12 custom-scrollbar bg-slate-50/30">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl border border-slate-100 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#003366] via-[#C5A059] to-[#003366]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Paper Title (Custom/Dropdown Hybrid) */}
                <div className="space-y-3 md:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <FileText size={14} className="text-[#C5A059]" /> Research
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Full title of your research paper..."
                    className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border transition-all outline-none font-bold text-[#003366] ${errors.title ? "border-red-500 ring-1 ring-red-500" : "border-slate-100 focus:ring-2 focus:ring-[#C5A059]"}`}
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      if (errors.title) setErrors({ ...errors, title: false });
                    }}
                  />
                </div>

                {/* Sub Theme Selection */}
                <div className="space-y-3 md:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <Tag size={14} className="text-[#C5A059]" /> Abstract
                    Sub-Theme
                  </label>
                  <div className="relative group">
                    <div
                      className={`flex items-center bg-slate-50 border rounded-2xl px-4 py-1 transition-all ${errors.subTheme ? "border-red-500 ring-1 ring-red-500" : "border-slate-100 focus-within:ring-2 focus-within:ring-[#C5A059]"}`}
                    >
                      <Search size={16} className="text-slate-400 mr-2" />
                      <input
                        type="text"
                        placeholder="Search or select theme..."
                        className="w-full py-3 bg-transparent outline-none font-bold text-[#003366] text-sm"
                        value={themeSearch || formData.subTheme}
                        onChange={(e) => {
                          setThemeSearch(e.target.value);
                          setFormData({
                            ...formData,
                            subTheme: e.target.value,
                          });
                        }}
                        onFocus={() => setThemeSearch("")}
                      />
                      <ChevronDown size={16} className="text-slate-400" />
                    </div>

                    <div className="hidden group-focus-within:block absolute left-0 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-30 max-h-60 overflow-y-auto p-2 no-scrollbar animate-in fade-in slide-in-from-top-2">
                      {filteredThemes.map((theme) => (
                        <div
                          key={theme}
                          onMouseDown={() => {
                            setFormData({ ...formData, subTheme: theme });
                            setThemeSearch(theme);
                            if (errors.subTheme)
                              setErrors({ ...errors, subTheme: false });
                          }}
                          className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 rounded-xl cursor-pointer text-xs font-bold text-slate-600 transition-colors"
                        >
                          {theme}
                          {formData.subTheme === theme && (
                            <Check size={14} className="text-[#C5A059]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Co-Authors Tag Input */}
                <div className="space-y-3 md:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <User size={14} className="text-[#C5A059]" /> Co-Authors
                    (Separate by comma)
                  </label>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-50 border border-slate-100 rounded-2xl min-h-[60px]">
                    {formData.coAuthors.map((author, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-1 bg-[#001A41] text-[#C5A059] px-3 py-1.5 rounded-lg text-[10px] font-black uppercase"
                      >
                        {author}
                        <X
                          size={12}
                          className="cursor-pointer hover:text-white"
                          onClick={() => removeAuthor(idx)}
                        />
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder={
                        formData.coAuthors.length === 0
                          ? "Dr. John Doe, Sarah Smith..."
                          : ""
                      }
                      className="flex-1 bg-transparent outline-none font-bold text-[#003366] text-sm min-w-[150px] px-2"
                      value={formData.authorInput}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          authorInput: e.target.value,
                        })
                      }
                      onKeyDown={handleAuthorKeyDown}
                    />
                  </div>
                </div>

                {/* Abstract Textarea */}
                <div className="space-y-3 md:col-span-2">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                    <Info size={14} className="text-[#C5A059]" /> Abstract
                    Summary
                  </label>
                  <textarea
                    rows={6}
                    maxLength={CHARACTER_LIMIT}
                    placeholder="Provide a brief summary of your research..."
                    className={`w-full px-6 py-5 rounded-[2rem] bg-slate-50 border transition-all outline-none resize-none font-medium text-[#003366] leading-relaxed ${errors.abstract ? "border-red-500 ring-1 ring-red-500" : "border-slate-100 focus:ring-2 focus:ring-[#C5A059]"}`}
                    value={formData.abstract}
                    onChange={(e) => {
                      setFormData({ ...formData, abstract: e.target.value });
                      if (errors.abstract)
                        setErrors({ ...errors, abstract: false });
                    }}
                  />
                  <div className="flex justify-between items-center px-2">
                    <p className="text-[9px] text-slate-400 font-black uppercase italic tracking-widest">
                      Max 500 words for primary triage
                    </p>
                    <p
                      className={`text-[10px] font-black ${formData.abstract.length >= CHARACTER_LIMIT ? "text-red-500" : "text-slate-400"}`}
                    >
                      {formData.abstract.length} / {CHARACTER_LIMIT}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => validate() && setShowConfirm(true)}
                className="w-full py-5 bg-[#001A41] text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-2xl hover:bg-[#C5A059] hover:text-[#001A41] active:scale-[0.98] transition-all flex items-center justify-center gap-4"
              >
                <Send size={18} /> Preview Submission
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- PREVIEW MODAL --- */}
      {showConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#001A41]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 relative border border-white/10">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#C5A059]" />
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-[#003366] uppercase tracking-tighter">
                  Review Details
                </h3>
                <X
                  size={20}
                  className="cursor-pointer text-slate-400 hover:text-red-500"
                  onClick={() => setShowConfirm(false)}
                />
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Thematic Area
                  </p>
                  <p className="text-xs font-bold text-[#C5A059] uppercase">
                    {formData.subTheme}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Research Title
                  </p>
                  <p className="font-black text-[#003366] text-lg leading-tight uppercase">
                    {formData.title}
                  </p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Personnel
                  </p>
                  <p className="font-bold text-slate-600 text-xs uppercase">
                    {formData.coAuthors.length > 0
                      ? formData.coAuthors.join(" | ")
                      : "Solo Researcher"}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">
                    Abstract Content
                  </p>
                  <div className="bg-slate-50 p-6 rounded-2xl italic text-sm text-slate-600 leading-relaxed">
                    "{formData.abstract}"
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-4 border-2 border-slate-100 text-slate-400 font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-slate-50"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-4 bg-[#C5A059] text-[#003366] font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl hover:bg-[#001A41] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Confirm & Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
