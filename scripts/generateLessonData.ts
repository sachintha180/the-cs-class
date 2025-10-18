import { config } from "dotenv";
import { writeFileSync } from "fs";
import { join } from "path";
import { extractVideosFromDrive } from "./videoUtils";
import { extractNotesFromDrive } from "./noteUtils";
import { extractCodeFromDrive } from "./codeUtils";
import { Video } from "../src/types/lesson";

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

    // // Sort videos in ascending order (for adding cancelled lessons)
    // const ascendingVideos = videos.sort((a, b) => {
    //   const a_date = new Date(a.date);
    //   const b_date = new Date(b.date);
    //   return a_date.getTime() - b_date.getTime();
    // });

    // let adjustedVideos: Video[] = [];
    // let offset = 0;

    // for (let i = 0; i < ascendingVideos.length; i++) {
    //   const videoIndex = ascendingVideos[i].index;
    //   const videoDate = new Date(ascendingVideos[i].date);
    //   const expectedIndex = i + 1 + offset;

    //   if (videoIndex !== expectedIndex) {
    //     console.log(`Seems like you cancelled class ${expectedIndex}`);
    //     offset++;

    //     const nextDate = new Date(videoDate);
    //     nextDate.setDate(videoDate.getDate() + 1);

    //     adjustedVideos.push({
    //       index: i,
    //       syllabus: "CS",
    //       date: nextDate,
    //       weekday: "",
    //       type: "Cancelled",
    //       embedUrl: "",
    //       title: "Cancelled",
    //       description: "This class was cancelled",
    //     });
    //   } else {
    //     adjustedVideos.push(ascendingVideos[i]);
    //   }
    // }

    // Sort adjusted videos in descending order
    const descendingVideos = videos.sort((a, b) => {
      const a_date = new Date(a.date);
      const b_date = new Date(b.date);
      return b_date.getTime() - a_date.getTime();
    });

    // Extract notes
    const notes = await extractNotesFromDrive(noteFolderId);
    if (notes.length === 0) {
      console.log("No notes found or processed");
      return;
    }

    // Create lesson data
    const lessonData = {
      generatedAt: new Date().toISOString(),
      totalVideos: videos.length,
      videos: descendingVideos,
      totalNotes: notes.length,
      notes,
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
      codes: code,
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
    console.log(`Total videos: ${videos.length}`);
    console.log(`Generated videos:`);
    videos.forEach((video) => {
      console.log(`  ${video.index}. ${video.title} (${video.date})`);
    });
    console.log(`Total notes: ${notes.length}`);
    console.log(`Generated notes:`);
    notes.forEach((note) => {
      console.log(`  ${note.index}. ${note.title}`);
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
