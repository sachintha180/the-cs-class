import { DownloadIcon, XIcon } from "lucide-react";

type PDFViewerProps = {
  url: string;
  title: string;
  onClose: () => void;
};

export default function PDFViewer({ url, title, onClose }: PDFViewerProps) {
  // Convert preview URL to download URL
  const handleDownload = () => {
    const downloadUrl = url.replace("/preview", "");
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `${title}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-6xl h-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {/* Title */}
          <h2 className="text-xl font-bold text-white">{title} - Note</h2>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center"
            >
              <DownloadIcon className="w-4 h-4 mr-2" />
              Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* PDF Content */}
        <div className="flex-1 p-4">
          <iframe
            src={url}
            className="w-full h-full rounded-lg border border-gray-600"
            title={`PDF Viewer - ${title}`}
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
