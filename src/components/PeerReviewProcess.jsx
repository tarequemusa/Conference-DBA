"use client";
import {
  Award,
  Bell,
  BookOpen,
  CheckCircle,
  CreditCard,
  Edit3,
  FileCheck,
  FileText,
  Search,
  Star,
} from "lucide-react";

const steps = [
  {
    id: "ABSTRACT_SUBMISSION",
    title: "Abstract Submission",
    icon: <FileText />,
    desc: "Researchers submit an initial abstract highlighting the research problem.",
  },
  {
    id: "INITIAL_EVALUATION",
    title: "Initial Evaluation",
    icon: <Search />,
    desc: "The submission is evaluated by experts for innovation and relevance.",
  },
  {
    id: "ACCEPTANCE_NOTIFICATION",
    title: "Acceptance Notification",
    icon: <Bell />,
    desc: "Authors are notified regarding the acceptance status.",
  },
  {
    id: "REGISTRATION",
    title: "Conference Registration",
    icon: <CreditCard />,
    desc: "Accepted authors complete registration and settle fees.",
  },
  {
    id: "FULL_PAPER_SUBMISSION",
    title: "Full Paper Submission",
    icon: <FileCheck />,
    desc: "Authors submit the full paper for a comprehensive review.",
  },
  {
    id: "IN_DEPTH_REVIEW",
    title: "In-Depth Review",
    icon: <BookOpen />,
    desc: "Expert reviewers assess research quality and methodology rigor.",
  },
  {
    id: "REVISION_REQUEST",
    title: "Revision Request",
    icon: <Edit3 />,
    desc: "Authors may be requested to modify papers based on suggestions.",
  },
  {
    id: "FINAL_DECISION",
    title: "Final Decision",
    icon: <CheckCircle />,
    desc: "Committee makes a final decision on program inclusion.",
  },
  {
    id: "PUBLICATION",
    title: "Publication Opportunity",
    icon: <Award />,
    desc: "Papers may be selected for conference proceedings.",
  },
  {
    id: "RECOGNITION",
    title: "Recognition",
    icon: <Star />,
    desc: "Exceptional papers may be nominated for awards.",
  },
];

export default function PeerReviewProcess({ currentStatus }) {
  return (
    <section className="py-16 bg-gray-50 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-center text-slate-800 mb-12">
          Peer Review Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isActive = step.id === currentStatus;
            return (
              <div
                key={index}
                className={`relative bg-white p-6 rounded-xl shadow-sm border-t-4 transition-all duration-300 ${
                  isActive
                    ? "border-cyan-500 shadow-lg scale-105 z-10"
                    : "border-cyan-200 opacity-80"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`p-3 rounded-lg mb-4 ${isActive ? "bg-cyan-100 text-cyan-600" : "bg-slate-100 text-slate-400"}`}
                  >
                    {step.icon}
                  </div>
                  <h3 className="text-red-500 font-bold mb-3 text-sm uppercase tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {isActive && (
                  <div className="absolute -top-2 -right-2 bg-cyan-500 text-white text-[10px] px-2 py-1 rounded-full animate-bounce">
                    Your Stage
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
