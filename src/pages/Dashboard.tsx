import type { Lesson, Code } from "../types/lesson";
import LessonCard from "../components/LessonCard";
import Card from "../components/Card";
import CodeButton from "../components/CodeButton";
import {
  BookOpenIcon,
  CodeIcon,
  NotebookPenIcon,
  ChartBarIcon,
} from "lucide-react";
import ProgressSection from "../components/ProgressSection";
import { useEffect, useState } from "react";
import generatedLessonData from "../data/generatedLessonData.json";
import generatedCodeData from "../data/generatedCodeData.json";

function Dashboard() {
  const [lessonsData, setLessonsData] = useState<Lesson[]>([]);
  const [codeData, setCodeData] = useState<Code[]>([]);

  useEffect(() => {
    setLessonsData(generatedLessonData.lessons);
    setCodeData(generatedCodeData.codes);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Lessons Section */}
          <div className="xl:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <BookOpenIcon className="w-6 h-6 mr-3 text-purple-400" />
                  All Lessons
                </h2>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  {lessonsData.length} available
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-4">
              {lessonsData.length > 0 ? (
                lessonsData.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))
              ) : (
                <div className="text-gray-400">No lessons available.</div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Code Resources */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <CodeIcon className="w-6 h-6 mr-3 text-green-400" />
                  Python Code
                </h2>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <NotebookPenIcon className="w-4 h-4" />
                  {codeData.length} available
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {codeData.map((code, index) => (
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
