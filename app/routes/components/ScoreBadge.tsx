interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  let badgeColor = "bg-red-100 text-red-700";
  let badgeText = "Needs Work";

  if (score > 70) {
    badgeColor = "bg-green-100 text-green-700";
    badgeText = "Strong";
  } else if (score > 49) {
    badgeColor = "bg-yellow-100 text-yellow-700";
    badgeText = "Good Start";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeColor}`}
    >
      {badgeText}
    </span>
  );
};

export default ScoreBadge;
