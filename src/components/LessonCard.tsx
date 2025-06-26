import { useState } from "react";
import PDFViewer from "./PDFViewer";
import type { Lesson } from "../types";

type LessonCardProps = {
  lesson: Lesson;
};

function LessonCard({ lesson }: LessonCardProps) {
  const [showPDF, setShowPDF] = useState(false);

  const handleButtonClick = (action: string, videoUrl?: string) => {
    switch (action) {
      case "Note":
        if (lesson.hasNote) {
          setShowPDF(true);
        } else {
          alert("No note available for this lesson.");
        }
        break;
      case "Recordings":
        if (videoUrl) {
          // Open Google Video URL in new tab
          window.open(videoUrl, "_blank");
        } else {
          alert("No recording available for this lesson.");
        }
        break;
      case "Quiz":
        if (lesson.hasQuiz) {
          // Open Google Form in new tab
          window.open(lesson.hasQuiz, "_blank");
        } else {
          alert("No quiz available for this lesson.");
        }
        break;
      case "Summary Checker":
        if (lesson.hasSummaryChecker) {
          alert(
            `AI Summary Checker for "${lesson.title}" - This would open an AI tool where students can type their summary and get validation on their recall.`
          );
        } else {
          alert("No summary checker available for this lesson.");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex flex-col bg-gray-800 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        {/* Lesson Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">
            {lesson.id} - {lesson.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {lesson.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Note Button */}
          <button
            onClick={() => handleButtonClick("Note")}
            disabled={!lesson.hasNote}
            className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 relative ${
              lesson.hasNote
                ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Note
            {/* Completion Status Indicator */}
            {lesson.hasNote && (
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  lesson.hasNote.isCompleted ? "bg-green-500" : "bg-yellow-500"
                }`}
                title={
                  lesson.hasNote.isCompleted ? "Completed Note" : "Blank Note"
                }
              />
            )}
          </button>

          {/* Quiz Button */}
          <button
            onClick={() => handleButtonClick("Quiz")}
            disabled={!lesson.hasQuiz}
            className={`flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              lesson.hasQuiz
                ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Quiz
          </button>

          {/* Summary Checker Button */}
          <button
            onClick={() => handleButtonClick("Summary Checker")}
            disabled={!lesson.hasSummaryChecker}
            className={`col-span-2 flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              lesson.hasSummaryChecker
                ? "bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                : "bg-gray-700 text-gray-500 cursor-not-allowed"
            }`}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            AI Check
          </button>

          {/* Recording Buttons */}
          {lesson.hasVideos &&
            lesson.hasVideos.map((videoUrl, index) => (
              <button
                onClick={() => handleButtonClick("Recordings", videoUrl)}
                className="col-span-2 flex items-center justify-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Recording - Part {index + 1}
              </button>
            ))}
        </div>

        {/* Availability Indicator */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex flex-wrap gap-2">
            {lesson.hasNote && (
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  lesson.hasNote.isCompleted
                    ? "bg-green-900 text-green-300"
                    : "bg-yellow-900 text-yellow-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mr-1 ${
                    lesson.hasNote.isCompleted
                      ? "bg-green-400"
                      : "bg-yellow-400"
                  }`}
                ></div>
                {lesson.hasNote.isCompleted ? "Completed Note" : "In Progress"}
              </span>
            )}
            {lesson.hasQuiz && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                Quiz
              </span>
            )}
            {lesson.hasSummaryChecker && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></div>
                AI Check
              </span>
            )}
            {lesson.hasVideos && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-900 text-red-300">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
                Recording
              </span>
            )}
          </div>
        </div>
      </div>

      {/* PDF Viewer Modal */}
      {showPDF && lesson.hasNote && (
        <PDFViewer
          url={lesson.hasNote.url}
          id={lesson.id}
          title={lesson.title}
          isCompleted={lesson.hasNote.isCompleted}
          onClose={() => setShowPDF(false)}
        />
      )}
    </>
  );
}

export default LessonCard;
