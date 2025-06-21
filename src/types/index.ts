export type ClassLevel = 'Edexcel IGCSE' | 'CIE AS' | 'CIE A2';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  hasNote: { url: string; isCompleted: boolean } | null; // Google Drive PDF URL with completion status
  hasQuiz: string | null; // Google Form URL
  hasSummaryChecker: boolean; // AI summary validation tool
  hasVideo: string | null; // Google Drive MP4 Recording URL
}

export interface LessonCardProps {
  lesson: Lesson;
} 