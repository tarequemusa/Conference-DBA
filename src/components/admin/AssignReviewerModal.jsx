"use client";
import { Check, Loader2, UserPlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AssignReviewerModal({
  abstract,
  isOpen,
  onClose,
  onRefresh,
}) {
  // 1. Initialized as empty array to prevent .map crashes
  const [reviewers, setReviewers] = useState([]);
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Fetch only users who have the REVIEWER role
      fetch("/api/admin/users?role=REVIEWER")
        .then((res) => res.json())
        .then((data) => {
          // 2. Defensive check: ensure the API returned an array
          if (Array.isArray(data)) {
            setReviewers(data);
          } else {
            console.error("API did not return an array:", data);
            setReviewers([]);
          }
        })
        .catch((err) => {
          toast.error("Could not load reviewer list");
          setReviewers([]);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isOpen]);

  const toggleReviewer = (id) => {
    setSelectedReviewers((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id],
    );
  };

  const handleAssign = async () => {
    if (selectedReviewers.length === 0)
      return toast.error("Select at least one reviewer");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/assign-reviewers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          abstractId: abstract?.id,
          reviewerIds: selectedReviewers,
        }),
      });

      if (res.ok) {
        toast.success("Reviewers assigned successfully!");
        onRefresh();
        onClose();
        setSelectedReviewers([]); // Clear selection on success
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Assignment failed");
      }
    } catch (err) {
      toast.error("Server connection error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#003366]/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-xl font-bold text-[#003366]">
              Assign Reviewers
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[300px] mt-1">
              Paper: {abstract?.title || "Untitled Submission"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          {isLoading ? (
            <div className="py-20 flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-[#C5A059]" size={32} />
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Searching Experts...
              </p>
            </div>
          ) : Array.isArray(reviewers) && reviewers.length > 0 ? (
            reviewers.map((reviewer) => (
              <button
                key={reviewer.id}
                onClick={() => toggleReviewer(reviewer.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  selectedReviewers.includes(reviewer.id)
                    ? "border-[#C5A059] bg-[#fdfaf3] shadow-md shadow-amber-900/5"
                    : "border-slate-50 hover:border-slate-200 bg-slate-50/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#003366] text-white flex items-center justify-center font-bold">
                    {reviewer.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left overflow-hidden">
                    <p className="font-bold text-[#003366] text-sm truncate">
                      {reviewer.name}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
                      {reviewer.email?.split("@")[0]}
                    </p>
                  </div>
                </div>
                {selectedReviewers.includes(reviewer.id) && (
                  <div className="bg-[#C5A059] text-white p-1 rounded-full">
                    <Check size={14} strokeWidth={4} />
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-slate-400 text-sm font-medium">
                No active reviewers found.
              </p>
              <p className="text-[10px] text-slate-300 uppercase mt-1">
                Check User Management to promote staff
              </p>
            </div>
          )}
        </div>

        <div className="p-8 bg-slate-50/50 border-t border-slate-50">
          <button
            onClick={handleAssign}
            disabled={isSubmitting || selectedReviewers.length === 0}
            className="w-full py-4 bg-[#003366] text-white font-bold rounded-2xl shadow-lg hover:bg-[#002244] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <UserPlus size={20} /> Confirm {selectedReviewers.length}{" "}
                Assignment{selectedReviewers.length !== 1 ? "s" : ""}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
