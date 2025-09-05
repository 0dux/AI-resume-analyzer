// ATS.tsx
import React from "react";

type Suggestion = {
  type: "good" | "improve";
  tip: string;
};

type ATSProps = {
  score: number; // 0–100
  suggestions: Suggestion[];
};

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Background gradient based on score
  const gradient =
    score > 69
      ? "from-green-100"
      : score > 49
      ? "from-yellow-100"
      : "from-red-100";

  // Icon based on score
  const scoreIcon =
    score > 69
      ? "/icons/ats-good.svg"
      : score > 49
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  return (
    <div
      className={`bg-gradient-to-br ${gradient} p-6 rounded-2xl shadow-lg w-full max-w-md`}
    >
      {/* Top Section */}
      <div className="flex items-center gap-3 mb-4">
        <img src={scoreIcon} alt="ATS Icon" className="w-10 h-10" />
        <h2 className="text-xl font-semibold">ATS Score – {score}/100</h2>
      </div>

      {/* Description */}
      <div className="mb-4">
        <h3 className="text-lg font-medium">Analysis Report</h3>
        <p className="text-gray-600 text-sm mt-1">
          Here’s how your score breaks down and where you can improve.
        </p>
      </div>

      {/* Suggestions */}
      <ul className="space-y-2 mb-4">
        {suggestions.map((s, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <img
              src={s.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt={s.type}
              className="w-5 h-5 mt-0.5"
            />
            <span className="text-sm">{s.tip}</span>
          </li>
        ))}
      </ul>

      {/* Closing Line */}
      <p className="font-medium text-gray-700">
        Keep improving to maximize your ATS score 🚀
      </p>
    </div>
  );
};

export default ATS;
