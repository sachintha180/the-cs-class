import { CheckCircle2Icon, CircleIcon } from "lucide-react";
import syllabusData from "../data/syllabus.json";
import { useState, useEffect } from "react";
import type { Syllabus } from "../types/lesson";

export default function ProgressSection() {
  const [syllabus, setSyllabus] = useState<Syllabus[]>(syllabusData.syllabus);
  const [lessonsCompleted, setLessonsCompleted] = useState<string[]>(
    syllabusData.lessonsCompleted
  );

  useEffect(() => {
    setSyllabus(syllabusData.syllabus);
    setLessonsCompleted(syllabusData.lessonsCompleted);
  }, []);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">Lessons Completed</span>
        <span className="text-white">
          {lessonsCompleted.length} / {syllabus.length}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div
          className="bg-orange-500 h-2 rounded-full"
          style={{
            width: `${(lessonsCompleted.length / syllabus.length) * 100}%`,
          }}
        ></div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-4 mx-1">
        {syllabus.map((lesson) => (
          <div key={lesson.id} className="flex items-start gap-3 text-white">
            {lessonsCompleted.includes(lesson.id) ? (
              <CheckCircle2Icon className="w-4 h-4 text-orange-500 mt-2 flex-shrink-0" />
            ) : (
              <CircleIcon className="w-4 h-4 text-gray-400 mt-2 flex-shrink-0" />
            )}
            <div
              className={`flex flex-col min-h-[2.5rem] justify-center ${
                lessonsCompleted.includes(lesson.id)
                  ? "text-orange-500"
                  : "text-gray-400"
              }`}
            >
              <span className="font-mono text-sm">{lesson.id}</span>
              <span className="text-xs leading-tight">{lesson.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
