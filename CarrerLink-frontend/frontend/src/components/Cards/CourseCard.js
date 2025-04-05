import React from "react";

const CourseCard = ({ course }) => {
  if (!course) {
    return (
      <div className="text-center text-red-500">
        Failed to load course data.
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden bg-white transform hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="bg-gray-200 h-40 flex items-center justify-center">
        <img
          src={course.image || "/default-course.png"}
          alt={course.title || "Course"}
          className="h-24 w-24 rounded-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title and Platform */}
        <h3 className="text-lg font-bold text-gray-800">
          {course.courceName || "Untitled Course"}
        </h3>
        <p className="text-sm text-gray-500 uppercase tracking-wide">
          {course.skillLevel || "Unknown Platform"}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-3 line-clamp-2">
          {course.recommendationMessage || "No description available"}
        </p>

        {/* Rating */}
        <div className="flex items-center mt-3">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={`text-xl ${
                index < (course.score || 0)
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>{course.date || "Unknown Date"}</span>
          <span>{course.comments || 0} comments</span>
        </div>

        {/* Button */}
        <button
          className="mt-4 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={() => window.open(course.url, "_blank")}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
