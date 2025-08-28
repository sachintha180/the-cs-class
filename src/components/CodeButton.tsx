import type { Code } from "../types/lesson";
import { CodeIcon } from "lucide-react";

type CodeButtonProps = {
  code: Code;
};

export default function CodeButton({ code }: CodeButtonProps) {
  return (
    <a
      href={code.embedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`p-2 rounded-lg flex-shrink-0 ${
            code.type === "snippet" ? "bg-green-600/20" : "bg-amber-600/20"
          }`}
        >
          <CodeIcon
            className={`w-5 h-5 ${
              code.type === "snippet" ? "text-green-400" : "text-amber-400"
            }`}
          />
        </div>

        {/* Text */}
        <div className="flex flex-col items-start min-w-0 flex-1">
          <span className="text-gray-400 leading-tight text-sm font-mono">
            {code.title}
          </span>
        </div>
      </div>
    </a>
  );
}
