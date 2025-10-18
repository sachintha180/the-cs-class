import { GoogleAuth } from "google-auth-library";
import type { ServiceAccountCredentials } from "../src/types/googleAuth";
import serviceAccountKey from "../secrets/thecsclass-dbd928cf0cb6.json";
import type { Note } from "../src/types/lesson";

// Initialize allowed extensions
const ALLOWED_EXTENSIONS = [".pdf"];

const parseNoteFilename = (fileId: string, filename: string): Note | null => {
  // Remove the file extension
  const extension = filename.split(".").pop();
  if (!extension || !ALLOWED_EXTENSIONS.includes(`.${extension}`)) {
    console.warn(`Invalid file extension: ${filename}`);
    return null;
  }
  const nameWithoutExt = filename.replace(`.${extension}`, "");

  // Split by underscore
  const parts = nameWithoutExt.split("_");

  // FORMAT: <index>_<title>_<subject_<syllabus>_<Completed/Pending>.pdf
  if (parts.length !== 5) {
    console.warn(`Invalid filename format: ${filename}`);
    return null;
  }
  const [index, title, subject, syllabus, state] = parts;

  // Validate state
  if (state !== "Completed" && state !== "Pending") {
    console.warn(`Invalid state in filename: ${filename}, state: ${state}`);
    return null;
  }

  return {
    index,
    title,
    subject,
    syllabus,
    state: state as "Completed" | "Pending",
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
  };
};

// Extract notes from Google Drive folder
export const extractNotesFromDrive = async (
  folderId: string
): Promise<Note[]> => {
  try {
    // Log the start of extraction
    console.log(`Extracting notes from folder: ${folderId}`);

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
      url: `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='application/pdf'`,
    });

    const files = (response.data as any).files || [];
    console.log(`Found ${files.length} PDF files`);

    // Process each file
    const notes: Note[] = [];
    for (const file of files) {
      const note = parseNoteFilename(file.id, file.name);
      if (note) {
        notes.push(note);
        console.log(`Processed: ${file.name}`);
      }
    }

    return notes;
  } catch (error) {
    console.error("Error extracting notes:", error);
    return [];
  }
};
