import { useState } from "react";
import type { Video } from "../types/lesson";
import RecordingPlayer from "./VideoPlayer";
import { CalendarIcon, VideoIcon } from "lucide-react";
import Card from "./Card";

export type VideoCardProps = {
  video: Video;
};

export default function VideoCard({ video }: VideoCardProps) {
  const [showRecording, setShowRecording] = useState(false);

  // Format date
  const formatDate = (date: string | Date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Handle recording click
  const handleRecordingClick = () => {
    if (video.embedUrl) {
      setShowRecording(true);
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-start gap-4">
          {/* Video Index Tag */}
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm font-mono bg-gray-700 rounded-lg px-2 py-1">
              {video.index.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Video Info */}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{video.title}</h3>
            <p className="text-sm text-gray-400">{video.description}</p>
            <p className="text-sm text-gray-400 mt-2 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {video.title !== "Cancelled"
                  ? formatDate(video.date)
                  : "Unknown date"}
              </span>
            </p>
          </div>

          {/* Recording Link */}
          <div className="flex gap-2">
            {video.embedUrl && (
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

      {/* Recording Player Modal */}
      {showRecording && video.embedUrl && (
        <RecordingPlayer
          url={video.embedUrl}
          title={video.title}
          onClose={() => setShowRecording(false)}
        />
      )}
    </>
  );
}
