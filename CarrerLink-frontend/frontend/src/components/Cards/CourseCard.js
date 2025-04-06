import React, { useEffect, useState } from "react";

function CourseCard({ course }) {
    return (
        <div className="w-80 rounded-lg shadow-lg overflow-hidden bg-white">
            {/* Image Section */}
            <div className="bg-gray-200 h-40 flex items-center justify-center">
                <img
                    src={course.url || "https://via.placeholder.com/150"}
                    alt={course.courseName}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className="p-5">
                {/* Title and Skill */}
                <h3 className="text-lg font-bold text-gray-800">{course.courseName}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-wide">
                    {course.requiredSkill}
                </p>

                {/* Description */}
                <p className="text-sm text-gray-600 mt-3">{course.description}</p>

                {/* Skill Level */}
                <div className="mt-3">
          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
            {course.skillLevel}
          </span>
                </div>

                {/* Button */}
                <button className="mt-4 w-full bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700">
                    Learn More
                </button>
            </div>
        </div>
    );
}

export default CourseCard;
