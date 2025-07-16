import { BookOpenIcon, CheckCircleIcon, VideoIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-8">
        {/* Logo/Title */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            The<span className="text-purple-400">CS</span>Class
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
          Welcome to the world of computation, communication, and control.
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <BookOpenIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
              Comprehensive Lessons
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Detailed notes and materials for every topic
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <CheckCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
              Interactive Quizzes
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Test your knowledge with assessments
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4 sm:p-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <VideoIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
              Recordings
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Learn at your own pace with recorded sessions
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleGetStarted}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transition-all duration-300 transform hover:scale-105 border-2 border-purple-500 cursor-pointer w-full sm:w-auto"
        >
          Let's go!
        </button>

        {/* Footer */}
        <div className="mt-12 sm:mt-16 text-gray-500 text-xs sm:text-sm">
          <p>© 2025 Sachintha Senanayake. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
