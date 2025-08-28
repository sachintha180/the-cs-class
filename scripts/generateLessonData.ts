import { config } from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";
import { extractVideosFromDrive } from "./videoUtils";
import { extractNotesFromDrive } from "./noteUtils";
import { extractCodeFromDrive } from "./codeUtils";

// Load environment variables
config();

const generateLessonData = async () => {
  try {
    // Log the start of the script
    console.log("Starting lesson data generation...");

    // Get the seperate folder IDs from environment variable
    const videoFolderId = process.env.GOOGLE_DRIVE_VIDEO_FOLDER_ID;
    const noteFolderId = process.env.GOOGLE_DRIVE_NOTE_FOLDER_ID;
    const codeSnippetsFolderId =
      process.env.GOOGLE_DRIVE_CODESNIPPETS_FOLDER_ID;
    const codeQuestionsFolderId =
      process.env.GOOGLE_DRIVE_CODEQUESTIONS_FOLDER_ID;
    if (
      !videoFolderId ||
      !noteFolderId ||
      !codeSnippetsFolderId ||
      !codeQuestionsFolderId
    ) {
      throw new Error(
        "GOOGLE_DRIVE_VIDEO_FOLDER_ID or GOOGLE_DRIVE_NOTE_FOLDER_ID or GOOGLE_DRIVE_CODESNIPPETS_FOLDER_ID or GOOGLE_DRIVE_CODEQUESTIONS_FOLDER_ID is not set"
      );
    }

    // Extract code
    const code = await extractCodeFromDrive(
      codeSnippetsFolderId,
      codeQuestionsFolderId
    );
    if (code.length === 0) {
      console.log("No code found or processed");
      return;
    }

    // Extract videos
    const videos = await extractVideosFromDrive(videoFolderId);
    if (videos.length === 0) {
      console.log("No videos found or processed");
      return;
    }

    // Extract notes
    const notes = await extractNotesFromDrive(noteFolderId);
    if (notes.length === 0) {
      console.log("No notes found or processed");
      return;
    }

    // NOTE: The video and note arrays are combined based on identical index
    const lessons = videos.map((video) => {
      const note = notes.find((note) => note.index === video.index);
      return {
        id: video.index,
        title: video.title,
        description: video.description,
        date: video.date,
        noteUrl: note ? note.embedUrl : null,
        recordingUrl: video.embedUrl,
      };
    });

    // Sort by descending date
    const sortedLessons = lessons.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });

    // Create lesson data
    const lessonData = {
      generatedAt: new Date().toISOString(),
      totalLessons: lessons.length,
      lessons: sortedLessons,
    };

    // Write to file
    const lessonOutputPath = join(
      process.cwd(),
      "src/data/generatedLessonData.json"
    );
    writeFileSync(lessonOutputPath, JSON.stringify(lessonData, null, 2));

    // Create code data
    const codeData = {
      generatedAt: new Date().toISOString(),
      code: code,
    };

    // Write to file
    const codeOutputPath = join(
      process.cwd(),
      "src/data/generatedCodeData.json"
    );
    writeFileSync(codeOutputPath, JSON.stringify(codeData, null, 2));

    // Log the results
    console.log(`Successfully generated lesson data`);
    console.log(`Output files: ${lessonOutputPath} and ${codeOutputPath}`);
    console.log(`Total lessons: ${sortedLessons.length}`);
    console.log(`Generated lessons:`);
    sortedLessons.forEach((lesson) => {
      console.log(`  ${lesson.id}. ${lesson.title} (${lesson.date})`);
    });
    console.log(`Total code: ${code.length}`);
    console.log(`Generated code:`);
    code.forEach((snippet) => {
      console.log(`  ${snippet.title}`);
    });
  } catch (error) {
    console.error("Error generating lesson data:", error);
    process.exit(1);
  }
};

// Run the script
generateLessonData();
