export type Lesson = {
  id: number;
  title: string;
  description: string;
  date: string;
  noteUrl: string | null; // Google Drive URL
  recordingUrl: string; // Google Drive URL
};

export type Video = {
  index: number;
  syllabus: string;
  date: Date;
  weekday: string;
  type: "Theory" | "Practical";
  embedUrl: string;
  title: string;
  description: string;
};

export type Note = {
  index: number;
  syllabus: string;
  date: Date;
  weekday: string;
  type: "Theory" | "Practical";
  embedUrl: string;
};

export type Code = {
  title: string;
  embedUrl: string;
};

export type Syllabus = {
  id: string;
  title: string;
};
