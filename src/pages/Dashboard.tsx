import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ClassLevel } from "../types";
import LessonCard from "../components/LessonCard";
import { codeData, lessonsData } from "../data/lessons";
import CodeCard from "../components/CodeCard";

function Dashboard() {
  const [selectedClass, setSelectedClass] = useState<ClassLevel>("CIE A2");
  const navigate = useNavigate();

  const handleClassSelect = (classLevel: ClassLevel) => {
    setSelectedClass(classLevel);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-purple-500/20">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              The<span className="text-purple-400">CS</span>Class
            </h2>
            <button
              onClick={handleGoHome}
              className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              title="Go Home"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Select Class Level
            </h3>

            {(["Edexcel IGCSE", "CIE AS", "CIE A2"] as ClassLevel[]).map(
              (classLevel) => (
                <button
                  key={classLevel}
                  onClick={() => handleClassSelect(classLevel)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer ${
                    selectedClass === classLevel
                      ? "bg-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{classLevel}</span>
                    {selectedClass === classLevel && (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {selectedClass} Lessons
            </h1>
            <p className="text-gray-400">
              {lessonsData[selectedClass].length} lessons available
            </p>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessonsData[selectedClass].map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>

          {/* Code Container */}
          <div className="mt-8 flex flex-col justify-center  bg-gray-800 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
            {/* Lesson Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-2">Python Code</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Download the Python Programs from exercises and questions
                discussed during class.
              </p>
            </div>

            <div className="mt-auto pt-4 border-t border-gray-700 flex flex-row flex-wrap gap-3">
              {codeData[selectedClass].map((code) => (
                <CodeCard key={code.id} code={code} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
