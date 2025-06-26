import type { Code } from "../types";

type CodeCardProps = {
  code: Code;
};

export default function CodeCard({ code }: CodeCardProps) {
  return (
    <a
      href={code.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer min-w-[180px] max-w-xs"
      style={{ minHeight: "56px" }}
    >
      {/* Icon */}
      <svg
        className="w-6 h-6 mr-3 flex-shrink-0 text-purple-200"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16V4a2 2 0 012-2h7l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v6h6" />
      </svg>
      {/* Text */}
      <div className="flex flex-col items-start">
        <span className="font-bold text-white leading-tight">
          {code.filename}
        </span>
        <span className="text-xs text-purple-200 leading-tight">
          {code.topic}
        </span>
      </div>
    </a>
  );
}
