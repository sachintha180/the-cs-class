import type { Code, Note, Video } from "../types/lesson";
import VideoCard from "../components/VideoCard";
import Card from "../components/Card";
import CodeButton from "../components/CodeButton";
import {
  CodeIcon,
  NotebookPenIcon,
  ChartBarIcon,
  VideoIcon,
  NotepadTextIcon,
} from "lucide-react";
import ProgressSection from "../components/ProgressSection";
import { useEffect, useState } from "react";
import generatedLessonData from "../data/generatedLessonData.json";
import generatedCodeData from "../data/generatedCodeData.json";
import NoteButton from "../components/NoteButton";

function Dashboard() {
  const [videoData, setVideoData] = useState<Video[]>([]);
  const [noteData, setNoteData] = useState<Note[]>([]);
  const [codeData, setCodeData] = useState<Code[]>([]);

  useEffect(() => {
    setVideoData(generatedLessonData.videos);
    setNoteData(generatedLessonData.notes);
    setCodeData(
      generatedCodeData.codes.map((code) => ({
        ...code,
        type: code.type as Code["type"],
      }))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Videos Section */}
          <div className="xl:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <VideoIcon className="w-6 h-6 mr-3 text-purple-400" />
                  All Recordings
                </h2>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  {videoData.length} available
                </div>
              </div>
            </div>

            {/* Video List */}
            <div className="space-y-4">
              {videoData.length > 0 ? (
                videoData.map((video) => (
                  <VideoCard key={video.index} video={video} />
                ))
              ) : (
                <div className="text-gray-400">No recordings available.</div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <NotepadTextIcon className="w-6 h-6 mr-3 text-blue-400" />
                  Notes
                </h2>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  {noteData.length} available
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {noteData.map((note, index) => (
                <NoteButton key={index} note={note} />
              ))}
            </div>

            {/* Code Snippets */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <CodeIcon className="w-6 h-6 mr-3 text-green-400" />
                  Python Snippets
                </h2>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  {codeData.length} available
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {codeData
                .filter((code) => code.type === "snippet")
                .sort((a, b) =>
                  a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                )
                .map((code, index) => (
                  <CodeButton key={index} code={code} />
                ))}
            </div>

            {/* Code Questions */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <CodeIcon className="w-6 h-6 mr-3 text-amber-400" />
                  Python Exercises
                </h2>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  {codeData.length} available
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {codeData
                .filter((code) => code.type === "question")
                .sort((a, b) =>
                  a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                )
                .map((code, index) => (
                  <CodeButton key={index} code={code} />
                ))}
            </div>

            {/* Progress */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <ChartBarIcon className="w-6 h-6 mr-3 text-orange-400" />
                Progress
              </h2>
            </div>
            <Card>
              <ProgressSection />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
