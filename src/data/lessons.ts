import type { ClassLevel, Code, Lesson } from "../types";

// Helper function to convert Google Drive sharing URLs to direct download URLs
const getGoogleDriveUrl = (shareUrl: string, isRecording = false) => {
  // Extract file ID from Google Drive sharing URL
  const fileId = shareUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
  if (!fileId) return shareUrl;

  if (isRecording) {
    // For recordings, we need to use a different format for embedding
    return `https://drive.google.com/file/d/${fileId}/preview`;
  } else {
    // For PDFs, we can use the direct view URL
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
};

export const lessonsData: Record<ClassLevel, Lesson[]> = {
  "Edexcel IGCSE": [],
  "CIE AS": [],
  "CIE A2": [
    {
      id: "13.1",
      title: "Data Representation",
      description: "Data types, data structures, enums and pointers.",
      hasNote: {
        url: getGoogleDriveUrl(
          "https://drive.google.com/file/d/1uhdA8-Pib3Gv5wSwGUO-JlHkRHDGPdn6/view?usp=drive_link"
        ),
        isCompleted: false,
      },
      hasQuiz:
        "https://docs.google.com/forms/d/e/1FAIpQLSdlf_Q4rPvFhGw2RJ44meVai19C9H1f2Y2gSTAjMWQFtg670A/viewform?usp=header",
      hasSummaryChecker: false,
      hasVideos: [
        "https://drive.google.com/file/d/1r3XnCdaYsI1Mtj0ZYS8slInxtHWK1-z6/view?usp=sharing",
        "https://drive.google.com/file/d/1hJZKrRvnJflRl_UQ5CYKWwUd5xApoZud/view?usp=sharing",
      ],
    },
    {
      id: "13.2",
      title: "Data Representation",
      description: "File organization, hashing and file access.",
      hasNote: {
        url: getGoogleDriveUrl(
          "https://drive.google.com/file/d/1T15BEnJERGUztoUMQ0zn2oWE1_dE6dyW/view?usp=drive_link"
        ),
        isCompleted: false,
      },
      hasQuiz: null,
      hasSummaryChecker: false,
      hasVideos: null,
    },
    {
      id: "13.3",
      title: "Data Representation",
      description: "Real numbers, floating-point, mantissa and exponent.",
      hasNote: {
        url: getGoogleDriveUrl(
          "https://drive.google.com/file/d/1gFUqyjtu1s6j0I5NK-no4aI9XZ_zbm0p/view?usp=drive_link"
        ),
        isCompleted: false,
      },
      hasQuiz: null,
      hasSummaryChecker: false,
      hasVideos: null,
    },
  ],
};

export const codeData: Record<ClassLevel, Code[]> = {
  "Edexcel IGCSE": [],
  "CIE AS": [],
  "CIE A2": [
    {
      id: "1",
      filename: "records.py",
      topic: "13.1 - Data Representation",
      url: "https://drive.google.com/file/d/1SVYFHyDMNR-ZNY-SwJQE_JIxLsj-u_yG/view?usp=sharing",
    },
    {
      id: "2",
      filename: "records_2.py",
      topic: "13.1 - Data Representation",
      url: "https://drive.google.com/file/d/1VowrKNweE71AqZVQdn-_YmdbfOb5wLU0/view?usp=sharing",
    },
  ],
};
