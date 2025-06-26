export type ClassLevel = "Edexcel IGCSE" | "CIE AS" | "CIE A2";

export type Lesson = {
  id: string;
  title: string;
  description: string;
  hasNote: { url: string; isCompleted: boolean } | null; // Google Drive PDF URL with completion status
  hasQuiz: string | null; // Google Form URL
  hasSummaryChecker: boolean; // AI summary validation tool
  hasVideos: string[] | null; // Google Drive MP4 Recording URL(s)
};

export type Code = {
  id: string;
  filename: string;
  topic: string;
  url: string; // Google Drive URL
};
