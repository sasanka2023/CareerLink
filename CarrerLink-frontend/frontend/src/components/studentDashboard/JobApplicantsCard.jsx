import React from "react";

export default function JobApplicationsCard() {
  const totalApplications = 15; // Example number of applications
  //const goal = 20; // Example goal for job applications
  //const progress = Math.round((totalApplications / goal) * 100);

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-6 w-60 max-w-sm">
      {/* Header with Icon */}
      <div className="flex items-center">
        <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-full">
          {/* Replace with a relevant job icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7M5 13l4-4M5 13H3"
            />
          </svg>
        </div>
        <div className="ml-4">
          <h2 className="text-xl font-semibold text-gray-800">Job Applications</h2>
          <p className="text-gray-500 text-sm">Track your progress</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-4">
        <h3 className="text-3xl font-bold text-gray-800">{totalApplications}</h3>
        <p className="text-gray-500">Applications submitted</p>
      </div>

      {/* Progress Bar */}
      {/* <div className="mt-4">
        <p className="text-sm text-gray-500 mb-2">Goal: {goal} applications</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{progress}% completed</p>
      </div> */}
    </div>
  );
}

