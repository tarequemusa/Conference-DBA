"use client";

import { useState } from "react";

export default function RegisterModal({ close }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    affiliation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      alert("Registration Successful!");
      close();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md relative">
        <button onClick={close} className="absolute top-2 right-2 text-red-500">
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Full Name"
            className="input"
            required
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="input"
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="text"
            placeholder="Affiliation"
            className="input"
            onChange={(e) => setForm({ ...form, affiliation: e.target.value })}
          />

          <button className="bg-blue-600 text-white w-full py-2 rounded">
            Submit Registration
          </button>
        </form>
      </div>
    </div>
  );
}
