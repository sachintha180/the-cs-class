import { useState } from "react";
import type { Lesson } from "../types/lesson";
import PDFViewer from "./PDFViewer";
import RecordingPlayer from "./VideoPlayer";
import { BookOpenIcon, CalendarIcon, VideoIcon } from "lucide-react";
import Card from "./Card";

export type LessonCardProps = {
  lesson: Lesson;
};

function LessonCard({ lesson }: LessonCardProps) {
  // State for PDF and Recording modals
  const [showPDF, setShowPDF] = useState(false);
  const [showRecording, setShowRecording] = useState(false);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Handle note click
  const handleNoteClick = () => {
    if (lesson.noteUrl) {
      setShowPDF(true);
    }
  };

  // Handle recording click
  const handleRecordingClick = () => {
    if (lesson.recordingUrl) {
      setShowRecording(true);
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-start gap-4">
          {/* Lesson ID Tag */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-mono bg-gray-700 rounded-lg px-2 py-1">
              {lesson.id.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Lesson Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
            <p className="text-sm text-gray-400">{lesson.description}</p>
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDate(lesson.date)}</span>
            </p>
          </div>

          {/* Action Links */}
          <div className="flex gap-2">
            {/* Note Link */}
            {lesson.noteUrl && (
              <button
                onClick={handleNoteClick}
                className="flex items-center gap-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                title="View Note"
              >
                <BookOpenIcon className="w-4 h-4" />
                <span className="lg:inline-block hidden">Note</span>
              </button>
            )}

            {/* Recording Link */}
            {lesson.recordingUrl && (
              <button
                onClick={handleRecordingClick}
                className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer"
                title="Watch Recording"
              >
                <VideoIcon className="w-4 h-4" />
                <span className="lg:inline hidden">Recording</span>
              </button>
            )}
          </div>
        </div>
      </Card>

      {/* PDF Viewer Modal */}
      {showPDF && lesson.noteUrl && (
        <PDFViewer
          url={lesson.noteUrl}
          title={lesson.title}
          onClose={() => setShowPDF(false)}
        />
      )}

      {/* Recording Player Modal */}
      {showRecording && lesson.recordingUrl && (
        <RecordingPlayer
          url={lesson.recordingUrl}
          title={lesson.title}
          onClose={() => setShowRecording(false)}
        />
      )}
    </>
  );
}

export default LessonCard;
