import { GoogleAuth } from "google-auth-library";
import type { ServiceAccountCredentials } from "../src/types/googleAuth";
import serviceAccountKey from "../secrets/thecsclass-dbd928cf0cb6.json";
import type { Code } from "../src/types/lesson";

// Initialize allowed extensions
const ALLOWED_EXTENSIONS = [".py"];

const parseCodeFilename = (fileId: string, filename: string): Code | null => {
  // Remove the file extension
  const extension = filename.split(".").pop();
  if (!extension || !ALLOWED_EXTENSIONS.includes(`.${extension}`)) {
    console.warn(`Invalid file extension: ${filename}`);
    return null;
  }
  const title = filename.replace(`.${extension}`, "");

  // FORMAT: <title>.py
  if (title.length === 0) {
    console.warn(`Invalid filename format: ${filename}`);
    return null;
  }

  return {
    title: filename,
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
  };
};

// Extract codes from Google Drive folder
export const extractCodesFromDrive = async (
  folderId: string
): Promise<Code[]> => {
  try {
    // Log the start of extraction
    console.log(`Extracting codes from folder: ${folderId}`);

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
      url: `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+mimeType='text/x-python'`,
    });

    const files = (response.data as any).files || [];
    console.log(`Found ${files.length} Python files`);

    // Process each file
    const codes: Code[] = [];
    for (const file of files) {
      const code = parseCodeFilename(file.id, file.name);
      if (code) {
        codes.push(code);
        console.log(`Processed: ${file.name}`);
      }
    }

    return codes;
  } catch (error) {
    console.error("Error extracting codes:", error);
    return [];
  }
};
