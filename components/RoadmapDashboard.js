"use client";

const priorityColor = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function RoadmapDashboard({ data, onReset }) {
  const { jobFitScore, matchedSkills, missingSkills, roadmap, summary } = data;

  return (
    <div className="space-y-6">
      {/* Job fit score */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
            <path
              className="text-gray-100"
              stroke="currentColor"
              strokeWidth="3.5"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-brand"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${jobFitScore}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold text-gray-800">
            {jobFitScore}%
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Job-Fit Score
          </h2>
          <p className="text-sm text-gray-500 mt-1">{summary}</p>
        </div>
      </div>

      {/* Matched skills */}
      {matchedSkills?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Skills you already have that count
          </h3>
          <div className="flex flex-wrap gap-2">
            {matchedSkills.map((skill, i) => (
              <span
                key={i}
                className="text-xs font-medium bg-brand-light text-brand-dark px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Missing skills */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Skill gaps to close
        </h3>
        <ul className="space-y-3">
          {missingSkills?.map((item, i) => (
            <li key={i} className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {item.skill}
                </p>
                <p className="text-xs text-gray-500">{item.why}</p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                  priorityColor[item.priority] || "bg-gray-100 text-gray-600"
                }`}
              >
                {item.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Roadmap */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Your personalized learning roadmap
        </h3>
        <ol className="relative border-l border-gray-200 ml-2 space-y-6">
          {roadmap?.map((step) => (
            <li key={step.step} className="ml-4">
              <div className="absolute w-3 h-3 bg-brand rounded-full -left-[6.5px] mt-1.5 border-2 border-white" />
              <p className="text-sm font-medium text-gray-800">
                Step {step.step}: {step.skill}
              </p>
              <p className="text-xs text-gray-500">
                Resource: {step.resource} · ~{step.estimatedWeeks} week
                {step.estimatedWeeks === 1 ? "" : "s"}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <button
        onClick={onReset}
        className="text-sm text-brand font-medium hover:underline"
      >
        ← Analyze a different profile
      </button>
    </div>
  );
    }
