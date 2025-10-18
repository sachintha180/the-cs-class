import type { Note } from "../types/lesson";
import { NotepadTextIcon } from "lucide-react";

type NoteButtonProps = {
  note: Note;
};

export default function NoteButton({ note }: NoteButtonProps) {
  return (
    <a
      href={note.embedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-gray-800 border border-purple-500/20 rounded-lg hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="p-2 rounded-lg flex-shrink-0 bg-blue-500/20">
          <NotepadTextIcon className="w-5 h-9 text-blue-500" />
        </div>

        {/* Text */}
        <div className="flex flex-col items-start min-w-0 flex-1 gap-1">
          <span className="text-gray-400 leading-tight text-sm">
            {note.index} - {note.title.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </span>
          <span className="text-xs text-gray-500">{note.state}</span>
        </div>
      </div>
    </a>
  );
}
