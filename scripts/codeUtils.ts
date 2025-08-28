import { GoogleAuth } from "google-auth-library";
import type { ServiceAccountCredentials } from "../src/types/googleAuth";
import serviceAccountKey from "../secrets/thecsclass-dbd928cf0cb6.json";
import type { Code } from "../src/types/lesson";

// Initialize allowed extensions
const ALLOWED_EXTENSIONS = [".py"];

const parseCodeFilename = (
  fileId: string,
  filename: string,
  type: "snippet" | "question"
): Code | null => {
  // Remove the file extension
  const extension = filename.split(".").pop();
  if (!extension || !ALLOWED_EXTENSIONS.includes(`.${extension}`)) {
    console.warn(`Invalid file extension: ${filename}`);
    return null;
  }

  // FORMAT: <title>.py for snippets, <solution_<n.n.n>_sachintha>.py for questions
  let title: string | null = null;
  if (type == "snippet") {
    title = filename.replace(`.${extension}`, "");
  } else {
    title = filename.replace(`_sachintha.${extension}.py`, "");
  }

  if (title.length === 0) {
    console.warn(`Invalid filename format: ${filename}`);
    return null;
  }

  return {
    title: filename,
    type: type,
    embedUrl: `https://drive.google.com/file/d/${fileId}/preview`,
  };
};

// Extract code files from Google Drive folder
export const extractCodeFromDrive = async (
  snippetsFolderId: string,
  questionsFolderId: string
): Promise<Code[]> => {
  try {
    // Log the start of extraction
    console.log(`Extracting code snippets from folder: ${snippetsFolderId}`);
    console.log(
      `Extracting questions snippets from folder: ${questionsFolderId}`
    );

    // Create Google Auth client
    const credentials: ServiceAccountCredentials = serviceAccountKey;
    const auth = new GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    // Get authenticated client
    const client = await auth.getClient();

    // List files in the two folders
    const snippetsResponse = await client.request({
      url: `https://www.googleapis.com/drive/v3/files?q='${snippetsFolderId}'+in+parents+and+mimeType='text/x-python'`,
    });
    const snippetFiles = (snippetsResponse.data as any).files || [];
    console.log(`Found ${snippetFiles.length} snippet files`);

    const questionsResponse = await client.request({
      url: `https://www.googleapis.com/drive/v3/files?q='${questionsFolderId}'+in+parents+and+mimeType='text/x-python'`,
    });
    const questionsFiles = (questionsResponse.data as any).files || [];
    console.log(`Found ${questionsFiles.length} questions files`);

    // Process each file from both folders
    const codeFiles: Code[] = [];
    for (const file of snippetFiles) {
      const data = parseCodeFilename(file.id, file.name, "snippet");
      if (data) {
        codeFiles.push(data);
        console.log(`Processed: ${file.name} snippet`);
      }
    }
    for (const file of questionsFiles) {
      const data = parseCodeFilename(file.id, file.name, "question");
      if (data) {
        codeFiles.push(data);
        console.log(`Processed: ${file.name} question`);
      }
    }

    return codeFiles;
  } catch (error) {
    console.error("Error extracting code snippets:", error);
    return [];
  }
};
