"use client";

import { useState } from "react";

const EXAMPLE_SKILLS =
  "Python, basic HTML/CSS, SQL fundamentals, completed a college DBMS course, built one static portfolio website.";

export default function SkillForm({ onResult }) {
  const [skills, setSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!skills.trim() || !targetRole.trim()) {
      setError("Please fill in both your current skills and target role.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, targetRole }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Analysis failed.");
      }
      onResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your current skills / resume text
        </label>
        <textarea
          className="w-full rounded-xl border border-gray-200 p-3 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder={`e.g. ${EXAMPLE_SKILLS}`}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Target role / domain
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          placeholder="e.g. Frontend Developer, Data Analyst, ML Engineer"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand hover:bg-brand-dark transition-colors text-white font-medium py-3 rounded-xl disabled:opacity-60"
      >
        {loading ? "Analyzing your skill gap..." : "Generate my roadmap"}
      </button>
    </form>
  );
}
