//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   recordingUrl: string; // Google Drive URL
// };

export type Video = {
  index: number;
  syllabus: string;
  date: Date | string;
  weekday: string;
  type: string;
  embedUrl: string;
  title: string;
  description: string;
};

export type Note = {
  index: string;
  title: string;
  subject: string;
  syllabus: string;
  state: string;
  embedUrl: string;
};

export type Code = {
  title: string;
  embedUrl: string;
  type: "snippet" | "question";
};

export type Syllabus = {
  id: string;
  title: string;
  type: string;
};
