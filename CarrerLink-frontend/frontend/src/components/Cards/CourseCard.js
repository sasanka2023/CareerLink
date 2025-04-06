import React from "react";
import { GrFormNext } from "react-icons/gr";

const CourseCard = ({ course }) => {
  if (!course) {
    return (
      <div className="text-center text-red-500">
        Failed to load course data.
      </div>
    );
  }

  return (
    <div className="relative flex flex-col p-4 my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
      {/* Header Section (No image) */}
      <div className="flex p-4">
        <div className="flex flex-col text-sm">
          <span className="text-xl font-semibold">
            {course.courseName || "Untitled Course"}
          </span>
          <span className="text-sm text-gray-600">
            Skill: {course.requiredSkill || "N/A"}
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col pt-4 pl-4">
        <div className="mb-2 rounded-full bg-cyan-600 py-0.5 px-2.5 border border-transparent text-xs text-white transition-all shadow-sm w-fit text-center">
          {course.skillLevel || "Unknown Level"}
        </div>
      </div>

      {/* More Info Button */}
      <div className="flex justify-end items-center px-0.5 space-x-2 mt-4">
        <a
          href={course.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm px-4 py-1 rounded-full hover:underline transition-all flex items-center space-x-1"
        >
          <span>Learn More</span>
          <GrFormNext className="text-base" />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
