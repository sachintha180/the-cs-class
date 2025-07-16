import { GoogleAuth } from "google-auth-library";
import type { ServiceAccountCredentials } from "../src/types/googleAuth";
import serviceAccountKey from "../secrets/thecsclass-dbd928cf0cb6.json";
import type { Video } from "../src/types/lesson";

// Initialize allowed extensions
const ALLOWED_EXTENSIONS = [".mp4"];

const parseVideoFilename = (fileId: string, filename: string): Video | null => {
  // Remove the file extension
  const extension = filename.split(".").pop();
  if (!extension || !ALLOWED_EXTENSIONS.includes(`.${extension}`)) {
    console.warn(`Invalid file extension: ${filename}`);
    return null;
  }
  const nameWithoutExt = filename.replace(`.${extension}`, "");

  // Split by underscore
  const parts = nameWithoutExt.split("_");

  // FORMAT: <index>_<syllabus>_<date;DD-MM-YYYY>_<weekday>_<theory/practical>_<description>.mp4
  if (parts.length !== 6) {
    console.warn(`Invalid filename format: ${filename}`);
    return null;
  }
  const [index, syllabus, date, weekday, type, description] = parts;

  // Validate type
  if (type !== "Theory" && type !== "Practical") {
    console.warn(`Invalid type in filename: ${filename}, type: ${type}`);
    return null;
  }

  // Validate date format (DD-MM-YYYY)
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (!dateRegex.test(date)) {
    console.warn(`Invalid date format in filename: ${filename}, date: ${date}`);
    return null;
  }

  // Validate index is a number
  const indexNumber = parseInt(index);
  if (isNaN(indexNumber)) {
    console.warn(`Invalid index in filename: ${filename}, index: ${index}`);
    return null;
  }

  // Validate weekday is a valid weekday
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  if (!weekdays.includes(weekday)) {
    console.warn(
      `Invalid weekday in filename: ${filename}, weekday: ${weekday}`
    );
    return null;
  }

  // Convert date to YYYY-MM-DD
  const [day, month, year] = date.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  return {
    index: indexNumber,
    syllabus,
    date: new Date(formattedDate),
    weekday,
    type: type as "Theory" | "Practical",
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    title: `${
      type.charAt(0).toUpperCase() + type.slice(1)
    } Session - ${weekday}`,
    description: description,
  };
};

// Extract videos from Google Drive folder
export const extractVideosFromDrive = async (
  folderId: string
): Promise<Video[]> => {
  try {
    // Log the start of extraction
    console.log(`Extracting videos from folder: ${folderId}`);

    // Create Google Auth client
    const credentials: ServiceAccountCredentials = serviceAccountKey;
    const auth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    // Get authenticated client
    const client = await auth.getClient();

    // List files in the folder
    const response = await client.request({
      url: `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='video/mp4'`,
    });

    const files = (response.data as any).files || [];
    console.log(`Found ${files.length} MP4 files`);

    // Process each file
    const videos: Video[] = [];
    for (const file of files) {
      const video = parseVideoFilename(file.id, file.name);
      if (video) {
        videos.push(video);
        console.log(`Processed: ${file.name}`);
      }
    }
    return videos;
  } catch (error) {
    console.error("Error extracting videos:", error);
    return [];
  }
};
