import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto px-4 sm:px-6">
        {/* 404 Number */}
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold text-purple-400 mb-6 sm:mb-8">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
          Page Not Found
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
          Oops! The page you're looking for doesn't exist. It might have been
          moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-purple-500 cursor-pointer text-sm sm:text-base"
          >
            Go Home
          </button>
          <button
            onClick={handleGoBack}
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-6 rounded-lg transition-all duration-300 transform hover:scale-105 border-2 border-gray-600 cursor-pointer text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
